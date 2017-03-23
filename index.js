
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('./config/webpack.config');

var app = express();

compiler = webpack(config);

app.use(webpackMiddleware(compiler, {
  noInfo: false,
  stats: {
    colors: true,
    chunks: false,
    children: false,
    chunkModules: false
  },
}));

app.listen(8090, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('listening at port: 8090');
  }
});
