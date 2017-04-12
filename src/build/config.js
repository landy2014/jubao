/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/1/11
 *
 * ---------------------------------------------------
 */
module.exports = {
  // node服务端配置
  server: {
    port: 8080,
    // 服务器域名
    domain: 'localhost'
  },
  // 静态资源配置
  static: {
    port: 8081,
    domain: 'dev.jjcdn.com'
  },
  // 静态资源源代码目录
  sourcePath: './src/page',

  routerPath: '/mobile/views/',
  // 图片源目录
  imgRootPath: './src/images',
  // 平台目录
  platform: '/mobile/',
  dev: {
    env: require("./dev.env.js"),
    port: '8080',
    assetsRoot: './static',
    outputPath: './static/mobile'
  },
  build: {
    env: require("./prod.env.js"),
    outputPath: './static/mobile'
  }
};