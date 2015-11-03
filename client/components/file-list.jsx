import React from 'react';
import {Button, Glyph, Table, Alert} from 'elemental';
import {FileItem} from './file-item';

export function FileList(props) {
  return (
    <div>
      <h2><Glyph icon="file-directory"/> Files</h2>
      <Button><Glyph icon="plus" />Add File</Button>
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
