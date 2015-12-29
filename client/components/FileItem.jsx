import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource} from 'react-dnd';
import {ListGroupItem} from 'react-bootstrap';
import Time from 'react-time';

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
class FileItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    filename: PropTypes.string.isRequired,
    createdAt: Time.propTypes.value,
  };

  render() {
    const {isDragging, connectDragSource,
           filename, createdAt,
           ...rest} = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <ListGroupItem
          header={filename}
          ref={el => connectDragSource(findDOMNode(el))}
          {...rest}
      >
        <b>uploaded</b> <Time value={createdAt} relative />
      </ListGroupItem>
    );
  }
};

export default FileItem;
