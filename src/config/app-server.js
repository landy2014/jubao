/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/11
 *
 * ---------------------------------------------------
 */
// 引入基础设置
let app = require('./app.base');

// https://github.com/expressjs/vhost
let vhost = require('vhost');

// https://www.npmjs.com/package/require-dir
let requireDir = require('require-dir');

// 全局配置
let config = require('./config');

/**
 * 虚拟主机
 * 主机下的对应路由请到vhosts下查看对应的路由，便可找到对应的路由进行修改
 */
requireDir('../vhosts', {recurse: true});

/**
 * 自定义404，500 中间件
 */
// 404
app.use(function(req, res, next){
  res.send(404, 'Page Not Found');
  next();
});

// 500
app.use(function(req, res, next){
  res.send(500, 'Server Error!');
  next();
});

let port = process.env.PORT || config.server.port || 8080;
let domain = config.server.domain || 'localhost';
let uri  = 'http://' + domain || 'localhost';

app.listen(port, domain, function(err){
  if (err) { throw err; }
  console.log('serving in ' + uri);
});