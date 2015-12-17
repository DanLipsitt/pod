import chai from 'chai';
chai.should();

import reducer from '../reducers';
import * as a from '../actions';

const fileData = {filename: 'file1'};
const filesData = [{filename:'file1'}, {filename:'file2'}];

describe('files reducer', function() {

  it('should handle FILES_ADD', function(){
    let init = {files: []};
    reducer(init, a.filesAdd(filesData)).files
                   .should.deep.equal([...init, filesData]);
  });

  it('should handle FILES_SUCCESS', function() {
    let init = {files: []};
    reducer(init, a.filesSuccess([])).files
                   .should.deep.equal([]);
    reducer(init, a.filesSuccess(filesData)).files
                   .should.deep.equal(filesData);
  });

});
