
const areaCode = require('../../data/pcc');
const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
    onShareAppMessage: function(){
    return {
      title: '聚宝生活实时查看天气',
      path: '/pages/wether/wether',
      success: function(response) {
        if (response.success == 'shareAppMessage:ok') {
          wx.showToast({
            title: '分享成功！',
            icon: 'success'
          });
        }
      }
    }
  },
    data: {
      imgURL: '../../images/weatherIcon/list.png',
      // 当天天气实况
      condition: {
        temp: '',
        condition: '',
        humidity: '',
        sunRise: '',
        sunSet: '',
        updatetime: '',
        tips: '',
        windDir: '',
        windLevel: '',
        icon: ''
      },
      // 城市信息
      city: {
        date: util.formatTime(),
        pname: '广东省',
        name: '天河区'
      },
      // 24小时数据
      hourly: [],
      // 15天预测
      fiftyDays: [],
      hasToday: false,
      hasTwenty: false,
      hasFifty: false
    },
    onShow: function(){
        let that = this;

        wx.showToast({
            title: '',
            icon: 'loading'
        });

        that.getLocation();
    },
    onPullDownRefresh: function() {
        // 下拉天气信息
        this.getLocation();
        wx.stopPullDownRefresh();
    },
    // 获取本地经纬度后获取天气信息
    getLocation: function() {
        let that = this;

         wx.getLocation({
            type: 'gcj02',
            success: function(res) {
                let lat = res.latitude;
                let lon = res.longitude;
                // 获取天气实况
                api.getWeatherCondition({
                    lat: lat,
                    lon: lon
                }, function(result){
                    if (result.errMsg === 'request:ok') {
                        that.formatCondition(result);
                    }
                });

                // 获取24小时预报
                api.getWeatherTwentyFourHours({
                    lat: lat,
                    lon: lon
                },function(result){
                    if (result.errMsg === 'request:ok') {
                        that.formatHourly(result);
                    }
                });
                // 获取15天预报
                api.getWeatherFiftyDays({
                    lat: lat,
                    lon: lon
                }, result => {
                    if (result.errMsg === 'request:ok') {
                        that.formatFifty(result);
                    }
                })
            },
            fail: function() {

            }
        })
    },
    formatCondition: function(conditionData) {
        let that = this;
        let tempData = JSON.parse(conditionData.data);
        if (tempData.code === 0 && tempData.msg === 'success') {
            
            that.setData({
                city: {
                    date : util.formatTime(),
                    pname: tempData.data.city.pname,
                    name: tempData.data.city.name
                },
                condition: {
                    condition: tempData.data.condition.condition,
                    temp: tempData.data.condition.temp,
                    updatetime: tempData.data.condition.updatetime.split(' ')[1],
                    icon: '../../images/weatherIcon/w' +tempData.data.condition.icon + '.png',
                    humidity: tempData.data.condition.humidity,
                    windDir: tempData.data.condition.windDir,
                    windLevel: tempData.data.condition.windLevel,
                    tips: tempData.data.condition.tips,
                    sunRise: tempData.data.condition.sunRise,
                    sunSet: tempData.data.condition.sunSet
                },
                hasToday: true
            })

        }
    },
    formatHourly: function(hourly){
        let data = JSON.parse(hourly.data).data;
        let tempArr = [];
        let tempData = data.hourly;
        let len = tempData.length;
        
        tempData.forEach(function(cur){
            tempArr.push({
                condition: cur.condition,
                temp: cur.temp,
                hour: cur.hour,
                icon: '../../images/weatherIcon/w' + cur.iconNight + '.png'
            });
        });

        this.setData({
            hourly: tempArr,
            hasTwenty: true
        });
    },
    formatFifty: function(result) {
        let that = this;
        let fiftyData = JSON.parse(result.data).data.forecast;
        let len = fiftyData;

        fiftyData.forEach(function(cur){
            cur.conditionIdDay = '../../images/weatherIcon/w' + cur.conditionIdDay + '.png';
            cur.conditionIdNight = '../../images/weatherIcon/w' + cur.conditionIdNight + '.png';
        });

        that.setData({
            fiftyDays: fiftyData
        });

        setTimeout(function(){
            that.setData({
                hasFifty: true
            })
        },300);

    }
});