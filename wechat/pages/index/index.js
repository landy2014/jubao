//index.js
//获取应用实例
let app = getApp();
let api = require('../../utils/api.js');
// 页面逻辑
Page({
  onShareAppMessage: function(){
    return {
      title: '聚宝生活实时查快递',
      path: '/pages/index/index',
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
    userInfo: {},
    expressData: '',
    orderNumber: '',
    hasData: false,
    delIcon: '../../images/commonIcon/trash.png',
    startX: 0,
    startY: 0,
    isDelete: false,
    // 无内容时提示
    noDataTip: {
      imgUrl: '../../images/expressIcon/404.png',
      text: '暂时没有内容，你试试查个快递我就有内容了.'
    },
    // 扫码图片
    scanImg: {
      src: '../../images/expressIcon/scan.png'
    },
    // 缓存数据列表
    cacheList: []
  },
  // 删除单个缓存数据
  deleteItem(event) {
    let no = event.target.dataset.no;
    try {
      wx.removeStorageSync(no);
      this.updateStorage();
    } catch(e) {
      throw e;
    }
  },
  // 切换是否删除状态
  toggleDeleteClass() {
    this.setData({
      isDelete: this.isDelete ? false: ''
    })
  },
  // 处理列表项触摸开始
  handleTouchStartEvent(e) {
    let that = this;
    
    that.startX = e.touches[0].pageX;
    that.startY = e.touches[0].pageY;

    // console.log(that.startX, that.startY);

  },
  // 处理列表项触摸结束
  handleTouchEndEvent(e) {
    
    let that = this;
    let endX = e.changedTouches[0].pageX;
    let endY = e.changedTouches[0].pageY;

    // console.log(endX, endY);

    let disX = endX - that.startX;
    let disY = endY - that.startY;

    let absDisX = Math.abs(disX);
    let absDisY = Math.abs(disY);

    let tan = (absDisY / absDisX) * 100;

    if (disY === 0) {
      if (absDisX > 100) {
        console.log('dfdf');
        that.setData({
          isDelete : true
        })
      } else {
        let val = e.currentTarget.dataset.no;

        if (!val) {
          return;
        }

        that.jumpToDetail(val);
      }
    } else {
      if (absDisX > 100 && (0 <= tan && tan <= 15) ) {
        // console.log('dfdf1111');
        that.setData({
          isDelete : true
        });
      }
    }
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
  onLoad () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    
  },
  updateStorage() {
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

      // 按照时间倒序
      tempArr.sort( (a, b) => {
        if (a.time > b.time) return -1;
        if (a.time < b.time) return 1;
        return 0;
      });

      // 更新缓存数据
      that.setData({
        cacheList: tempArr
      });

    } else {
      that.setData({
        hasData: false
      });
    }
  },
  // 每次显示页面都更新缓存数据
  onShow() {
    let test = function() {
      console.log('hi, world!');
      wx.navigateTo({
        url: '../detail/detail',
      })
    };
      // wx.showToast({
      //   duration: 3000,
      //   title: '请等待三秒...'
      // });

      // setTimeout(test, 3000);
    
    this.updateStorage();
    wx.getSetting({
      success: function(res) {
        console.log(res, res.authSetting['scope.userInfo']);
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: function (errMsg) {
              console.log(errMsg);
            },
            fail: function() {
              wx.openSetting({
                success: function(authSetting) {
                  console.log(authSetting);
                },
                fail: function() {

                }
              })
            },
            complete: function () {
              console.log('complete');
            }
          });
        }
      }
    })
    
  }
})
