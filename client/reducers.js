import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import {printerReducers} from './octoprint/reducers.js';

const files = handleActions({
  FILES_SUCCESS: (state, action) => (
    action.payload
  ),
  FILES_ADD: (state, action) => [
    ...state, action.payload
  ],
}, []);

const printers = handleActions({
  PRINTERS_SUCCESS: (state, action) => (
    action.payload
  ),
  PRINTERS_ADD: (state, action) => [
    ...state, printerWithDefaults(action.payload),
  ],
  ...printerReducers,
}, []);

const printerWithDefaults = (data) =>
  Object.assign({state: {text: 'Offline'}}, data);

export default combineReducers({
  files,
  printers,
});
