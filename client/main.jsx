import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Card, Button, Glyph} from 'elemental';
import './style/style.less';
import {PrinterCard} from './components/printer-card';

class App extends  React.Component {
  render() {
    return (
      <div>
        <header><h1>Type A Machines Pod Manager</h1></header>
        <Row>
          <Col sm="1/4">
          <h2>Jobs</h2>
          <Button><Glyph icon="plus"></Glyph>Add Job</Button>
</Col>
          <Col sm="3/4">
            <h2>Printers</h2>
            <Row>
              <Col sm='1/3'>
              <Card>
                <h3>series1-2000</h3>
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
              </Col>
              <Col sm='1/3'><PrinterCard name="series1-2000"></PrinterCard></Col>
              <Col sm='1/3'><Card><h3>series1-2000</h3></Card></Col>
            </Row>
            <Row>
              <Col sm='1/3'><Card><h3>series1-2000</h3></Card></Col>
              <Col sm='1/3'><Card><h3>series1-2000</h3></Card></Col>
              <Col sm='1/3'><Card><h3>series1-2000</h3></Card></Col>
            </Row>
          </Col>
        </Row>
        <footer>Footer</footer>
      </div>
    );
  }
};

ReactDOM.render(<App name="World!"/>, document.getElementById('container'));
