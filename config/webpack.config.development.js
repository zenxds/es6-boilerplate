const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dxMock = require('dx-mock')

const rules = require('./webpack.rules')
module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    modules: ['node_modules', 'src']
  },
  module: {
    rules: rules.concat([
      {
        test: /\.(js|ts)$/,
        use: [
          'ts-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'config/postcss.config.js'
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
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
            options: {}
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'url-loader?limit=8192&name=image/[hash].[ext]'
      }
    ])
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '../build'),
      path.join(__dirname, '..')
    ],
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    before(app){
      dxMock(app, { root: path.join(__dirname, '../api')})
    }
  }
}
