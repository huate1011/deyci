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
    userInfo: {},
    remind: '加载中',
    angle: 0,
    year: 2018,
    userInfo: {}
  },
  
  goToIndex:function(e){ 
    // wx.redirectTo({
    //   url: '/pages/chat/chat?' + util.encodeWXResult(e.detail.userInfo, this.data.authentication_code, e.detail.encryptedData, e.detail.iv, "asdfasf")
    // })
    // return   
    var that = this
    var wxResult = {
      userInfo: e.detail.userInfo,
      code: this.data.authentication_code,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    }
    // 调用登录接口
    util.showBusy('等待微信授权')
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      wxresult: wxResult,
      success(result) {
        that.setData({
          userInfo: e.detail.userInfo,
          logged: true
        })
        var open_id = result.data.data.openId
        wx.request({
          url: config.service.sqlqueryUrl,
          data: {open_id: open_id},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            var result = res.data.result
            if (result == 'Registered') {
              wx.redirectTo({
                url: '/pages/chat/chat?' + util.encodeWXResult(wxResult.userInfo, wxResult.code, wxResult.encryptedData, wxResult.iv, open_id)
              })
            } else {
              wx.redirectTo({
                url: '/pages/login/login?' + util.encodeWXResult(wxResult.userInfo, wxResult.code, wxResult.encryptedData, wxResult.iv, open_id)
              })
            }            
          },
          fail: function (res) {
            console.log(res.data)
          }
        });        
      },

      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    }) 
  },


  onLoad:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 用户登录示例 
    if (this.data.logged || this.data.authentication_code) return    
    util.showBusy('正在登录')
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