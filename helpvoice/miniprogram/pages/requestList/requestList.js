// miniprogram/pages/requestList/requestList.js
Page({

  /**
   * Page initial data
   */
  data: {
    helpList: []

  },

  offerHelp: function (e) {
    var that = this;
    wx.request({
      url: "https://helpvoice.leanapp.cn/offerhelp?openid=" + e.currentTarget.dataset.openid,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(result) {
        showSuccess('请求成功完成');
        console.log('request success', JSON.stringify(result.data));
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
    // var list = [];
    // for (let i = 0; i < 10; i++) {
    //   list.push({
    //     openId: "open id " + i,
    //     voiceText: "voice text",
    //     userName: "User nick name " + i,
    //     phone: 13629238272,
    //     accepted: i % 2 === 0? "success" : "cancel",
    //     gender: "M",
    //     address: "宝安区创业一路(深圳市宝安区政府)",
    //     coords: [22.55329, 113.88308],
    //     dtime: "2010-10-01"
    //   });
    // }
    // that.setData({
    //   helpList: list
    // })
    // return;
    wx.request({
      url: "https://helpvoice.leanapp.cn/todos",
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log('request success', JSON.stringify(res.data.results));
        that.setData({
          helpList: res.data.results
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