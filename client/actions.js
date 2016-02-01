import {CALL_API} from 'redux-api-middleware';
import {createAction} from 'redux-actions';
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

export const fileTransfer = (fileId, printerIds) => ({
  [CALL_API]: {
    endpoint: API_URI.clone()
                     .segment('printers/transfer')
                     .toString(),
    body: JSON.stringify({file:fileId, printers:printerIds}),
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    types: ['FILE_TRANSFER_REQUEST', 'FILE_TRANSFER_SUCCESS',
            'FILE_TRANSFER_FAILURE']
  },
});

/* Printers */

export const printersRequest = createAction('PRINTERS_REQUEST');
export const printersSuccess = createAction('PRINTERS_SUCCESS');
export const printersAdd = createAction('PRINTERS_ADD');

export const printersFetch = () => ({
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

export const fileSelect = (printerId, filename) => ({
  [CALL_API]: {
    endpoint: API_URI.clone()
                     .segment(`printers/${printerId}/api/files/local/${filename}`)
                     .toString(),
    body: JSON.stringify({command: 'select', print: true}),
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'X-Api-Key': 'pod'},
    types: ['FILE_SELECT_REQUEST', 'FILE_SELECT_SUCCESS',
            'FILE_SELECT_FAILURE'],
  },
});
