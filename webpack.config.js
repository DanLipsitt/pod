var path = require('path');

module.exports = {
  entry: './client/main.jsx',
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.js$/,  exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
