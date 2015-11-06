import React from 'react';
import {Row, Col, Card, Button, Glyph} from 'elemental';

export class PrinterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filename: null};
  }

  render() {
    const filename = this.state.filename;
    return (
      <Card>
        <h3>{this.props.name}</h3>
        <Row>
          <Col sm="2/3" gutter={5}><Card><Glyph icon="device-camera-video"></Glyph></Card></Col>
          <Col sm="1/3" gutter={5}><Card>Ready</Card></Col>
        </Row>
        <Row>
          {filename ? filename : "No file loaded."}
        </Row>
        <Row>
          <Button><Glyph icon="triangle-right" /></Button>
          <Button><Glyph icon="primitive-square" /></Button>
          <Button><Glyph icon="database" />Filament</Button>
        </Row>
      </Card>
    );
  }
};
