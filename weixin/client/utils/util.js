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

var wxSafeCall = (mainFn, options, urlBackup) => {  
  var failFn = options.fail
  var completeFn = options.complete
  options.fail = function (err) {    
    console.log("Function fail to call: " + err.errMsg || err.message)
    options.url = urlBackup    
    options.loginUrl = config.service.loginUrlBackup
    options.fail = failFn
    options.complete = completeFn
    mainFn(options)
  }
  options.complete = function() {}
  options.loginUrl = config.service.loginUrl
  mainFn(options)
}

module.exports = { formatTime, showBusy, showSuccess, showModel, encodeWXResult, decodeWXResult, wxSafeCall}
