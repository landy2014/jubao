// pages/news/index.js
let API = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasData: false,
    List: [],
    EmptyTips: '暂无数据'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "数据获取中...",
      mask: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.FetchNewsList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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
    this.FetchNewsList();
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
  
  },
  /**
   * 获取新闻列表公用事件
   */
  FetchNewsList: function() {
    let that = this;

    API.getNewsList('top', function (res) {
      let data = JSON.parse(res.data);
      if (data.result.stat) {
        that.setData({
          hasData: true,
          List: data.result.data
        });
      } else {
        console.log(res);
      }

      wx.hideLoading();
    });
  }
})