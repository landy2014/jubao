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
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;

    API.getNewsList('top', function (res) {
      console.log(JSON.parse(res.data));
      let data = JSON.parse(res.data);
      if (data.result.stat) {
        that.setData({
          hasData: true,
          List: data.result.data
        })
      }
    })
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