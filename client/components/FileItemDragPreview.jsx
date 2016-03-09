import React from 'react';
import DragLayer from 'react-dnd/lib/DragLayer';
import FileItem from './FileItem';

function collect(monitor) {
  var item = monitor.getItem();
  return {
    item: item,
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

function getItemStyles(currentOffset) {
  if (!currentOffset) return {display: 'none'};

  const {x, y} = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    zIndex: 100,
    top: 0,
    left: 0,
    position: 'fixed',
    pointerEvents: 'none',
    transform: transform,
    WebkitTransform: transform,
  };
}

@DragLayer(collect)
class FileItemDragPreview extends React.Component {
  render() {
    if (!this.props.isDragging) {
      return null;
    }

    return <div className="col-sm-3" style={getItemStyles(this.props.currentOffset)}>
      <FileItem file={this.props.item}/>
    </div>;
  }
}

FileItemDragPreview.propTypes = {
  item: React.PropTypes.object,
  currentOffset: React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
  }),
  isDragging: React.PropTypes.bool,
};

export default FileItemDragPreview;
