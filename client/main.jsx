import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {apiMiddleware} from 'redux-api-middleware';
import App from './containers/App';
import reducer from './reducers';

let createStoreWithMiddleware = applyMiddleware(
  apiMiddleware,
)(createStore);
let store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('container')
);
