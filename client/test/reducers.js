import chai from 'chai';
chai.should();

import reducer from '../reducers';
import * as a from '../actions';

const filesData = ['file1', 'file2'];

describe('files reducer', function() {

  it('should handle FILES_SUCCESS', function() {
    let init = {files: []};
    reducer(init, a.filesSuccess([])).files
                   .should.deep.equal([]);
    reducer(init, a.filesSuccess(filesData)).files
                   .should.deep.equal(filesData);
  });

});
