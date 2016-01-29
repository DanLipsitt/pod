import './PrinterCard.less';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {Row, Col, Panel, Button, ButtonToolbar, ButtonGroup, Glyphicon}
from 'react-bootstrap';
import classNames from 'classnames';

class PrinterCard extends React.Component {
  static propTypes = {
    printer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    filename: PropTypes.string,
    /* drag and drop */
    connectDropTarget: PropTypes.func.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func,
  };

  static defaultProps = {
    canDrop: true,
  };

  render() {
    const {printer, filename, connectDropTarget} = this.props;
    return (
      <Panel
          className={classNames('PrinterCard',
                     {'is-drag-hovered': this.props.isOver})}
          header={<h3>{printer.name}</h3>}
          ref={instance => connectDropTarget(findDOMNode(instance))}
      >
        <Row>
          <Col sm={9}><Panel>
            <Glyphicon glyph="facetime-video" />
          </Panel></Col>
          <Col sm={3}><Panel>Ready</Panel></Col>
        </Row>
        <p>{filename ? filename : "No file loaded."}</p>
        <ButtonToolbar>
          <ButtonGroup>
            <Button><Glyphicon glyph="play" /></Button>
            <Button><Glyphicon glyph="stop" /></Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button><Glyphicon glyph="cd" /> Filament</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Panel>
    );
  }
}

export default PrinterCard;
