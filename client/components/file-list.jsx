import React from 'react';
import {Button, Glyph, Table} from 'elemental';

export var FileList = props =>
  <div>
    <h2><Glyph icon="file-directory"/> Files</h2>
    <Button><Glyph icon="plus" />Add File</Button>
    <Table></Table>
  </div>;
