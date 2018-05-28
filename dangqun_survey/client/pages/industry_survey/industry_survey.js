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
    if (formData['currentdangorgs'].length > 0) {
      if (formData['activityfrequency'].length === 0) {
        util.showModel("错误", '平时组织活动频次没有填');
        return
      } else if (formData['activitytype'].length === 0) {
        util.showModel("错误", '平常会开展什么活动还没有填');
        return
      }
    }

    if (formData['averageage'].trim() === "") {
      util.showModel("错误", '贵公司员工平均年龄约还没有填');      
    } else if (formData['employeeno'].trim() === "") {
      util.showModel("错误", '贵公司员工数量还没有填');      
    } else if (formData['contactphone'].trim() === "") {
      util.showModel("错误", '联系人电话还没有填');
    } else if (formData['contactname'].trim() === "") {
      util.showModel("错误", '联系人姓名还没有填');
    } else if (formData['jobrole'].trim() === "") {
      util.showModel("错误", '联系人职务还没有填');
    } else if (formData['occupation'].trim() === "") {
      util.showModel("错误", '所属行业还没有填');
    } else if (formData['prospectivedangorgs'].length === 0) {      
      util.showModel("错误", '贵公司是否有意向成立党组织,还没有填');      
    } else if (formData['knowrequirements'].trim() === "") {
      util.showModel("错误", '贵公司是否了解成立党组织的要求和流程, 还没有填');
    } else if (formData['pastactivities'].length === 0) {
      util.showModel("错误", '贵公司平时会组织哪些活动还没有填');
    } else if (formData['owncontributions'].length === 0) {
      util.showModel("错误", '您觉得对贵公司有哪些帮助, 还没有填');
    } else if (formData['difficulties'].length === 0) {
      util.showModel("错误", '您觉得公司组织活动会有哪些方面的困难, 还没有填');
    } else if (formData['knowservices'].length === 0) {
      util.showModel("错误", '您是否了解党群服务中心提供的服务, 还没有填');
    } else {
      if (formData['name'] == "others") {
        formData['name'] = formData['nameinput']
      }
      delete formData['nameinput']
      surveyUtil.sendSurvey(this.data.takeSession, formData, e.detail.formId,  this.data.surveyType)
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
        if (result === "" || result === undefined) {
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