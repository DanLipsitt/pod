var path = require('path'),
    _ = require('lodash'),
    devConfig = require('./webpack.config'),
    webpack = require('webpack');

module.exports = _.extend(devConfig, {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './client/playground/index'
  ],
  loaders: [{
    test: /\.jsx?$/,
    loader: 'babel',
    include: path.join(__dirname, 'src'),
    query: {
      plugins: ['react-transform'],
      extra: {
        'react-transform': {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }, {
            transform: 'react-transform-catch-errors',
            imports: ['react', 'redbox-react']
          }]
        }
      }
    }
  }],
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
