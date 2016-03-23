import './PrinterCard.less';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Row, Col, Panel, Button, ButtonToolbar, ButtonGroup,
        Glyphicon} from 'react-bootstrap';
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

  handleSelect(event) {
    const {printer, printerHandlers} = this.props;
    printerHandlers.select(printer.id, event.target.checked);
  }

  render() {
    const {printer, printerHandlers, connectDropTarget} = this.props;
    return (
      <Panel
          className={classNames('PrinterCard',
                     {'is-drag-hovered': this.props.isOver})}
          header={
            <label style={{display: 'block'}}>
              <input type="checkbox" checked={printer.selected}
                     onChange={this.handleSelect.bind(this)}
              />
            <h3 style={{display: 'inline', marginLeft: '0.5em'}}>
                {printer.name}
              </h3>
              <small className="pull-right">
                <a href={printer.url}>
                  <Glyphicon glyph="new-window"/>
                </a>
              </small>
            </label>
          }
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
          <StartStopButtons
              printerHandlers={printerHandlers}
              printerId={printer.id}
              printerState={printer.state.text}
              printerFile={printer.job ? printer.job.file.name : null}
          />
          <ButtonGroup>
            <Button><Glyphicon glyph="cd" /> Filament</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Panel>
    );
  }
}

export default PrinterCard;
