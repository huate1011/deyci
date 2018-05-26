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

  /**
     * 点击「登录」按钮，测试登录功能
     */
  goToIndex: function (e) {

    util.showBusy('正在登录');

    var that = this;
    var userInfo = e.detail.userInfo;    
    try {
      wx.setStorageSync('deyci:userInfo', e.detail.userInfo)
      wx.setStorageSync('deyci:code', this.data.authentication_code)
      wx.setStorageSync('deyci:encryptedData', e.detail.encryptedData)
      wx.setStorageSync('deyci:iv', e.detail.iv)
    } catch (e) {
      util.showModel('储存信息失败', e)
    }

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          // 检查登录是否过期
          wx.checkSession({
            success: function () {
              // 登录态未过期              
              console.log('登录成功', userInfo);
              wx.switchTab({
                url: '/pages/public_survey/public_survey'
              })              
            },

            fail: function () {
              qcloud.clearSession();
              // 登录态已过期，需重新登录
              var options = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                userInfo: userInfo
              }
              that.getWxLogin(options);
            },
          });
        } else {
          util.showModel('用户未授权', e.detail.errMsg);
        }
      }
    });
  },

  getWxLogin: function (options) {
    var that = this;

    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: options.encryptedData,
          iv: options.iv,
        }
        qcloud.requestLogin({
          loginParams, success() {            
            console.log('登录成功', options.userInfo);
            wx.redirectTo({
              url: '/pages/public_survey/public_survey'
            })
          },
          fail(error) {
            util.showModel('登录失败', error)
            console.log('登录失败', error)
          }
        });
      },
      fail: function (loginError) {
        util.showModel('登录失败', loginError)
        console.log('登录失败', loginError)
      },
    });
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