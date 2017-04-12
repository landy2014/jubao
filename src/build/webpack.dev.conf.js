/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   16/12/16
 *
 * ---------------------------------------------------
 */
let baseConfig = require("./webpack.base.conf");
let merge = require("webpack-merge");
let path = require("path");
let webpack = require("webpack");
let config = require("./config");
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

let plugins = [
  new webpack.DefinePlugin({'process.env': config.dev.env}),
  new ExtractTextWebpackPlugin("css/[name].css")
];

module.exports = merge(baseConfig, {
  output: {
    path: path.join(process.cwd(), config.dev.outputPath),
    filename: 'js/[name].js'
  },
  plugins: plugins,
  watch: true
});