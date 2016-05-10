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
  PRINT_LOGS_ADD: (state, action) => {
    /* Store all events except PrintFailed. Octoprint considers a
    stopped print to be a failure and sends both a stop and a fail
       event. */

    const items = (
      // If input is a single item, stuff it into an array.
      action.payload instanceof Array ? action.payload : [action.payload]
    ).filter(
      // filter out PrintFailed events
      item => item.event !== 'PrintFailed'
    );

    return [...items, ...state];
  },
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
  FILE_TRANSFER_STARTED: (state, action) => (
    state.map(printer => (
      action.payload.printerIds.includes(printer.id) ?
      Object.assign({}, printer, {transferPending: true}) :
      printer
    ))
  ),
  FILE_SELECT_SUCCESS: (state, action) => (
    state.map(printer => (
      printer.id == action.payload.printerId ?
      Object.assign({}, printer, {transferPending: false}) :
      printer
    ))
  ),
  ...printerReducers,
}, []);

const printerWithDefaults = (data) =>
  Object.assign({state: {text: 'Offline'}, transferPending: false}, data);

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
