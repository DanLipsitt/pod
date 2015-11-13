import './PrinterCard.less';
import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import 'bootstrap-webpack';
import {Row, Col, Panel, Button, Glyphicon} from 'react-bootstrap';
import {DropTarget} from 'react-dnd';
import {FILE_ITEM} from './DragItemTypes';
import classNames from 'classnames';

const printerCardTarget = {
  drop(props, monitor, component) {
    props.onDrop(monitor.getItem());
    return {name: props.name};
  },

  canDrop(props, monitor) {
    return true;
  },
};

@DropTarget(FILE_ITEM, printerCardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export class PrinterCard extends React.Component {
  static propTypes = {
    filename: PropTypes.string,
    /* drag and drop */
    connectDropTarget: PropTypes.func.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func,
  };

  render() {
    const {filename, isOver, canDrop, connectDropTarget} = this.props;
    return (
      <Panel
          className={classNames('PrinterCard',
                     {'is-drag-hovered': this.props.isOver})}
          header={<h3>{this.props.name}</h3>}
          ref={instance => connectDropTarget(findDOMNode(instance))}
      >
        <Row>
          <Col sm={9}><Panel>
            <Glyphicon glyph="device-camera-video" />
          </Panel></Col>
          <Col sm={3}><Panel>Ready</Panel></Col>
        </Row>
        <Row>
          {filename ? filename : "No file loaded."}
        </Row>
        <Row>
          <Button><Glyphicon glyph="triangle-right" /></Button>
          <Button><Glyphicon glyph="primitive-square" /></Button>
          <Button><Glyphicon glyph="database" />Filament</Button>
        </Row>
      </Panel>
    );
  }
};
