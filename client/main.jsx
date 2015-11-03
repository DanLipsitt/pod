import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Card, Button, Glyph} from 'elemental';
import './style/style.less';
import {PrinterGrid} from './components/printer-grid';

class App extends React.Component {
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
          <PrinterGrid />
          </Col>
        </Row>
        <footer>Footer</footer>
      </div>
    );
  }
};

ReactDOM.render(<App name="World!"/>, document.getElementById('container'));
