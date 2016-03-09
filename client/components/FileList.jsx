import React, {PropTypes} from 'react';
import {Glyphicon, Alert, ListGroup} from 'react-bootstrap';
import UploadDropzone from './UploadDropzone';
import FileItemDragPreview from './FileItemDragPreview';

import FileItem from './FileItem';

var FileList = ({files, uploadHandlers}) => (
  <div>
    <h2><Glyphicon glyph="folder-open"/> Files</h2>
    <UploadDropzone handlers={uploadHandlers}/>
    <FileItemDragPreview/>
    {!files.length ?
     <Alert bsStyle="warning">No files yet...</Alert>
     :
     <ListGroup>
       {files.map(file =>
         <FileItem file={file} key={file.id} />
       )}
     </ListGroup>}
  </div>
);

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  uploadHandlers: PropTypes.object.isRequired,
};

export default FileList;
