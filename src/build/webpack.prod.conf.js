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

// https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md
let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

// https://github.com/kossnocorp/assets-webpack-plugin#configuration
let AssetsWedbpackPlugin = require('assets-webpack-plugin');

// 统一管理hash 值
let hash = {
  chunk: '_[chunkHash]',
  content: '_[contentHash]',
  hash: '_[hash]'
};

let plugins = [
  new webpack.DefinePlugin({'process.env': config.build.env}),
  // 抽出
  new ExtractTextWebpackPlugin("css/[name]" + hash.content + ".css"),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    comments: false
  }),
  new webpack.optimize.DedupePlugin(),

  // 输出静态资源映射表，如果格式非您所需，请修改这里的processOutput函数
  new AssetsWedbpackPlugin({
    filename: 'static-map.json',
    prettyPrint: true,
    update: true,
    path: './map',
    processOutput: function (assets) {
      let temp = {};
    
      for (let key in assets) {
        if (assets[key]['js']) { temp[key + '.js'] = assets[key]['js'].replace(/^js\//,''); }
        if (assets[key]['css']) { temp[key + '.css'] = assets[key]['css'].replace(/^css\//,''); }
      }
      return JSON.stringify(temp, null, 4);
    }
  })
];

module.exports = merge(baseConfig, {
  output: {
    path: path.join(process.cwd(), config.build.outputPath),
    filename: 'js/[name]' + hash.chunk + '.js',
    chunkFilename: 'js/[name]' + hash.chunk + '.js'
  },
  plugins: plugins
});