import React from 'react';
import {Row, Col, Panel, Button, ButtonGroup,
        ButtonToolbar} from 'react-bootstrap';
import {StartButton, PauseButton, StopButton,
        ResumeButton} from './StartStopButtons';

const PrinterGroupControl = ({printers}) => {

  let printerUrlsByButton = {start:[], pause:[], resume:[], stop:[]};
  printers.forEach(printer => {
    if(! printer.selected) return;
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
      <Row>{printers.length} selected</Row>
      <Row>
        <ButtonToolbar>
          <Button bsSize="xsmall">All</Button> {' '}
          <Button bsSize="xsmall">None</Button>
        </ButtonToolbar>
      </Row>
    </Col>
    <Col lg={9}>
      <ButtonToolbar>
        <ButtonGroup>
          <StartButton disabled={printerUrlsByButton.start.length < 1}>
            {printerUrlsByButton.start.length}</StartButton>
          <PauseButton disabled={printerUrlsByButton.pause.length < 1}>
            {printerUrlsByButton.pause.length}</PauseButton>
          <ResumeButton disabled={printerUrlsByButton.resume.length < 1}>
            {printerUrlsByButton.resume.length}</ResumeButton>
        </ButtonGroup>
        <StopButton disabled={printerUrlsByButton.stop.length < 1}>
          {printerUrlsByButton.stop.length}</StopButton>
      </ButtonToolbar>
    </Col>
  </Panel>;
};

export default PrinterGroupControl;
