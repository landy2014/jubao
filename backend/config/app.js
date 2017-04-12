/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/11
 *
 * ---------------------------------------------------
 */
// 引入基础设置
let app = require('./app.config.base');

// https://github.com/expressjs/vhost
//let vhost = require('vhost');

// https://www.npmjs.com/package/require-dir
//let requireDir = require('require-dir');

// 全局配置
let config = require('./production.json');

// fs模块
let fs = require('fs');

let homeRouter = require('../router/www');

app.use('/', homeRouter);
/**
 * 虚拟主机
 * 主机下的对应路由请到vhosts下查看对应的路由，便可找到对应的路由进行修改
 */
//requireDir('../vhosts', {recurse: true});

/**
 * 自定义404，500 中间件
 */
 404
app.use(function(req, res){
  res.status(404).send('Page Not Found');
});

// 500
app.use(function(req, res){
  res.status(500).send('Server Error!');
});

// 后端代码监听端口
let httpPort = config.www.http || 9090;

// 后端代码webserver
app.listen(httpPort);

module.exports = app;