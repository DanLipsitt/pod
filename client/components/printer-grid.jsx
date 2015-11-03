import React from 'react';
import {Row, Col} from 'elemental';
import {PrinterCard} from './printer-card';

export var PrinterGrid = (props) =>
  <div>
    <h2>Printers</h2>
    <Row>
      <Col sm='1/3'><PrinterCard name="series1-2001"></PrinterCard></Col>
      <Col sm='1/3'><PrinterCard name="series1-2002"></PrinterCard></Col>
      <Col sm='1/3'><PrinterCard name="series1-2003"></PrinterCard></Col>
    </Row>
    <Row>
      <Col sm='1/3'><PrinterCard name="series1-2004"></PrinterCard></Col>
      <Col sm='1/3'><PrinterCard name="series1-2005"></PrinterCard></Col>
      <Col sm='1/3'><PrinterCard name="series1-2006"></PrinterCard></Col>
    </Row>
  </div>;
