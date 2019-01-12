/* eslint-disable */

const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        mangle: true
      },
      sourceMap: true
    })
  ]
});
