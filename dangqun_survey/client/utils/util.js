var config = require('../config')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success',
    duration: 3000
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

var encodeWXResult = (userInfo, ac, ed, iv, oi) => {
  return 'userInfo=' + JSON.stringify(userInfo) + '&code=' + ac + '&encryptedData=' + ed + '&iv=' + iv + '&open_id=' + oi
}

var decodeWXResult = (options) => {
  var wxResult = {
    userInfo: JSON.parse(options.userInfo),
    code: options.code,
    encryptedData: options.encryptedData,
    iv: options.iv,
    open_id: options.open_id
  }
  return wxResult;
}

var sendMsg = (open_id, form_id, user) => {
  var msgUrl = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=token';
  var d = {
    touser: open_id,
    template_id: config.service.template_id,//这个是1、申请的模板消息id，  
    page: '/pages/start/start',
    form_id: form_id,
    value: {
      "keyword1": {
        "value": user,
        "color": "#4a4a4a"
      },
      "keyword2": {
        "value": Date.now(),
        "color": "#9b9b9b"
      }
    },
    color: '#ccc',
    emphasis_keyword: 'keyword1.DATA'
  }
  wx.request({
    url: config.service.accessTokenUrl,
    data: d,
    method: 'POST',
    success: function (res) {
      console.log("push msg");
      console.log(res);
    },
    fail: function (err) {
      // fail  
      console.log("push err")
      console.log(err);
    }
  });
}

module.exports = { formatTime, showBusy, showSuccess, showModel, encodeWXResult, decodeWXResult, sendMsg}
