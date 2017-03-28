//index.js
//获取应用实例
let app = getApp();
let api = require('../../utils/api.js');
// 页面逻辑
Page({
  data: {
    userInfo: {},
    expressData: '',
    orderNumber: '',
    hasData: false,
    // 无内容时提示
    noDataTip: {
      imgUrl: '../../images/404.png',
      text: '暂时没有内容，你试试查个快递我就有内容了.'
    },
    // 扫码图片
    scanImg: {
      src: '../../images/scan.png'
    },
    // 缓存数据列表
    cacheList: []
  },
  // 扫描快递单
  handleScanOrder: function () {
    var that = this;
    // 调起扫码
    wx.scanCode({
      success: function(res) {
        // 设置input内容
        that.setData({
          orderNumber: res.result
        });

        // 跳转到快递详情页
        that.jumpToDetail(res.result);

      }
    })
  },
  // 查询快递信息
  handleInputConfirm: function(event) {

    let that = this;
    let value = event.detail.value;
    
    if (!value) {
      wx.showModal({
        title: '提示',
        content: '请输入快递单号',
        showCancel: false
      });
      return;
    }

    that.jumpToDetail(value);

  },
  handleTapShowDetail: function(event) {
    let that = this;
    let val = event.currentTarget.dataset.no;

    if (!val) {
      return;
    }

    that.jumpToDetail(val);
  },
  jumpToDetail: function(value) {
    // 跳转到快递详情页
    wx.navigateTo({
      url: '../../pages/detail/detail?no=' + value
    });
  },
  onLoad:  function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    
  },
  // 每次显示页面都更新缓存数据
  onShow: function() {
    let that = this;
    let list = wx.getStorageInfoSync();
    let tempArr = [];

    if (list.keys.length > 0) {
      that.setData({
        hasData: true
      });

      let len = list.keys.length;
      let temp = list.keys;

      for(let i = 0; i < len; i++) {
        tempArr.push(wx.getStorageSync(temp[i]));
      }

      // 更新缓存数据
      that.setData({
        cacheList: tempArr
      });

    } else {
      that.setData({
        hasData: false
      });
    }
  }
})
