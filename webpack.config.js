var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'bootstrap-webpack!./bootstrap.config.js',
    './client/main.jsx',
  ],
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.js$/,  exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
