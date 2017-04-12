/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/3/21
 *
 * ---------------------------------------------------
 */
const compression = require('compression');
const bodyParser = require('body-parser');
const cookiePaser = require('cookie-parser');
const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const fsStream = require('file-stream-rotator');
const path = require('path');
const config = require('./production.json');

/**
 *  记录日志
 */
let logDirectory = path.join(process.cwd(), '../static-log');
// 自定义日志参数
// https://github.com/expressjs/morgan
let morganFormat = [
  ':remote-addr',
  ':referrer',
  ':http-version',
  ':url',
  ':method',
  ':status',
  ':date[clf]',
  ':response-time'
].join(' ');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

logWriteStream = fsStream.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
});

app.use(morgan(morganFormat, { stream: logWriteStream}));

/**
 *  允许跨域请求
 */
//app.use('*', function(req, res, next){
//  res.header('Access-Control-Allow-Origin', '*');
//  next();
//});

/**
 * 开启gzip
 */
app.use(compression());

/**
 * 安全基础设置
 */
app.use(helmet());

/**
 *  安全cookie
 */
app.use(cookiePaser());

/**
 * 转换json 数据
 */
app.use(bodyParser.json());

/**
 * 设置静态资源路径
 */
app.use(express.static('./static'));

/**
 * 自定义404，500 中间件
 */
// 404
app.use(function(req, res){
  res.status(404).send('Page Not Found');
});

// 500
app.use(function(req, res){
  res.status(500).send('Server Error!');
});

// 静态资源监听端口
let httpPort = 9091;

// 静态资源webserver
app.listen(httpPort);

module.exports = app;