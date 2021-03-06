// pages/login/login.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content, success) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false,
    success: success || function(){}
  });
};

// validate form
var validateForm = (formData, thisData) => {
  if (formData['籍贯'].trim() === "") {
    return '籍贯忘记填了';
  }
  if (formData['工作单位'].trim() === "") {
    return '工作单位忘记填了';
  }
  if (formData['紧急联系人'].trim() === "") {
    return '紧急联系人忘记填了';
  }
  if (formData['紧急联系电话'].trim() === "") {
    return '紧急联系人电话忘记填了';
  }
  if (formData['政治面貌'].trim() === "") {
    return '政治面貌忘记填了';
  }
  if (new Date().getFullYear() - new Date(thisData.dob).getFullYear() > 18 && formData['电话'].trim() === "") {
    return '手机号码忘记填了';
  }
  if (formData['居住地址'].trim() === "") {
    return '居住地址忘记填了';
  }
  if (formData['所在街道社区'].trim() === "") {
    return '街道社区忘记填了';
  }
  if (formData['personalidtype'] === "chineseid" && !/^\d{17}(\d|x)$/i.test(formData['personalid'])) {
    return '身份证号码不正确';
  }
  if (thisData.idhead === undefined) {
    return '身份证正面照片还没上传';
  }
  if (thisData.idback === undefined) {
    return '身份证背面照片还没上传';
  }

  if (formData['电子邮箱'] !== "" && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formData['电子邮箱'])) {
    return '邮箱不正确';
  }
  return null;

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    logged: false,
    agreed: false,
    takeSession: false,
    requestResult: '',
    dob: '',
    pob: '',
    customItem: '其他'
  },

  agree: function (e) {
    var that = this
    that.setData({
      agreed: true
    })
  },

  decline: function (e) {
    wx.navigateBack({
      delta: -1
    })
  },

  doRegister: function (e) {
    var formData = e.detail.value
    var validationResult = validateForm(formData, this.data);
    if (validationResult !== null){
      showModel('错误', validationResult)
      return false
    }

    util.showBusy('请求中...')
    var that = this
    var open_id = this.data.open_id
    formData['身份证正面'] = this.data.idhead
    formData['身份证反面'] = this.data.idback
    formData['open_id'] = open_id    
    formData['生日'] = this.data.dob
    formData['户籍'] = this.data.pob
    formData['性格'] = [formData.personalityone, formData.personalitytwo, formData.personalitythree]
    if (formData['personalidtype'] === "otherid") {
      formData['身份号'] = '其他-' + formData['身份号']
    }
    delete formData['personalityone']
    delete formData['personalitytwo']
    delete formData['personalitythree']
    delete formData['personalidtype']
    console.log('form发生了submit事件，携带数据为：', e.detail.value)    
    var options = {
      url: config.service.registerUrl,      
      data: formData,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(result) {
        if (result.statusCode > 210) {
          showModel('注册失败', result.data.error) 
        } else {
          wx.setStorageSync('deyci:open_id', open_id)
          showModel('注册成功', result.data, function(result){            
            wx.redirectTo({
              url: '/pages/chat/chat'
            })
          });           
        }        
        console.log('request success', result)        
      },
      fail: function(error) {
        showModel('注册失败', error)        
        console.log('request fail', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录  
      util.wxSafeCall(qcloud.request, options, config.service.registerUrlBackup)
    } else {    // 使用 wx.request 则不带登录态
      util.wxSafeCall(wx.request, options, config.service.registerUrlBackup)
    }
  },

  // 上传图片接口
  doUpload: function (e) {
    var that = this
    var e_name = e.currentTarget["dataset"].name

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var filePath = res.tempFilePaths[0]
        showBusy('上传图片中...')
        var options = {         
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            try{
              res = JSON.parse(res.data)
              console.log(res)
              var data = {}
              data[e_name] = res.data.imgUrl
              that.setData(data)
              showSuccess('上传图片成功')
            } catch (err){
              showModel('上传图片失败', err)
            }
          },

          fail: function (e) {
            showModel('上传图片失败', e)
            console.error(e)
          }
        }
        util.wxSafeCall(wx.uploadFile, options, config.service.uploadUrlBackup)        
      },
      fail: function (e) {
        showModel('图片选择失败', e)
        console.error(e)
      }
    })
  },
  clearPic: function (e) {//删除图片
    var that = this
    var e_name = e.currentTarget["dataset"].name
    var data = {}
    data[e_name] = ""
    that.setData(data)
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dob: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pob: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 调用登录接口    
    var options = {
      url: config.service.requestUrl,      
      login: true,
      success(result) {
        console.log("reg:" + result.data.data)
        that.setData({
          open_id: result.data.data.openId,          
        })                  
      },

      fail(error) {
        util.showModel('请求失败', error)
        console.log('request fail', error)
      }
    }    
    util.wxSafeCall(qcloud.request, options, config.service.requestUrlBackup);
    // Set rendering data for this page
    var that = this
    that.setData({
      userInfo: wx.getStorageSync('deyci:userInfo'),
      logged: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})