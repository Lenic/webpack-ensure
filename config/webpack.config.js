var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var dirname = process.cwd();

module.exports = {
  entry: {
    vendor: ['underscore'],
    main: path.resolve(dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(dirname, 'assets'),
    filename: 'js/[name]-[chunkhash:8].js',
    chunkFilename: 'js/chunks/chunk-[id]-[chunkhash:8].js',
    publicPath: ''
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(dirname, 'assets/index.html'),
      template: path.resolve(dirname, 'config/index.html'),
      chunks: ['manifest', 'vendor', 'main']
    })
  ]
}
