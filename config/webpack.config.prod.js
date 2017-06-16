// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const moment = require('moment')

module.exports = {
  entry: './index.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../build'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ['es3ify-loader', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=\.]+)?$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192&name=image/[hash].[ext]'
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
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('prod')
    }),
    new ExtractTextPlugin({
      disable: false,
      allChunks: true,
      filename: '[name].css'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        ascii_only: true,
        quote_keys: true,
        screw_ie8: false
      },
      compress: {
        warnings: false,
        drop_console: true,
        properties: false,
        screw_ie8: false
      },
      mangle: {
        screw_ie8: false
      }
    }),
    new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  ]
}