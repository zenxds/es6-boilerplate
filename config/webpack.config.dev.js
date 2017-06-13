const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const buildDir = path.join(__dirname, '../build')
const publicPath = '/'

module.exports = {
  entry: './index.js',
  output: {
    path: buildDir,
    publicPath: publicPath,
    filename: 'main.js'
  },
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
    contentBase: buildDir,
    publicPath: publicPath,
    host: "0.0.0.0",
    disableHostCheck: true
  }
}