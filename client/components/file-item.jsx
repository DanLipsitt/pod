import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';

const dragSource = {
  beginDrag(props) {
    return {filename: props.filename};
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(item, dropResult);
    }
  },

};

@DragSource('FileItem', dragSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export class FileItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    filename: PropTypes.string.isRequired,
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <li>{this.props.filename}</li>
      )
    );
  }
}
