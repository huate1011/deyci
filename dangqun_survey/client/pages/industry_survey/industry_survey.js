// pages/survey/survey.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var constants = require('../../vendor/wafer2-client-sdk/lib/constants')
var config = require('../../config')
var util = require('../../utils/util')
var surveyUtil = require('../../utils/survey')

Page({

  /**
   * 页面的初始数据
   */
  data: {    
    surveyType: 'IndustrySurveys',
    hasdangorganisations: false,
    companies: [],
    matchingcompanies: []    
  },

  findCompanies: function(e) {
    var that = this
    var results = []
    for (var i = 0; i < this.data.companies.length; i++) {
      if (this.data.companies[i].name.includes(e.detail.value)) {
        results.push(this.data.companies[i].name)
      }
      if (results.length == 4) {
        break;
      }
    }
    that.setData({matchingcompanies: results})
  },

  checkDang: function(e) {    
    var that = this
    this.setData({
      hasdangorganisations: e.detail.value.length == 0 ? false : true
    })    
  },  

  submitSurvey: function (e) {
    var formData = e.detail.value
    if (formData['averageage'].trim() === "") {
      util.showModel("错误", '贵公司员工平均年龄约还没有填');      
    } else if (formData['employeeno'].trim() === "") {
      util.showModel("错误", '贵公司员工数量还没有填');      
    } else if (formData['contactphone'].trim() === "") {
      util.showModel("错误", '联系人电话还没有填');
    } else if (formData['contactname'].trim() === "") {
      util.showModel("错误", '联系人（职务及姓名）还没有填');
    } else if (formData['officeaddress'].trim() === "") {
      util.showModel("错误", '联系人办公地点还没有填');
    } else if (formData['occupation'].trim() === "") {
      util.showModel("错误", '所属行业还没有填');
    } else {
      surveyUtil.sendSurvey(this.data.takeSession, e, this.data.surveyType)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    surveyUtil.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    surveyUtil.loadData() 
    var that = this    
    wx.request({
      url: config.service.companyCheckUrl,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {        
        console.log("companies: " + res.data.result)
        var result = res.data.result
        if (result === "") {
          console.log("Can not find companies")          
        } else {
          that.setData({companies: result})
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    surveyUtil.loadData() 

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
    surveyUtil.loadData() 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})