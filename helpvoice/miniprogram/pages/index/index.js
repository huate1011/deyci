//index.js
const app = getApp()
const recorderManager = wx.getRecorderManager();
const QQMapWX = require('../../qqmap-wx-jssdk.js');
const qqmapsdk = new QQMapWX({
  key: 'GP7BZ-W7DHV-OUVPP-USP2S-WPGI5-M6B3D'
});

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    formNum: 0
  },
  startRecordingVoice: function (e) {
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      var that = this;
      wx.uploadFile({
        url: "https://3abwy1fn.api.lncld.net/1.1/files/voice.mp3",
        filePath: res.tempFilePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data',
          'X-LC-Id': '3Abwy1fn2WmYm65lUani5aIX-gzGzoHsz',
          'X-LC-Key': 'iYELERXrQBkdtSUWPSm6fAmV'
        },
        success: function (res) {
          var str = res.data;
          console.log("Got success voice upload " + JSON.stringify(str));
          var data = JSON.parse(str);
          if (data.url !== undefined && data.url.length > 0) {
            that.setData({ voiceUrl: data.url });
            console.log("saved url: " + that.data.voiceUrl);
          }
          that.sendMsg();
        },
        fail: function (res) {
          console.log("Failed to request upload " + JSON.stringify(res));
        }
      });
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 10000,
      sampleRate: 8000,
      numberOfChannels: 1,
      encodeBitRate: 16000,
      format: 'mp3',
      frameSize: 50
    }

    recorderManager.start(options);
  },

  stopRecordingVoice: function (e) {
    recorderManager.stop();
  },

  collectFormId: function (e) {
    if (this.data.openId === undefined) {
      this.getOpenId();
    }
    let formId = e.detail.formId;
    let formIds = this.data.formIds || [];
    formIds.push(formId);
    this.setData({ formIds: formIds, formNum: this.data.formNum + 1 });
    console.log("Form number: ", this.data.formNum);
    console.log("Current form Ids: ", this.data.formIds);
  },

  sendMsg: function () {
    this.setLocation();
    console.log("form id:", this.data.formIds);
    console.log("open id:", app.globalData.openid);
    console.log("voice url:", this.data.voiceUrl);
    console.log("Username:", this.data.userInfo.nickName);
    console.log("Gender:", this.data.userInfo.gender);
    console.log("Address:", this.data.address);
    console.log("Coords:", this.data.coords);
    var that = this;
    var options = {
      url: "https://helpvoice.leanapp.cn/sendMsg",
      method: 'POST',
      data: { 
        openId: app.globalData.openid, 
        formIds: that.data.formIds, 
        voiceUrl: that.data.voiceUrl,
        username: that.data.userInfo.nickName,
        gender: that.data.userInfo.gender,
        phone: 1361023921232,
        address: that.data.address,
        coords: that.data.coords
        },
      success(result) {
        showSuccess('请求成功完成')
        console.log('request success', result)
        that.setData({
          requestResult: JSON.stringify(result.data)
        })
      },
      fail(error) {
        showModel('请求失败', error);
        console.log('request fail', error);
      }
    }
    wx.request(options);
    this.setData({ formIds: [] });
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    var that = this;

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }

        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation', 
          })
        }

        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
          })
        }
      }
    })
  },

  setLocation: function() {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var address = addressRes.result.formatted_addresses.recommend;
            console.log("Got address: " + address + " and coords: " + [res.latitude, res.longitude]);
            that.setData({
              address: address,
              coords: [res.latitude, res.longitude]
            })
          },
          fail: function (err) {
            console.log("Error: " + err);
          }
        })
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  getOpenId: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        // wx.navigateTo({
        //   url: '../userConsole/userConsole',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
