import {CALL_API} from 'redux-api-middleware';
import {createAction} from 'redux-actions';
import {addConnection} from './octoprint/socket';
import {bind as composeEffects} from 'redux-effects';
import {fetch as effectsFetch} from 'redux-effects-fetch';
import URI from 'urijs';
import cookies from './cookies';

export const API_ROOT = '/api/';
/* When we aren't in a browser (during testing), set the api host to a
 * dummy value */
export const API_ORIGIN = '//'; // current host
const API_URI = URI(API_ORIGIN).segment(API_ROOT);
export const API_URL = API_URI.toString();

function fetchOptionDefaults(options) {
  let result = Object.assign({
    method: 'GET',
    credentials: 'same-origin',
  }, options);
  result.headers = {
    'content-type': 'application/json',
    'x-csrftoken':  cookies['csrftoken'],
  };
  for(var key in options.headers) {
    result.headers[key.toLowerCase()] = options.headers[key];
  }
  return result;
}

function fetch(url, options) {
  // set defaults for fetch operations
  return effectsFetch(url, fetchOptionDefaults(options));
}

function call_api(options) {
  return {[CALL_API]: fetchOptionDefaults(options)};
}

/* Errors */

export const handleFetchError = (response) => {
  let action;
  if(response.status === 500 &&
     response.headers.get('Content-Type') === 'text/html') {
       const parser = new DOMParser();
       const content = parser.parseFromString(response.value, 'text/html');
       const el = content.querySelector('#summary pre.exception_value');
       if(! el) return;
       const reason = el.innerText;
       if(reason.startsWith('no such table:')) {
         action = fatalError(`Database error: ${reason}`);
       }
  }
  return action;
};

// An error (probably server-side) that makes the UI unusable.
export const fatalError = createAction('FATAL_ERROR');

/* Files */

export const filesRequest = createAction('FILES_REQUEST');
export const filesSuccess = createAction('FILES_SUCCESS');
export const filesAdd = createAction('FILES_ADD');

export const filesFetch = () => call_api({
  endpoint: API_URI.clone().segment('files/').toString(),
  method: 'GET',
  types: ['FILES_REQUEST', 'FILES_SUCCESS', 'FILES_FAILURE'],
});

/* File Transfers */

export const fileTransfer = (fileId, printerIds) => composeEffects(
  fetch(
    API_URI.clone().segment('printers/transfer').toString(),
    {
      method: 'POST',
      body: JSON.stringify({file:fileId, printers:printerIds}),
    }
  ),
  ({value}) => printerIds.map((printerId) => fileSelect(printerId, fileId))
);

/* Printers */

export const printerSelect = createAction('PRINTER_SELECT');

export function printersFetch() {
  return composeEffects(
    fetch(API_URI.clone().segment('printers/').toString(), {
      method: 'GET',
    }),
    ({value}) => value.map(printersAdd),
    (response) => handleFetchError(response)
  );
}

export const _printersAdd = createAction('PRINTERS_ADD');

export function printersAdd(printer) {
  return function(dispatch) {

    dispatch(_printersAdd(printer));

    let url = URI(printer.url).segment('sockjs').toString();
    addConnection(printer.id, url, dispatch);
    return Promise.resolve();
  };
}

/* Printer Control */

export const jobRequest = (printerId, command) => call_api({
  endpoint: API_URI.clone()
                   .segment(`printers/${printerId}/api/job/`).toString(),
  body: JSON.stringify({command: command}),
  method: 'POST',
  headers: {'X-Api-Key': 'pod'},
  types: ['JOB_REQUEST', 'JOB_SUCCESS', 'JOB_FAILURE'],
});

export const fileSelect = (printerId, fileId, print=false) => {
  return (dispatch, getState) => {
    let fileName = fileById(getState(), fileId);
    return dispatch(call_api({
      endpoint: API_URI.clone()
                       .segment(`printers/${printerId}/api`)
                       .segment(`files/local/${fileName}`)
                       .toString(),
      body: JSON.stringify({command: 'select', print}),
      method: 'POST',
      headers: {'X-Api-Key': 'pod'},
      types: ['FILE_SELECT_REQUEST', 'FILE_SELECT_SUCCESS',
              'FILE_SELECT_FAILURE'],
    }));
  };
};

function fileById(state, fileId) {
  // FIXME: what to do if file not found?

  // filename is the original uploaded name, not the on-disk
  // name. file is a url. We need to get just the filename part from that.
  let fileUrl =  state.files.find(({id}) => id === fileId).file;
  return URI(fileUrl).filename();
}
