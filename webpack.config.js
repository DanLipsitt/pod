var path = require('path');

module.exports = {
  entry: './client/main.jsx',
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.js$/,  exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
    ],
  },
};
