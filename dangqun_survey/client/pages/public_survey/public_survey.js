// pages/survey/survey.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var constants = require('../../vendor/wafer2-client-sdk/lib/constants')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_id: null,
    surveyType: 'PersonalSurveys' 
  },

  submitSurvey: function (e) {
    var that = this
    var formData = e.detail.value
    formData['open_id'] = that.data.open_id
    formData['surveytype'] = that.data.surveyType
    util.showBusy('请求中...')
    var options = {
      url: config.service.surveyUrl,
      data: formData,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (result) {        
        if (result.statusCode > 210) {
          util.showModel('提交失败', result.data.error)
        } else {
          util.showSuccess('提交成功')
          wx.setStorageSync('deyci:open_id', that.data.open_id)          
        }
        console.log('request success', result)
      },
      fail: function (error) {
        util.showModel('提交失败', error)
        console.log('request fail', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this    
    if (that.data.open_id === null) {
      var that = this
      wx.login({
        success: function (loginResult) {
          console.log("Onload request code: " + loginResult.code)
          wx.setStorageSync("deyci:code", loginResult.code)
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success: (response) => {              
              console.log("Found open id" + response.data.data.openId);
              that.setData({ open_id: response.data.data.openId });
            },
            fail: (response) => {
              console.log("fail to find open id: " + response)
              that.setData({ open_id: wx.getStorageSync('deyci:userInfo')})
            }            
          });
        },
        fail: function (loginError) {
          console.log('微信登录失败，请检查网络状态' + loginError);
        },
      });      
    }
  
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