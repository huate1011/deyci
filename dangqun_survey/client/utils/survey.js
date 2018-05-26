var config = require('../config')
var util = require('util')

var loadData = () => {
  if (wx.getStorageSync('deyci:open_id') === null || wx.getStorageSync('deyci:open_id') === "") {    
    wx.login({
      success: function (loginResult) {
        console.log("Onload request code: " + loginResult.code)
        wx.setStorageSync("deyci:code", loginResult.code)
        qcloud.request({
          url: config.service.requestUrl,
          login: true,
          success: (response) => {
            console.log("Found open id" + response.data.data.openId);
            wx.setStorageSync('deyci:open_id', response.data.data.openId)
          },
          fail: (response) => {
            console.log("fail to find open id: " + response)
          }
        });
      },
      fail: function (loginError) {
        console.log('微信登录失败，请检查网络状态' + loginError);
      },
    });
  }

  var l = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + config.service.appId + '&secret=' + config.service.appSecret;
  wx.request({
    url: l,
    data: {},
    method: 'GET',
    // header: {}, // 设置请求的 header  
    success: function (res) {                
      var access_token = {}
      access_token.token = res.data.access_token
      access_token.expiry = Date.now() + res.data.expires_in
      wx.setStorageSync('deyci:accessToken', access_token)
      console.log("Successfull get access token:" + res.data.access_token)
    },
    fail: function (e) {        
      console.log("failed to get access token:" + e)
    }
  });  
}

var sendSurvey = (takeSession, e, surveyType) => {  
  var formData = e.detail.value  
  if (wx.getStorageSync('deyci:open_id') === null || wx.getStorageSync('deyci:open_id') === "") {
    formData['open_id'] = wx.getStorageSync('deyci:userInfo')
  } else {
    formData['open_id'] = wx.getStorageSync('deyci:open_id')
  }
  formData['surveytype'] = surveyType
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
        if (wx.getStorageSync('deyci:accessToken') && wx.getStorageSync('deyci:open_id')) {
          util.sendMsg(
            wx.getStorageSync('deyci:open_id'),
            wx.getStorageSync('deyci:accessToken').token,
            e.detail.formId,
            wx.getStorageSync('deyci:userInfo').nickName
          );
        }
      }
      console.log('request success', result)
    },
    fail: function (error) {
      util.showModel('提交失败', error)
      console.log('request fail', error);
    }
  }
  if (takeSession) {  // 使用 qcloud.request 带登录态登录
    qcloud.request(options)
  } else {    // 使用 wx.request 则不带登录态
    wx.request(options)
  }
}

module.exports = { loadData, sendSurvey  }
