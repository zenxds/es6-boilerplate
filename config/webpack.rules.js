module.exports = [
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: 'url-loader?limit=10000&name=font/[hash].[ext]'
  },
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: 'url-loader?limit=8192&name=image/[hash].[ext]'
  }
]