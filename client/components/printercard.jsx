import React from 'react';
import {Row, Col, Card, Button, Glyph} from 'elemental';

export class PrinterCard extends Card {
  render() {
    return (
      <Card>
      <h3>{this.props.name}</h3>
        <Row>
          <Col sm="2/3"><Card><Glyph icon="device-camera-video"></Glyph></Card></Col>
          <Col sm="1/3"><Card>Ready</Card></Col>
        </Row>
        <Row>No file loaded.</Row>
        <Row>
          <Button><Glyph icon="triangle-right"></Glyph></Button>
          <Button><Glyph icon="primitive-square"></Glyph></Button>
          <Button><Glyph icon="database"></Glyph>Filament</Button>
        </Row>
      </Card>
    );
  }
};
