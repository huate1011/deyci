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



/**
 * 上传方法
 * filePath: 上传的文件路径
 * fileName： 上传到cos后的文件名
 */
var upload = (signUrl, filePath, fileName) => {  
  // 鉴权获取签名
  wx.request({
    url: signUrl,
    success: function (cosRes) {
      // 头部带上签名，上传文件至COS
      debugger;
      wx.uploadFile({
        url: "https://" + "ap-guangzhou" + ".file.myqcloud.com/files/v2/" + "1256326463" + "/" + "chinaitman" + "/ID" + '/' + fileName,
        filePath: filePath,
        header: { 'Authorization': cosRes.data.data.msg, 'Host': "ap-guangzhou.file.myqcloud.com"},
        name: 'filecontent',
        formData: { op: 'upload' },
        success: function (uploadRes) { //do something 
          console.log(uploadRes)
        },
        complete: function (res) {
          console.log("upload:" + res)
        }
      })
    }, 
    fail: function(e) {
      console.log(e)
    },
    complete: function(res) {
      console.log(res)
    }
  })
}

module.exports = { formatTime, showBusy, showSuccess, showModel, upload }
