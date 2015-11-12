var path = require('path'),
    _ = require('lodash'),
    devConfig = require('./webpack.config'),
    webpack = require('webpack');

module.exports = _.extend(devConfig, {
  entry: [
    'webpack-hot-middleware/client',
    './client/playground/index'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      COSMOS_COMPONENTS: path.join(__dirname, 'client/components'),
      COSMOS_FIXTURES: path.join(__dirname, 'client/fixtures')
    }
  }
});
