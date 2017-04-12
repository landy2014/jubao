/**
 * ---------------------------------------------------
 *
 *  author: landy
 *  date:   17/3/23
 *
 * ---------------------------------------------------
 */
const request = require('request');
const md5 = require('md5');

// ip138平台接口
function getExpressInfo(no, cb) {
  // http://user.ip138.com/productorder/?pid=5 平台接口信息
  let expressAPI = {
    token: 'e33a744af0f46816eb8f7a7efe2f2358',
    oid: 7218,
    mid: 70588
  };

  let sign = md5('no='+ no + '&token=' + expressAPI.token);

  let reqURL = 'http://api.ip138.com/express/info/?no=' + no +'&token='+ expressAPI.token + '&oid=' + expressAPI.oid + '&mid=' + expressAPI.mid + '&sign=' + sign;

  request(reqURL, (err, res, body) => {
    cb(res.body);
  });

}

// aliyun 平台接口
function getExpressInfoV2(no, cb) {
  let appCode = '6f7b4b54e325493f834bd637d874d5c8';
  let authorization = 'APPCODE ' + appCode;
  let reqURL = 'http://aliapi.kuaidi.com/kuaidiinfo';

  request({
    url: reqURL,
    headers: {
      'Authorization': authorization
    },
    qs: {
      'nu': no
    }
  }, function(err, response, body){
    if (err) {
      cb(err);
    } else {
      cb(response.body);
    }
  });

}

module.exports =  {
  getExpressInfo: getExpressInfo,
  getExpressInfoV2: getExpressInfoV2
};