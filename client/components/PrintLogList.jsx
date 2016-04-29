import React, {PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';
import PrintLog from './PrintLog';

var PrintLogList = ({printLogs}) => (
  <div>
    <h2><Glyphicon glyph="hourglass"/> History</h2>
    {printLogs.map(row => <PrintLog {...row} key={row.id}/>)}
  </div>
);

export default PrintLogList;
