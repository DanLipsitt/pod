import React from 'react';
import {connect} from 'react-redux';
import 'bootstrap-webpack';
import {Row, Col, Modal} from 'react-bootstrap';
import PrinterGrid from '../components/PrinterGrid';
import FileList from '../components/FileList';
import PrintLogList from '../components/PrintLogList';
import {default as TouchBackend} from 'react-dnd-touch-backend';
import {DragDropContext} from 'react-dnd';
import {filesFetch, filesAdd} from '../actions';
import {printLogsFetch} from '../actions';
import {printersFetch, jobRequest, printerSelect} from '../actions';
import {fileTransfer} from '../actions';

@connect(mapStateToProps)
@DragDropContext(TouchBackend({enableMouseEvents: true}))
class App extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(printersFetch());
    dispatch(filesFetch());
    dispatch(printLogsFetch());
  }

  render() {
    const {files, printLogs, printers, dispatch, errors} = this.props;

    const uploadHandlers = {
      success: (event, response) => dispatch(filesAdd(response)),
    };

    let printerHandlers = {};
    for (let command of ['start', 'pause', 'resume', 'cancel']) {
      printerHandlers[command] = (printerId) => {
        dispatch(jobRequest(printerId, command));
      };
    }
    printerHandlers.select = (id, selected) => dispatch(
      printerSelect({id, selected})
    );

    const doTransferFile = (file_id, printer_ids) => {
      dispatch(fileTransfer(file_id, printer_ids));
    };

    return (
      <div>
        <header><h1>Type A Machines Pod Manager</h1></header>
        <Row>
          <Col sm={3}>
            <FileList files={files}
                      uploadHandlers={uploadHandlers}
            />
            <PrintLogList printLogs={printLogs}/>
          </Col>
          <Col sm={9}>
            <PrinterGrid printers={printers} printerHandlers={printerHandlers}
                         doTransferFile={doTransferFile}/>
          </Col>
        </Row>
        <footer><small className="text-muted pull-right">version: {version}</small></footer>
        {errors.fatal ?
         <Modal.Dialog backdrop={true}>
           <Modal.Header>
             <Modal.Title>Server Error</Modal.Title>
           </Modal.Header>
           <Modal.Body>{errors.fatal}</Modal.Body>
           <Modal.Footer>Please try reloading the page.</Modal.Footer>
         </Modal.Dialog>
         : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.files,
    printLogs: state.printLogs,
    printers: state.printers,
    errors: state.errors,
  };
}

export default App;
