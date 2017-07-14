/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/11
 *
 * ---------------------------------------------------
 */
let compression = require('compression');
let bodyParser = require('body-parser');
let cookiePaser = require('cookie-parser');
let express = require('express');
let app = express();
let helmet = require('helmet');
let morgan = require('morgan');
let fs = require('fs');
let fsStream = require('file-stream-rotator');
let path = require('path');

// 模板引擎
let handlebars = require('express-handlebars').create({
  defaultLayout: 'main',
  extname: '.hbs'
});

// 静态资源目录
app.use(express.static(path.join(process.cwd(), './static')));

/**
 *  记录日志
 */
let logDirectory = path.join(process.cwd(), '../server-log');
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
app.use('*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

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
 * 使用模板引擎
 */
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.set('trust proxy', true);

module.exports = app;