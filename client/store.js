import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import thunk from 'redux-thunk';
import effects from 'redux-effects';
import fetch from 'redux-effects-fetch';
import multi from 'redux-multi';
import createLogger from 'redux-logger';
import reducer from './reducers';

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV === 'development',
});

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware,
  thunk,
  multi,
  effects,
  fetch,
  logger,
)(createStore);

const store = createStoreWithMiddleware(reducer);
export default store;
