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

export const printersRequest = createAction('PRINTERS_REQUEST');
export const printersSuccess = createAction('PRINTERS_SUCCESS');
export const printersAdd = createAction('PRINTERS_ADD');

export const printersFetch = () => ({
  [CALL_API]: {
    endpoint: API_URI.clone().segment('printers/').toString(),
    method: 'GET',
    types: ['PRINTERS_REQUEST', 'PRINTERS_SUCCESS', 'PRINTERS_FAILURE'],
  },
});
