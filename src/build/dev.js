/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/13
 *
 * ---------------------------------------------------
 */
let webpack = require('webpack');
let merge = require('webpack-merge');
let argv = require('minimist')(process.argv.slice(2))._;

let utils = require('./utils');

let webpackDevConfig = require('./webpack.dev.conf');

let config = require('./config');

let sourcePath = config.sourcePath;

if (argv[0]) {
  sourcePath = argv[0];
}

//console.log(utils.getSource(sourcePath).entry);

let webpackConfig = merge(webpackDevConfig, {
  entry: utils.getSource(sourcePath).entry

});

webpack(webpackConfig, function(err, stats){
  if (err) throw err;

  process.stdout.write(stats.toString({
    colors: true,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: false
  }) + '\n');

});