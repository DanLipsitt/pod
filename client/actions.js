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

export const fileTransfer = (file, printers) => ({
  [CALL_API]: {
    endpoint: API_URI.clone()
                     .segment('files/transfer')
                     .search({file, printers})
                     .toString(),
    method: 'POST',
    types: ['FILE_TRANSFER_REQUEST', 'FILE_TRANSFER_SUCCESS',
            'FILE_TRANSFER_FAILURE']
  },
});
