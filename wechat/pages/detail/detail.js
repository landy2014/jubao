let api = require('../../utils/api');
Page({
  data: {
    expressNo: '',
    expressDetail: {
        company: '',
        companytype: '',
        state: ''
    },
    expressIcon: '../../images/expressIcon/express.png',
    noData: '',
    hasData: false
  },
  onLoad: function(res) {
    let that = this;
    let cacheDetail = wx.getStorageSync(res.no);
    if (cacheDetail) {
        that.setData({
            expressNo: res.no,
            expressDetail: cacheDetail.detail,
            hasData: true
        })
    } else {

      that.setData({
        expressNo: res.no
      })
    }
   
  },
  onReady: function() {
    let that = this;
    wx.showToast({
        title: '查询中',
        icon: 'loading'
    });

    if (that.data.expressDetail.state === 6) {
        return;
    } else {
        api.getExpressInfo(that.data.expressNo, (res) => {
            // 隐藏提示窗
            wx.hideToast();

            let tempData = JSON.parse(res.data);
            if (tempData.success) {
                that.setData({
                    expressDetail: tempData,
                    hasData: true
                });

                // 缓存到本地
                wx.setStorageSync(that.data.expressNo,{
                    no: that.data.expressNo,
                    detail: that.data.expressDetail,
                    time: new Date()
                });
            } else {
                that.setData({
                    noData: tempData.reason
                })
            }
            
        });
    }
    
  }
});