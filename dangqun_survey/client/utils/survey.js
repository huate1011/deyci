var qcloud = require('../vendor/wafer2-client-sdk/index')
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
            var open_id = response.data.data.openId
            if (open_id instanceof string && open_id.trim() !== "") {
              console.log("Found open id" + open_id);
              wx.setStorageSync('deyci:open_id', open_id)
            }            
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
}

var sendSurvey = (takeSession, formData, formId, surveyType) => {  
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
        if (wx.getStorageSync('deyci:open_id')) {          
          util.sendMsg(
            wx.getStorageSync('deyci:open_id'),            
            formId,
            wx.getStorageSync('deyci:userInfo').nickName
          );
          wx.redirectTo({
            url: '/pages/weixindoc/weixindoc'
          })
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
