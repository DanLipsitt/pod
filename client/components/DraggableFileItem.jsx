import React, {Component, PropTypes} from 'react';
import {DragSource} from 'react-dnd';
import {findDOMNode} from 'react-dom';
import FileItem from './FileItem';

const dragSource = {
  beginDrag(props) {
    return props.file;
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log(item, dropResult);
    }
  },

};

@DragSource(
  'FileItem', dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })
)
class DraggableFileItem extends Component {
  static propTypes = Object.assign({}, FileItem.propTypes, {
    connectDragSource: PropTypes.func.isRequired,
  });
  render() {
    const style = {
      opacity: this.props.isDragging ? 0.4 : 1.0,
      cursor: 'move',
    };
    return <FileItem {...this.props} style={style}
                                     ref={el => this.props.connectDragSource(findDOMNode(el))}/>;
  }
}

export default DraggableFileItem;
