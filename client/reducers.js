import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

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
    ...state, action.payload
  ],
}, []);

export default combineReducers({
  files,
  printers,
});
