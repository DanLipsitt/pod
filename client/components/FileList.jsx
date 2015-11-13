import React from 'react';
import {Button, Glyphicon, Table, Alert} from 'react-bootstrap';

import {FileItem} from './FileItem';

export function FileList(props) {
  return (
    <div>
      <h2><Glyphicon glyph="folder-open"/> Files</h2>
      <Button><Glyphicon glyph="plus" /> Add File</Button>
      {!props.data ?
       <Alert type="warning">No files yet...</Alert> :
       <ul>
         {props.data.map(item =>
           <FileItem filename={item} key={item} />
          )}
       </ul>}
    </div>
  );
};
