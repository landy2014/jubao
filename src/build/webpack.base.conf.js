/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   16/12/16
 *
 * ---------------------------------------------------
 */
let config = require ("./config");
let webpack = require ("webpack");
let path = require ("path");
let ExtractTextWebpackPlugin = require ("extract-text-webpack-plugin");
let autoprefixer = require('autoprefixer');

let excluce = /(node_modules)/;

module.exports = {
  resolve: {
    alias: {
      'widget': path.resolve (process.cwd (), './src/widget'),
      'template': path.resolve (process.cwd (), './src/template'),
      'libs': path.resolve (process.cwd (), './src/libs'),
      'vue$': path.resolve(__dirname, '../node_modules/vue/dist/vue.common.js')
    },
    extensions: ['', '.js', '.vue']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint'
      },
      {
        test: /\.vue$/,
        loader: 'eslint',
        exclude: excluce
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        // http://stackoverflow.com/questions/36313885/babel-6-transform-runtime-export-is-not-a-function
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        exclude: excluce,
        // 第一个参数是标示文件内容类型，第二个参数设置过滤器，处理源码,此处用于抽取样式为独立文件
        loader: ExtractTextWebpackPlugin.extract ("style", "css!postcss!less")
      },
      {
        test: /\.scss$/,
        exclude: excluce,
        // 第一个参数是标示文件内容类型，第二个参数设置过滤器，处理源码,此处用于抽取样式为独立文件
        loader: ExtractTextWebpackPlugin.extract ("style", "css!postcss!sass")
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: excluce,
        loader: 'url',
        query: {
          context: config.imgRootPath,
          name: "images/[path][name].[ext]",
          limit: 5000,
          publicPath: config.platform
        }
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?.*)?$/,
        exclude: excluce,
        loader: 'url',
        query: {
          name: "images/[name]_[hash:8].[ext]",
          limit: 1000,
          publicPath: config.platform
        }
      },
      {
        test: /\.html$/,
        exclude: excluce,
        loader: 'html'
      },
      {
        test: /\.html$/,
        exclude: excluce,
        loader: 'include-html',
        query: {
          root: './src'
        }
      }
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextWebpackPlugin.extract('css'),
      less: ExtractTextWebpackPlugin.extract('css!less'),
      sass: ExtractTextWebpackPlugin.extract('css!sass')
    },
    postcss: [autoprefixer({browsers: ['last 5 versions']})]
  },
  postcss: [autoprefixer({browsers: ['last 5 versions']})],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
};