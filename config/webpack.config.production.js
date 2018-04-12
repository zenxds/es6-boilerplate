// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const moment = require('moment')

const rules = require('./webpack.rules')
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: rules.concat([
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ])
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              relativeUrls: false
            }
          }
        ])
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          'url-loader?limit=8192&name=image/[hash].[ext]'
          // 'img-loader'
        ]
      }
    ])
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({

    }),
    new ExtractTextPlugin({
      disable: false,
      allChunks: true,
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      hash: true
    }),
    new webpack.NamedModulesPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: true,
        warnings: true,
        output: {
          ascii_only: true,
          quote_keys: true
        },
        compress: {
          drop_console: true,
          properties: false
        }
      }
    }),
    new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  ]
}
