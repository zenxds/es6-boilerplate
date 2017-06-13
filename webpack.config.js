// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const moment = require('moment')

const config = {
  base: {
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: '/',
      filename: 'main.js'
    },
    plugins: []
  },
  dev: {
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: ['es3ify-loader', 'babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          use: 'url-loader?limit=10000'
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: 'url-loader?limit=8192&name=image/[hash].[ext]'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'less-loader',
              options: {
                relativeUrls: false
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'template/index.html'
      }),
      new webpack.NoEmitOnErrorsPlugin(),            
      new webpack.HotModuleReplacementPlugin(),      
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('dev')
      })
    ],
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, 'build'),
      publicPath: '/',
      host: "0.0.0.0",
      disableHostCheck: true
    }
  },
  prod: {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: ['es3ify-loader', 'babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=\.]+)?$/,
          use: [
            'file-loader'
          ]
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
            'postcss-loader',
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
}

module.exports = function(env) {
  return Object.assign(config.base, config[env])
}