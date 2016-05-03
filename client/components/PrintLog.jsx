import React, {PropTypes} from 'react';
import Time from 'react-time';
import {Label, ListGroupItem} from 'react-bootstrap';

const events = {
    'PrintStarted': <Label bsStyle="primary">started</Label>,
    'PrintPaused': <Label bsStyle="default">paused</Label>,
    'PrintResumed': <Label bsStyle="info">resumed</Label>,
    'PrintCancelled': <Label bsStyle="warning">cancelled</Label>,
    'PrintFailed': <Label bsStyle="danger">failed</Label>,
    'PrintDone': <Label bsStyle="success">done</Label>,
};

export const eventTypes = Object.keys(events);

let style = {overflowWrap: 'break-word'};

var PrintLog = ({event, filename, host, timestamp}) => {
  const time = new Date(timestamp);
  const eventTag = events[event];
  return <ListGroupItem header={filename} style={style}>
    {eventTag} on <b>{host}</b>
    { } <Time value={time} relative/>
  </ListGroupItem>;
};

export default PrintLog;
