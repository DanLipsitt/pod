var path = require('path');
var webpack = require('webpack');

// string substitutions
const substitutions = new webpack.DefinePlugin({
  // Pull in NODE_ENV from the environment or default to production.
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
});

module.exports = {
  entry: [
    'bootstrap-webpack!./bootstrap.config.js',
    './client/main.jsx',
  ],
  output: {
    path: path.join(__dirname, 'pod/static/pod/'),
    publicPath: '/static/pod/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader'},
      {test: /\.js$/,  exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},

      // Give bootstrap-webpack js access to the jQuery object.
      {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},

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
  plugins: [substitutions],
};
