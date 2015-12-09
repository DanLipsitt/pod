import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

let FILES = ['1.gcode', '2.gcode'];

ReactDOM.render(<App files={FILES}/>, document.getElementById('container'));
