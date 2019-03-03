// miniprogram/pages/requestList/requestList.js
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

  /**
   * Page initial data
   */
  data: {
    helpList: []

  },

  viewMap: function(e) {
    var coords = e.currentTarget.dataset.coords;
    wx.openLocation({
      latitude: coords[0],
      longitude: coords[1],
      scale: 18,
      address: e.currentTarget.dataset.address
    })
  },

  offerHelp: function (e) {
    var that = this;
    wx.request({
      url: "https://helpvoice.leanapp.cn/todos",
      method: "POST",
      data: {
        objectId: e.currentTarget.dataset.objectid,
      },
      success(res) {
        showSuccess('请求成功完成');
        console.log('request success', JSON.stringify(res.data.result));
        that.setData({
          helpList: res.data.result
        })
      },
      fail(error) {
        showModel('请求失败', error);
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: "https://helpvoice.leanapp.cn/todos",
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('request success', JSON.stringify(res.data.result));
        that.setData({
          helpList: res.data.result
        })
      },
      fail(error) {
        var list = [];
        for (let i = 0; i < 10; i++) {
          list.push({
            openId: "open id " + i,
            voiceText: "voice text",
            userName: "User nick name " + i,
            phone: 13629238272,
            accepted: i % 2 === 0 ? "success" : "cancel",
            gender: "M",
            address: "宝安区创业一路(深圳市宝安区政府)",
            coords: [22.55329, 113.88308],
            dtime: "2010-10-01"
          });
        }
        that.setData({
          helpList: list
        })
      }
    })

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})