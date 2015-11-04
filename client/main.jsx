import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Card, Button, Glyph} from 'elemental';
import './style/style.less';
import {PrinterGrid} from './components/printer-grid';
import {FileList} from './components/file-list';

class App extends React.Component {
  render() {
    return (
      <div>
        <header><h1>Type A Machines Pod Manager</h1></header>
        <Row>
          <Col sm="1/4">
            <FileList data={this.props.files}/>
            <div>
              <h2><Glyph icon="history"/> History</h2>
              <p><b>file5.gcode</b> completed on <b>series1-2003</b> last Wed.</p>
              <p><b>file1.gcode</b> completed on <b>series1-2001</b> at 2pm yesterday</p>
              <p><b>file2.gcode</b> cancelled on <b>series1-2003</b> a few seconds ago.</p>
            </div>
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

let FILES = ['1.gcode', '2.gcode'];

ReactDOM.render(<App files={FILES}/>, document.getElementById('container'));
