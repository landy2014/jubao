/**
 * ---------------------------------------------------
 *
 *  获取天气数据接口
 *
 *  author: landy
 *  date:   17/3/23
 *
 * ---------------------------------------------------
 */
const request = require('request');
const md5 = require('md5');
const util = require('../utils/util');


// 第一版，数据较少，速度慢
function getWetherInfo(code, time, type, cb) {
  // http://user.ip138.com/productorder/?pid=4
  let api = {
    token: '48ebc706e0ffc88f8acff2bc8b7a09aa',
    oid: 7217,
    mid: 70588
  }

  type = type || 1;
  time = time || util.getFormatDay();

  let sign = md5('time=' + time + '&token=' + api.token);

  let reqURL = 'https://api.ip138.com/weather/?code=' + code + '&time=' + time + '&type=' + type + '&oid=' + api.oid + '&mid=' + api.mid + '&sign=' + sign;

  request(reqURL, (err, res, body) => {
    cb(res.body);
  });
}
/**
 * 墨迹获取添加情况接口
 * @param opts 参数
 * @param opts.lat 纬度
 * @param opts.log 经度
 * @param type 请求类型，today为当天天气实况，24为未来24小时预测，15为未来15天预测
 * @param cb   回调函数
 */
function getWeatherInfoV2(opts, type, cb) {
  let appCode = '6f7b4b54e325493f834bd637d874d5c8';
  let authorization = 'APPCODE ' + appCode;

  // 默认请求当天天气实况
  type = type || 'today';

  let reqURL = 'http://aliv8.data.moji.com/whapi/json/aliweather/condition';

  switch(type) {
  case 24:
    reqURL = 'http://aliv8.data.moji.com/whapi/json/aliweather/forecast24hours';
    break;
  case 15:
    reqURL = 'http://aliv8.data.moji.com/whapi/json/aliweather/forecast15days';
    break;
  default:
    break;
  }

  // 请求数据并返回
  request({
    method: 'POST',
    url: reqURL,
    headers: {
      "Authorization": authorization
    },
    qs: {
      "lat": opts.lat,
      "lon": opts.lon
    }
  }, function(err, res, body){
    if (res.statusCode === 200) {
      cb(res.body);
    } else{
      cb(err);
    }
  });
}


module.exports = {
  getWetherInfo: getWetherInfo,
  getWeatherInfoV2: getWeatherInfoV2
};