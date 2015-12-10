import chai from 'chai';
chai.should();

import * as a from '../actions';

const filesData = ['file1', 'file2'];

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
