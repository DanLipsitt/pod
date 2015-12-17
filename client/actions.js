import {CALL_API} from 'redux-api-middleware';
import {createAction} from 'redux-actions';

export const API_URL = 'http://localhost:3000/api/';

export const filesRequest = createAction('FILES_REQUEST');

export const filesSuccess = createAction('FILES_SUCCESS');

export const filesAdd = createAction('FILES_ADD');

export const filesFetch = () => ({
  [CALL_API]: {
    endpoint: API_URL + 'files/',
    method: 'GET',
    types: ['FILES_REQUEST', 'FILES_SUCCESS', 'FILES_FAILURE'],
  },
});
