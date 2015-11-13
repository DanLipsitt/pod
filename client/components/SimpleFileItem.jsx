import React, {Component} from 'react';

export default class FileItem extends React.Component {
  render() {
    return (
        <li>{this.props.filename}</li>
    );
  };
};
