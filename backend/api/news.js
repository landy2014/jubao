// 新闻模块
let request = require('request');

module.exports = {
  getNewsList: (types, cb) => {
    let type = types || 'top';
    const AppCode = '6f7b4b54e325493f834bd637d874d5c8';
    let Authorization = 'APPCODE ' + AppCode;
    let reqURL = 'http://toutiao-ali.juheapi.com/toutiao/index';

    // 发起请求
    request({
      url: reqURL,
      headers: {
        'Authorization': Authorization
      },
      qs: {
        'type': type
      }
    }, (err, response, body) => {

      if (err) {
        cb(err)
      } else {
        cb(response.body)
      }
    });
    
  }
}