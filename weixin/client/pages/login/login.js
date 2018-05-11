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
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

// validate form
var validateForm = (formData, thisData) => {
  if (formData['origin'].trim() === "") {
    return '籍贯忘记填了';
  }
  if (formData['workplace'].trim() === "") {
    return '工作单位忘记填了';
  }
  if (formData['emergencyname'].trim() === "") {
    return '紧急联系人忘记填了';
  }
  if (formData['emergencyphone'].trim() === "") {
    return '紧急联系人电话忘记填了';
  }
  if (formData['politics'].trim() === "") {
    return '政治面貌忘记填了';
  }
  if (formData['phone'].trim() === "") {
    return '手机号码忘记填了';
  }
  if (formData['address'].trim() === "") {
    return '所在街道忘记填了';
  }
  if (formData['council'].trim() === "") {
    return '街道社区忘记填了';
  }
  if (!/^\d{17}(\d|x)$/i.test(formData['personalid'])) {
    return '身份证号码不正确';
  }
  if (thisData.idhead === undefined) {
    return '身份证正面照片还没上传';
  }
  if (thisData.idback === undefined) {
    return '身份证背面照片还没上传';
  }

  if (formData['email'] !== "" && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formData['email'])) {
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
    dob: '__年__月__日',
    pob: ['', '', ''],
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
    // showSuccess('yes')
    // return true;
    util.showBusy('请求中...')
    var that = this
    formData['idhead'] = this.data.idhead
    formData['idback'] = this.data.idback
    formData['dob'] = this.data.dob
    formData['pob'] = this.data.pob
    formData['personality'] = [formData.personalityone, formData.personalitytwo, formData.personalitythree]
    delete formData['personalityone']
    delete formData['personalitytwo']
    delete formData['personalitythree']
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
          showSuccess('注册成功')
        }        
        console.log('request success', result)        
      },
      fail: function(error) {
        showModel('注册失败', error)        
        console.log('request fail', error);
      }
    }
    if (this.data.takeSession) {  // 使用 qcloud.request 带登录态登录
      qcloud.request(options)
    } else {    // 使用 wx.request 则不带登录态
      wx.request(options)
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
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            showSuccess('上传图片成功')
            res = JSON.parse(res.data)
            console.log(res)
            var data = {}
            data[e_name] = res.data.imgUrl
            that.setData(data)
          },

          fail: function (e) {
            showModel('上传图片失败', e)
            console.error(e)
          }
        })

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
    // 用户登录示例 
      this.setData({logged: true})         
      if (this.data.logged) return

      util.showBusy('正在登录')
      var that = this

      // 调用登录接口
      qcloud.login({
        success(result) {
          if (result) {
            util.showSuccess('登录成功')
            that.setData({
              userInfo: result,
              logged: true
            })
          } else {
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            qcloud.request({
              url: config.service.requestUrl,
              login: true,
              success(result) {
                util.showSuccess('登录成功')
                that.setData({
                  userInfo: result.data.data,
                  logged: true
                })
              },

              fail(error) {
                util.showModel('请求失败', error)
                console.log('request fail', error)
              }
            })
          }
        },

        fail(error) {
          util.showModel('登录失败', error)
          console.log('登录失败', error)
        }
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