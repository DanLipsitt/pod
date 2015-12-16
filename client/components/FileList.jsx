import React, {PropTypes} from 'react';
import {Button, Glyphicon, Table, Alert} from 'react-bootstrap';
import UploadDropzone from './UploadDropzone';

import FileItem from './FileItem';

var FileList = ({files, uploadHandlers}) => (
  <div>
    <h2><Glyphicon glyph="folder-open"/> Files</h2>
    <UploadDropzone handlers={uploadHandlers}/>
    {!files.length ?
     <Alert bsStyle="warning">No files yet...</Alert>
     :
     <ul>
       {files.map(item =>
         <FileItem filename={item} key={item} />
        )}
     </ul>}
  </div>
);

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
  uploadHandlers: PropTypes.object.isRequired,
};

export default FileList;
