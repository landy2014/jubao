// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentURL: 'https://www.13css.com/mobile/283478587'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let requestURL = "https://www.13css.com/mobile/";

    let num = options.url.match(/\d{1,}/);
    
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    this.setData({
      contentURL: requestURL + num
    });

    console.log(num, requestURL + num);


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (opt) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})