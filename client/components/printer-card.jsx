import React from 'react';
import {Row, Col, Card, Button, Glyph} from 'elemental';
import {DropTarget} from 'react-dnd';
import {FILE_ITEM} from './DragItemTypes';
import classNames from 'classnames';

const printerCardTarget = {
  canDrop(props, monitor) {
    return true;
  },
};

@DropTarget(FILE_ITEM, printerCardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))
export class PrinterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filename: null};
  }

  render() {
    const filename = this.state.filename;
    const {isOver, canDrop, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className={classNames('PrinterCard', {
        'is-drag-hovered': this.props.isOver,
      })}>
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
      </div>
    );
  }
};
