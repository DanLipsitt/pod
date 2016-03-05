import {createStore, applyMiddleware} from 'redux';
import {apiMiddleware} from 'redux-api-middleware';
import thunk from 'redux-thunk';
import effects from 'redux-effects';
import fetch from 'redux-effects-fetch';
import multi from 'redux-multi';
import createLogger from 'redux-logger';
import reducer from './reducers';

const isLoggerExcludedAction = type => {
  const excludes = new Set([
    'OCTO_CURRENT',
  ]);
  return excludes.has(type);
};

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV === 'development'
                             && !isLoggerExcludedAction(action.type),
});

const store = createStore(
  reducer,
  applyMiddleware(
    apiMiddleware,
    thunk,
    multi,
    effects,
    fetch,
    logger,
  )
);

export default store;
