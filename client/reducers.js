import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

const files = handleActions({
  FILES_SUCCESS: (state, action) => (
    action.payload
  ),
}, ['file1.gcode', 'file2.gcode'] );


export default combineReducers({
  files,
});
