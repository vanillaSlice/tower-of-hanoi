/* eslint-disable */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/js/app.js'
  ],

  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          },
          'eslint-loader'
        ]  
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('stylelint')(),
                  require('autoprefixer')()
                ]
              }
            },
            'sass-loader'
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('dist'),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin([{
      from: 'public',
      ignore: ['index.html']
    }]),
    new ExtractTextPlugin('css/styles.css')
  ]
};
