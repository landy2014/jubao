
const areaCode = require('../../data/pcc');
const util = require('../../utils/api');

Page({
    data: {
      current: '天河区',
      pointIcon: '../../images/point.png',
      wetherDetail: '',
      hasData: false,
      publishTime: new Date()
    },
    onShow: function(){
        let that = this;
        // wx.showToast({
        //     title: '正在查询',
        //     icon: 'loading'
        // });
        // 获取本地经纬度
        // wx.getLocation({
        // type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        // success: function(res) {
        //     let latitude = res.latitude;
        //     let longitude = res.longitude;
        //     let temp = null;
        //     let code = null;
        //     // 使用经纬度获取本地地区信息
        //     util.getLocationInfo(latitude, longitude, function(result){
        //         temp = JSON.parse(result);
        //         let locationName = temp.result.ad_info.district;
        //         // 根据地区名称获取地区代码
        //         code = util.getLocationCodeByName(locationName);
        //         if (code) {
                   
        //             // 获取天气信息
        //             util.getWetherInfo(code, 3, function(response){

        //                  // 设置当前地区
        //                 that.setData({
        //                     current: locationName,
        //                     wetherDetail: response.data,
        //                     hasData: true,
        //                     publishTime: response.data.data.time.split(' ')[1]
        //                 });
        //                 // 关闭提示
        //                 wx.hideToast();
                        
        //             });
        //         }
        //     });
        // },
        // fail: function() {
        //     // 根据地区名称获取地区代码
        //     let code = util.getLocationCodeByName('天河区');
        //     if (code) {
        //         // 获取天气信息
        //         util.getWetherInfo(code, 3, function(response){

        //             // 设置当前地区
        //             that.setData({
        //                 wetherDetail: response.data,
        //                 hasData: true,
        //                 publishTime: response.data.data.time.split(' ')[1]
        //             });
        //             // 关闭提示
        //             wx.hideToast();
                    
        //         });
        //     }
        // }
        // })
    }
});