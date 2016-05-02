import React, {PropTypes} from 'react';
import {Glyphicon, ListGroup} from 'react-bootstrap';
import PrintLog from './PrintLog';

var PrintLogList = ({printLogs}) => (
  <div>
    <h2><Glyphicon glyph="hourglass"/> History</h2>
    <ListGroup>
      {printLogs.map(row => <PrintLog {...row} key={row.id}/>)}
    </ListGroup>
  </div>
);

export default PrintLogList;
