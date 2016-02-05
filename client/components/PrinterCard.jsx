import './PrinterCard.less';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Row, Col, Panel, Button, ButtonToolbar, ButtonGroup, Glyphicon}
from 'react-bootstrap';
import classNames from 'classnames';
import StartStopButtons from './StartStopButtons';

class PrinterCard extends React.Component {
  static propTypes = {
    printer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      job: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      state: PropTypes.object.isRequired,
    }),
    printerHandlers: PropTypes.object.isRequired,
    /* drag and drop */
    connectDropTarget: PropTypes.func.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func,
  };

  static defaultProps = {
    canDrop: true,
  };

  render() {
    const {printer, printerHandlers, connectDropTarget} = this.props;
    return (
      <Panel
          className={classNames('PrinterCard',
                     {'is-drag-hovered': this.props.isOver})}
          header={<h3><a href={printer.url}>{printer.name}</a></h3>}
          ref={instance => connectDropTarget(findDOMNode(instance))}
      >
        <Row>
          <Col sm={9}><Panel>
            <Glyphicon glyph="facetime-video" />
          </Panel></Col>
        </Row>
        <Panel>
          {printer.state ? printer.state.text : 'Disconnected'}
          {['Printing', 'Paused'].indexOf(printer.state.text) > -1 ?
           <span> ({printer.progress.completion.toFixed(1)}%)</span> :
           <span/>}
        </Panel>
        <p>
          {printer.job && printer.job.file.name ? printer.job.file.name : 'No file loaded.'}
        </p>
        <ButtonToolbar>
          <StartStopButtons printerHandlers={printerHandlers}
                            printer={printer} />
          <ButtonGroup>
            <Button><Glyphicon glyph="cd" /> Filament</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Panel>
    );
  }
}

export default PrinterCard;
