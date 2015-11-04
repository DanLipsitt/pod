import React from 'react';
import {Row, Col, Card, Button, Glyph} from 'elemental';
import {DropTarget} from 'react-dnd';

const printerCardTarget = {
  canDrop(props, monitor) {
    return true;
  },
};

@DropTarget('FileItem', printerCardTarget, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
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
      <div>
      <Card>
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
      </Card>
      </div>
    );
  }
};
