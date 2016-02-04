import {CALL_API} from 'redux-api-middleware';
import {createAction} from 'redux-actions';
import {addConnection} from './octoprint/socket';
import {bind as composeEffects} from 'redux-effects';
import {fetch} from 'redux-effects-fetch';
import URI from 'urijs';

export const API_ROOT = '/api/';
/* When we aren't in a browser (during testing), set the api host to a
 * dummy value */
export const API_ORIGIN = typeof(window)!=='undefined'?
                          window.location.origin : 'http://example.com/';
const API_URI = URI(API_ORIGIN).segment(API_ROOT);
export const API_URL = API_URI.toString();

/* Files */

export const filesRequest = createAction('FILES_REQUEST');
export const filesSuccess = createAction('FILES_SUCCESS');
export const filesAdd = createAction('FILES_ADD');

export const filesFetch = () => ({
  [CALL_API]: {
    endpoint: API_URI.clone().segment('files/').toString(),
    method: 'GET',
    types: ['FILES_REQUEST', 'FILES_SUCCESS', 'FILES_FAILURE'],
  },
});

/* File Transfers */

export const fileTransfer = (fileId, printerIds) => composeEffects(
  fetch(
    API_URI.clone().segment('printers/transfer').toString(),
    {
      method: 'POST',
      body: JSON.stringify({file:fileId, printers:printerIds}),
      headers: {'Content-Type': 'application/json'},
    }
  ),
  ({value}) => printerIds.map((printerId) => fileSelect(printerId, fileId))
);

/* Printers */

export function printersFetch() {
  return composeEffects(
    fetch(API_URI.clone().segment('printers/').toString(), {
      method: 'GET',
    }),
    ({value}) => value.map(printersAdd)
  );
}


export const printersSuccess = createAction('PRINTERS_SUCCESS');

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

export const jobRequest = (printerId, command) => ({
  [CALL_API]: {
    endpoint: API_URI.clone()
                     .segment(`printers/${printerId}/api/job/`).toString(),
    body: JSON.stringify({command: command}),
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'X-Api-Key': 'pod'},
    types: ['JOB_REQUEST', 'JOB_SUCCESS', 'JOB_FAILURE'],
  },
});

export const fileSelect = (printerId, fileId, print=false) => {
  return (dispatch, getState) => {
    let fileName = fileById(getState(), fileId);
    return dispatch({ [CALL_API]: {
      endpoint: API_URI.clone()
                       .segment(`printers/${printerId}/api`)
                       .segment(`files/local/${fileName}`)
                       .toString(),
      body: JSON.stringify({command: 'select', print}),
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-Api-Key': 'pod'},
      types: ['FILE_SELECT_REQUEST', 'FILE_SELECT_SUCCESS',
              'FILE_SELECT_FAILURE'],
    }});
  };
};

function fileById(state, fileId) {
  // FIXME: what to do if file not found?

  // filename is the original uploaded name, not the on-disk
  // name. file is a url. We need to get just the filename part from that.
  let fileUrl =  state.files.find(({id}) => id === fileId).file;
  return URI(fileUrl).filename();
}
