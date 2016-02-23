import React from 'react';
import {Panel, ButtonGroup} from 'react-bootstrap';
import {StartButton} from './StartStopButtons';

const PrinterGroupControl = () => (
  <Panel style={{display:'inline-block', marginLeft:'2em'}}>
    5 selected {' '}
    <ButtonGroup>
      <StartButton>3</StartButton>
    </ButtonGroup>
  </Panel>
);

export default PrinterGroupControl;
