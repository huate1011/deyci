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
    open_id: null,
    surveyType: 'PersonalSurveys' 
  },

  submitSurvey: function (e) {
    var formData = e.detail.value
    if (formData['lastevent'].trim() === "") {
      util.showModel("错误", '您最近参与过的一次活动,还没有填');
    } else if (formData['favouriterole'].trim() === "") {
      util.showModel("错误", '更愿意在活动中承担的角色,还没有填');
    } else if (formData['favouriteactivities'].trim() === "") {
      util.showModel("错误", '您喜欢的活动领域,还没有填');
    } else if (formData['interestedevents'].trim() === "") {
      util.showModel("错误", '组织哪类活动您会感兴趣参加,还没有填');
    } else if (formData['interestedtraining'].trim() === "") {
      util.showModel("错误", '组织哪类培训您会感兴趣参加,还没有填');
    } else if (formData['personalinterests'].trim() === "") {
      util.showModel("错误", '您有什么兴趣爱好,还没有填');
    } else if (formData['eventsize'].trim() !== "") {      
      util.showModel("错误", '更愿意参加哪种规模的活动, 没有填');      
    } else if (formData['eventfrequency'].trim() === "") {
      util.showModel("错误", '您平时多久参加一次集体活动,还没有填');
    } else if (formData['idealfrequency'].trim() === "") {
      util.showModel("错误", '您愿意参与的活动频次, 还没有填');
    } else if (formData['eventtime'].trim() === "") {
      util.showModel("错误", '您愿意参与的活动时间, 还没有填');
    } else if (formData['holidays'].trim() === "") {
      util.showModel("错误", '您的休闲时光, 还没有填');
    } else if (formData['canfindevents'].trim() === "") {
      util.showModel("错误", '您是否会主动寻找活动, 还没有填');
    } else if (formData['howtofindevents'].trim() === "") {
      util.showModel("错误", '通过什么渠道寻找活动, 还没有填');
    } else if (formData['favouritepoints'].trim() === "") {
      util.showModel("错误", '一个好的活动，您更看中哪一点, 还没有填');
    } else if (formData['eventgains'].trim() === "") {
      util.showModel("错误", '您更期待在活动中收获, 还没有填');
    } else if (formData['knowdang'].trim() === "") {
      util.showModel("错误", '您是否了解创业广场党群服务中心, 还没有填');
    } else if (formData['attendeddang'].trim() === "") {
      util.showModel("错误", '您是否参加过创业广场党群服务中心的活动, 还没有填');
    } else if (formData['knowsociety'].trim() === "") {
      util.showModel("错误", '您知道工会是做什么的吗, 还没有填');
    } else if (formData['howtoknowsociety'].trim() === "") {
      util.showModel("错误", '您是通过什么渠道了解工会的, 还没有填');
    } else if (formData['joinsociety'].trim() === "") {
      util.showModel("错误", '您是通过什么方式加入工会的, 还没有填');
    } else if (formData['trainingskills'].trim() === "") {
      util.showModel("错误", '您希望工会提供哪些职业技能培训, 还没有填');
    } else if (formData['favouriteqingnianservice'].trim() === "") {
      util.showModel("错误", '您更喜欢青年之家的哪个服务, 还没有填');
    } else if (formData['knowqingnian'].trim() === "") {
      util.showModel("错误", '您是否知道园区里的青年之家, 还没有填');
    } else if (formData['workarea'].trim() === "") {
      util.showModel("错误", '您在工作中的专业领域是, 还没有填');
    } else if (formData['profession'].trim() === "") {
      util.showModel("错误", '您的职业, 还没有填');
    } else if (formData['occupation'].trim() === "") {
      util.showModel("错误", '您的职务, 还没有填');
    } else if (formData['companyname'].trim() === "") {
      util.showModel("错误", '贵公司的名字, 还没有填');
    } else if (formData['age'].trim() === "") {
      util.showModel("错误", '您的年龄范围, 还没有填');
    } else if (formData['contactphone'].trim() === "") {
      util.showModel("错误", '您的电话, 还没有填');
    } else if (formData['gender'].trim() === "") {
      util.showModel("错误", '请问您的性别, 还没有填');
    } else if (formData['politics'].trim() === "") {
      util.showModel("错误", '政治面貌, 还没有填');
    } else {
      surveyUtil.sendSurvey(this.data.takeSession, formData, e.detail.formId, this.data.surveyType)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
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