import {combineReducers} from 'redux';

function files(state=['file1.gcode', 'file2.gcode'], action) {
  return state;
};

export default combineReducers({
  files,
});
