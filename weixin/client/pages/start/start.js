//login.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var constants = require('../../vendor/wafer2-client-sdk/lib/constants')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    authentication_code: "",
    logged: false,    
    remind: '加载中',
    angle: 0,
    year: 2018,
    userInfo: {}
  },
  
  goToIndex:function(e){   
    var that = this
    try {
      wx.setStorageSync('deyci:userInfo', e.detail.userInfo)
      wx.setStorageSync('deyci:code', this.data.authentication_code)
      wx.setStorageSync('deyci:encryptedData', e.detail.encryptedData)
      wx.setStorageSync('deyci:iv', e.detail.iv)
    } catch (e) {
      util.showModel('储存信息失败', e)
    }
    
    // If there is already a valid open id, then the user has been registered
    // and will go to chat directly
    try {
      var value = wx.getStorageSync('deyci:open_id')
      if (value) {        
        wx.request({
          url: config.service.sqlqueryUrl,
          data: { open_id: value },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            var result = res.data.result
            if (result == 'Registered') {
              wx.redirectTo({
                url: '/pages/login/login'
              })
              return
            } else {
              wx.removeStorageSync('deyci:open_id')
              // Otherwise, this user needs to be registered
              wx.redirectTo({
                url: '/pages/login/login'
              })
            }
          }
        })        
      } else {
        // Otherwise, this user needs to be registered
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }
    } catch (e) {
      util.showModel('查找openid失败', e)
    }        
  },


  onLoad:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 用户登录示例 
    if (this.data.logged || this.data.authentication_code) return    
    var that = this    
    wx.login({
      success: function (loginResult) {        
        that.setData({ authentication_code: loginResult.code})
      },
      fail: function (loginError) {
        util.showModal(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态')
      },
    });    
  },

  
  onReady: function(){
    var _this = this;
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(_this.data.angle !== angle){
        _this.setData({
          angle: angle
        });
      }
    });
  },
});