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

describe('printer select reducer', () => {

  it('should select a printer', () => {
    let init = {printers: [
      {id: 1},
      {id: 2},
      {id: 3},
    ]};

    reducer(init, a.printerSelect({id:2, selected:true})).printers
                   .should.deep.equal([
                     {id: 1},
                     {id: 2, selected: true},
                     {id: 3},
                   ]);
  });

});

describe('fatal error reducer', () => {

  it('should store the error', () => {
    let init = {errors: {fatal: null}};
    reducer(init, a.fatalError('err')).errors.fatal
      .should.deep.equal('err');
  });

  it('should retain any other props', () => {
    let init = {errors: {recent: ['...']}};
    reducer(init, a.fatalError('err')).errors.recent[0]
                   .should.equal('...');
  });

});

describe('print log reducer', () => {

  it('should add PrintStarted events', () => {
    const init = {printLogs: []};
    const item = {event: 'PrintStarted'};
    reducer(init, a.printLogsAdd(item)).printLogs.should.deep.equal(
      [item]
    );
  });

  it('should drop PrintFailed events', () => {
    const init = {printLogs: []};
    const item = {event: 'PrintFailed'};
    reducer(init, a.printLogsAdd(item)).printLogs.should.be.empty;
  });

});
