import React, {PropTypes} from 'react';
import {Button, Glyphicon, Table, Alert} from 'react-bootstrap';

import {FileItem} from './FileItem';

export var FileList = ({files}) => (
  <div>
    <h2><Glyphicon glyph="folder-open"/> Files</h2>
    <Button><Glyphicon glyph="plus" /> Add File</Button>
    {!files.length ?
     <Alert type="warning">No files yet...</Alert>
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
};
