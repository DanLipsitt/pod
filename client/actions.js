import {CALL_API} from 'redux-api-middleware';
import {createAction} from 'redux-actions';

export const API_URL = 'http://localhost:3000/api/';

export const filesSuccess = createAction('FILES_SUCCESS', (json) => (
  json
));
