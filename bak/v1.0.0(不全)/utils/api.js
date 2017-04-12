const areaCode = require('../data/pcc');

// 获取快递信息接口
function getExpressInfo(num, cb) {
    let reqURL = 'https://www.13css.com/express/info';

    wx.request({
        url: reqURL,
        data: {
            no: num
        },
        dataType: 'json',
        success: (res) => {
            cb(res);
            console.log(res);
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

// 获取地区天气接口
function getWetherInfo(code, typeCode, cb) {
    let reqURL = 'https://www.13css.com/wether/info/v2';
    let timeObj = new Date();
    let time = timeObj.getFullYear() + timeObj.getMonth() + timeObj.getDate();

    wx.request({
        url: reqURL,
        data: {
            code: code,
            time: time,
            type: typeCode
        },
        success: function(result){
            cb(result);
        }
    })
}



module.exports = {
    getExpressInfo: getExpressInfo,
    getLocationInfo: getLocationInfo,
    getLocationCodeByName: getLocationCodeByName,
    getWetherInfo: getWetherInfo
}