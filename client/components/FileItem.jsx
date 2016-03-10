import React, {Component, PropTypes} from 'react';
import {ListGroupItem} from 'react-bootstrap';
import Time from 'react-time';

class FileItem extends Component {
  static propTypes = {
    file: PropTypes.shape({
      filename: PropTypes.string.isRequired,
      createdAt: Time.propTypes.value,
    }),
  };

  render() {
    const {file, ...rest} = this.props;

    return (
      <ListGroupItem header={file.filename} {...rest} >
        <b>uploaded</b> <Time value={file.createdAt} relative />
      </ListGroupItem>
    );
  }
}

export default FileItem;
