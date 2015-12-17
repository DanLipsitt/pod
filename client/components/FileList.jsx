import React, {PropTypes} from 'react';
import {Glyphicon, Alert, ListGroup} from 'react-bootstrap';
import UploadDropzone from './UploadDropzone';

import FileItem from './FileItem';

var FileList = ({files, uploadHandlers}) => (
  <div>
    <h2><Glyphicon glyph="folder-open"/> Files</h2>
    <UploadDropzone handlers={uploadHandlers}/>
    {!files.length ?
     <Alert bsStyle="warning">No files yet...</Alert>
     :
     <ListGroup>
       {files.map(({filename, id, createdAt}) =>
         <FileItem filename={filename} key={id} createdAt={createdAt} />
        )}
     </ListGroup>}
  </div>
);

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  uploadHandlers: PropTypes.object.isRequired,
};

export default FileList;
