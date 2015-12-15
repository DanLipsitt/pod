import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import createLogger from 'redux-logger';
import reducer from './reducers';

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV === 'development',
});

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware,
  logger,
)(createStore);

const store = createStoreWithMiddleware(reducer);
export default store;
