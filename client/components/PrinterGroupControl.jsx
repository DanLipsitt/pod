import React from 'react';
import _ from 'lodash';
import {Row, Col, Panel, Button, ButtonGroup,
        ButtonToolbar} from 'react-bootstrap';
import {StartButton, PauseButton, StopButton,
        ResumeButton} from './StartStopButtons';

function runCommand(command, printers) {
  // Send the given command to each printer.
  printers.forEach(printer => command(printer.id));
}

function setSelectAll(printers, select, selected) {
  printers.forEach(printer =>
    select(printer.id, selected));
}

const PrinterGroupControl = ({printers, printerHandlers}) => {

  let printerUrlsByButton = {start:[], pause:[], resume:[], stop:[]};
  const selected = _.filter(printers, x => x.selected);

  selected.forEach(printer => {
    switch (printer.state.text) {
      case 'Printing':
        printerUrlsByButton.pause.push(printer.url);
        break;
      case 'Paused':
        printerUrlsByButton.resume.push(printer.url);
        printerUrlsByButton.stop.push(printer.url);
        break;
      case 'Operational':
        if(printer.job && printer.job.file.name) {
          printerUrlsByButton.start.push(printer.url);
        }
        break;
    }
  });

  return <Panel style={{display:'inline-block', marginLeft:'2em',
                 marginBottom: '0em'}}>
    <Col lg={3}>
      <Row>{selected.length} selected</Row>
      <Row>
        <ButtonToolbar>
          <Button onClick={() => setSelectAll(printers, printerHandlers.select, true)}
                  bsSize="xsmall">All</Button>
          {' '}
          <Button onClick={setSelectAll.bind(this, printers, printerHandlers.select, false)}
                  bsSize="xsmall">None</Button>
        </ButtonToolbar>
      </Row>
    </Col>
    <Col lg={9}>
      <ButtonToolbar>
        <ButtonGroup>
          <StartButton
              onClick={runCommand.bind(this, printerHandlers.start, selected)}
              disabled={printerUrlsByButton.start.length < 1}>
            {printerUrlsByButton.start.length}</StartButton>
          <PauseButton
              onClick={runCommand.bind(this, printerHandlers.pause, selected)}
              disabled={printerUrlsByButton.pause.length < 1}>
            {printerUrlsByButton.pause.length}</PauseButton>
          <ResumeButton
              onClick={runCommand.bind(this, printerHandlers.pause, selected)}
              disabled={printerUrlsByButton.resume.length < 1}>
            {printerUrlsByButton.resume.length}</ResumeButton>
        </ButtonGroup>
        <StopButton
            onClick={runCommand.bind(this, printerHandlers.cancel, selected)}
            disabled={printerUrlsByButton.stop.length < 1}>
          {printerUrlsByButton.stop.length}</StopButton>
      </ButtonToolbar>
    </Col>
  </Panel>;
};

export default PrinterGroupControl;
