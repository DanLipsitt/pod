//import React, {Component} from 'react';
var React = require('react');

class FileItem extends React.Component {
  render() {
    return (
        <li>{this.props.filename}</li>
    );
  };
};

module.exports = FileItem;
