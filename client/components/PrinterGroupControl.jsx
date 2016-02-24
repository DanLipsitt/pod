import React from 'react';
import {Row, Col, Panel, Button, ButtonGroup,
        ButtonToolbar} from 'react-bootstrap';
import {StartButton, PauseButton, StopButton,
        ResumeButton} from './StartStopButtons';

const PrinterGroupControl = () => (
  <Panel style={{display:'inline-block', marginLeft:'2em',
                 marginBottom: '0em'}}>
    <Col lg={3}>
      <Row>5 selected</Row>
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
          <StartButton>2</StartButton>
          <PauseButton>1</PauseButton>
          <ResumeButton>1</ResumeButton>
        </ButtonGroup>
        <StopButton>1</StopButton>
      </ButtonToolbar>
    </Col>
  </Panel>
);

export default PrinterGroupControl;
