const areaCode = require('../data/pcc');

// 获取快递信息接口
function getExpressInfo(num, cb) {
    let reqURL = 'https://www.13css.com/express/info/v2';

    wx.request({
        url: reqURL,
        data: {
            no: num
        },
        dataType: 'json',
        success: (res) => {
            cb(res);
        }
    })
}

// 根据经纬度获取地区名
function getLocationInfo(lat, lng, cb) {
    let reqURL = 'https://www.13css.com/location/info';

    wx.request({
        url: reqURL,
        data: {
            lat: lat,
            lng: lng
        },
        success: function(res) {
            if (res.errMsg === 'request:ok') {
                cb(res.data);
            } else {
                cb({

                })
            }
            
        }
    });

}

//  根据地区名获取地区代码
function getLocationCodeByName(name) {

    for( let key in areaCode) {
        if (areaCode[key] === name) {
            return key
        }
    }

    return false;
}

// 获取当天天气实况接口
function getWeatherCondition(opts, cb) {
    let reqURL = 'https://www.13css.com/weather/condition';
    let lat = opts.lat;
    let lon = opts.lon;

    wx.request({
        url: reqURL,
        data: {
            lat: lat,
            lon: lon
        },
        success: function(result){
            cb(result);
        },
        fail: function(err) {
            cb(err);
        }
    })
}
// 获取24小时预报
function getWeatherTwentyFourHours(opts, cb) {
    let reqURL = 'https://www.13css.com/weather/forceast24hours';
    let lat = opts.lat;
    let lon = opts.lon;

    wx.request({
        url: reqURL,
        data: {
            lat: lat,
            lon: lon
        },
        success: function(result){
            cb(result);
        },
        fail: function(err) {
            cb(err);
        }
    })
}

// 15天天气预报
function getWeatherFiftyDays(opts, cb) {
    let reqURL = 'https://www.13css.com/weather/forceast15days';
    let lat = opts.lat;
    let lon = opts.lon;

    wx.request({
        url: reqURL,
        data: {
            lat: lat,
            lon: lon
        },
        success: function(result){
            cb(result);
        },
        fail: function(err) {
            cb(err);
        }
    })
}

module.exports = {
    getExpressInfo: getExpressInfo,
    getLocationInfo: getLocationInfo,
    getLocationCodeByName: getLocationCodeByName,
    getWeatherCondition: getWeatherCondition,
    getWeatherTwentyFourHours: getWeatherTwentyFourHours,
    getWeatherFiftyDays: getWeatherFiftyDays
}