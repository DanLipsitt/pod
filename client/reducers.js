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

const printLogs = handleActions({
  PRINT_LOGS_ADD: (state, action) => [
    ...state, action.payload,
  ],
}, []);

const printers = handleActions({
  PRINTERS_ADD: (state, action) => [
    ...state, printerWithDefaults(action.payload),
  ],
  PRINTER_SELECT: (state, action) => (
    state.map(printer => (
      printer.id == action.payload.id ?
      Object.assign({}, printer, {selected: action.payload.selected}) :
      printer
    ))
  ),
  ...printerReducers,
}, []);

const printerWithDefaults = (data) =>
  Object.assign({state: {text: 'Offline'}}, data);

const errors = handleActions({
  FATAL_ERROR: (state, action) => (
    Object.assign({}, state, {fatal: action.payload})
  ),
}, []);

export default combineReducers({
  files,
  printLogs,
  printers,
  errors,
});
