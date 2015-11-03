import React from 'react';
import {Button, Glyph, Table, Alert} from 'elemental';
import {FileItem} from './file-item';

export function FileList(props) {
  let content = null;
  if (!props.data) {
    content = <Alert type="warning">No files yet...</Alert>;
  } else {
    let items = props.data.map(
      item => <FileItem filename={item} />
    );
    console.log(items);
    content = <ul>{items}</ul>;
  }

  return (
    <div>
      <h2><Glyph icon="file-directory"/> Files</h2>
      <Button><Glyph icon="plus" />Add File</Button>
      {content}
    </div>
  );
};
