import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap-webpack';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';
import PrinterGrid from '../components/PrinterGrid';
import FileList from '../components/FileList';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {filesFetch} from '../actions';

@connect(mapStateToProps)
@DragDropContext(HTML5Backend)
class App extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(filesFetch());
  }

  render() {
    return (
      <div>
        <header><h1>Type A Machines Pod Manager</h1></header>
        <Row>
          <Col sm={3}>
            <FileList files={this.props.files.map(o => o.filename)}/>
            <div>
              <h2><Glyphicon glyph="hourglass"/> History</h2>
              <p><b>file5.gcode</b> completed on <b>series1-2003</b> last Wed.</p>
              <p><b>file1.gcode</b> completed on <b>series1-2001</b> at 2pm yesterday</p>
              <p><b>file2.gcode</b> cancelled on <b>series1-2003</b> a few seconds ago.</p>
            </div>
          </Col>
          <Col sm={9}>
            <PrinterGrid />
          </Col>
        </Row>
        <footer>Footer</footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {files: state.files};
}

export default App;
