import chai from 'chai';
chai.should();
import {apiMiddleware} from 'redux-api-middleware';
import configureStore from 'redux-mock-store';
import nock from 'nock';
import createLogger from 'redux-logger';

import * as a from '../actions';

const logger = createLogger({
  logger: console,
});

const mockStore = configureStore([
  apiMiddleware,
  logger,
]);

const filesData = [{filename:'file1'}, {filename:'file2'}];

describe('filesSuccess', function() {

  it('should handle empty list', function() {
    let payload = a.filesSuccess([]).payload;
    payload.should.deep.equal([]);
  });

  it('should handle list', function() {
    let payload = a.filesSuccess(filesData).payload;
    payload.should.deep.equal(filesData);
  });

});

describe('fetchFiles', function() {

  it('should call the success action creator with the right data', (done) => {
    nock(a.API_URL).get('/files/').reply(200, filesData);
    const initState = {};
    const expectedActions = [
      {type: 'FILES_REQUEST'},
      {type: 'FILES_SUCCESS', payload: filesData, meta: undefined},
    ];
    const store = mockStore(initState, expectedActions, done);
    store.dispatch(a.filesFetch());
  });

});
