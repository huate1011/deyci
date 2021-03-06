// pages/survey/survey.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var constants = require('../../vendor/wafer2-client-sdk/lib/constants')
var config = require('../../config')
var util = require('../../utils/util')
var surveyUtil = require('../../utils/survey')

var updateQuestions = (that, index, items, datasetName) => {
  // Set the current checkbox in the editing mode
  var tmpQuestions = that.data.questions;
  for (var i = 0; i < tmpQuestions.length; i++) {
    if (tmpQuestions[i].name === datasetName) {
      tmpQuestions[i].editing = true;
    } else {
      tmpQuestions[i].editing = false;
    }
  }

  // update the items        
  tmpQuestions[index].items = items
  that.setData({
    questions: tmpQuestions
  });
};


Page({

  /**
   * 页面的初始数据
   */
  data: {
    open_id: null,
    surveyType: 'PersonalSurveys',
    /**
     * All the questions
     */
    questions: [
      {
        "question": "您最近参与过的一次活动:",
        "name": "最近一次活动",
        "column": { "type": "text", "size": 255 },
        "type": "textbox",
        "items": []
      },
      {
        "question": "您更愿意在活动中承担的角色: (单选)",
        "name": "角色承担",
        "column":{"type": "text", "size": 255},
        "type": "radio",
        "items": [
          { "value": "参与者", "name": "参与者" },
          { "value": "策划者", "name": "策划者" },
          { "value": "传播者", "name": "传播者" },
          { "value": "组织者", "name": "组织者" }
        ]
      },
      {
        "question": "您喜欢的活动领域: (多选)",
        "name": "喜好类型",
        "column": { "type": "text", "size": 255 },        
        "type": "checkbox",        
        "items": [
          { "value": "学习培训类", "name": "学习培训类" },
          { "value": "社交活动类", "name": "社交活动类" },
          { "value": "兴趣爱好类", "name": "兴趣爱好类" },
          { "value": "亲子家庭类", "name": "亲子家庭类" }
        ]
      },
      {
        "question": "组织哪类活动您会感兴趣参加: (多选)",
        "name": "兴趣活动",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",        
        "items": [
          { "value": "运动", "name": "运动" },
          { "value": "文艺", "name": "文艺如音乐，摄影摄像，手工等)" },
          { "value": "娱乐休闲", "name": "娱乐休闲（如桌游，ktv)" },
          { "value": "公益活动", "name": "公益活动" },
          { "value": "学习培训", "name": "学习培训(职业发展，知识提升" }
        ]
      },
      {
        "question": "组织哪类培训您会感兴趣参加: (多选)",
        "name": "兴趣培训",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "工会知识", "name": "工会知识" },
          { "value": "法律法规", "name": "法律法规" },
          { "value": "在职教育", "name": "在职教育" },
          { "value": "技能培训", "name": "技能培训（办公软件、公开演讲等）" },
          { "value": "职业发展-项目管理-团队管理等）", "name": "职业发展（项目管理、团队管理等）" },
          { "value": "创业课程-注册成立-运营管理等）", "name": "创业课程（注册成立、运营管理等）" },
          { "value": "素质提升-服装搭配-美容美妆)", "name": "素质提升（服装搭配、美容美妆)" }
        ]
      },
      {
        "question": "您的兴趣爱好会体现在？(多选)",
        "name": "个人爱好",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "电影", "name": "电影" },
          { "value": "音乐", "name": "音乐" },
          { "value": "运动", "name": "运动" },
          { "value": "文创", "name": "文创" },
          { "value": "网游手游", "name": "网游/手游" },
          { "value": "旅行", "name": "旅行" }
        ]
      },
      {
        "question": "更愿意参加哪种规模的活动？(单选)",
        "name": "活动规模",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "20人以内", "name": "20人以内" },
          { "value": "20-50人", "name": "20-50人" },
          { "value": "50-100人", "name": "50-100人" },
          { "value": "100人以上", "name": "100人以上" }
        ]
      },
      {
        "question": "您平时多久参加一次集体活动？(单选)",
        "name": "活动频率",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "每周一次", "name": "每周一次" },
          { "value": "每月一次", "name": "每月一次" },
          { "value": "每季度一次", "name": "每季度一次" }
        ]
      },
      {
        "question": "您愿意参与的活动频次？(单选)",
        "name": "意愿频次",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "每周一次", "name": "每周一次" },
          { "value": "每月一次", "name": "每月一次" },
          { "value": "每季度一次", "name": "每季度一次" }
        ]
      },
      {
        "question": "您愿意参与的活动时间？(单选)",
        "name": "意愿时间",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "周末晚上", "name": "周末晚上" },
          { "value": "下班后晚7点到晚9点）", "name": "下班后（19:00-21:00）" },
          { "value": "周末上午", "name": "周末上午" },
          { "value": "周末下午", "name": "周末下午" }
        ]
      },
      {
        "question": "您的休闲时光？(单选)",
        "name": "休息时间",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "双休", "name": "双休" },
          { "value": "单休", "name": "单休" },
          { "value": "大小周", "name": "大小周" },
          { "value": "月度调休", "name": "月度调休" }
        ]
      },
      {
        "question": "您是否会主动寻找活动？(单选)",
        "name": "主动寻找",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "会", "name": "会" },
          { "value": "不会", "name": "不会" }
        ]
      },
      {
        "question": "通过什么渠道寻找活动？(多选)",
        "name": "参与渠道",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "公司组织", "name": "公司组织" },
          { "value": "社区组织", "name": "社区组织" },
          { "value": "app搜索", "name": "app搜索" },
          { "value": "微信推文", "name": "微信推文" },
          { "value": "朋友推荐", "name": "朋友推荐" }
        ]
      },
      {
        "question": "一个好的活动，您更看中哪一点？(多选)",
        "name": "理想特质",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "优质的内容", "name": "优质的内容" },
          { "value": "合理的时间安排", "name": "合理的时间安排" },
          { "value": "有序的活动组织", "name": "有序的活动组织" },
          { "value": "丰富的社交资源", "name": "丰富的社交资源" }
        ]
      },
      {
        "question": "您更期待在活动中收获？(多选)",
        "name": "收获倾向",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "学到技能收获知识", "name": "学到技能、收获知识" },
          { "value": "拓展眼界增长见识", "name": "拓展眼界、增长见识" },
          { "value": "结识朋友扩展社交圈", "name": "结识朋友、扩展社交圈" }
        ]
      },
      {
        "question": "您是否了解创业广场党群服务中心？(单选)",
        "name": "了解党群",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "不知道", "name": "不知道" },
          { "value": "略微了解", "name": "略微了解" },
          { "value": "详细了解", "name": "详细了解" }
        ]
      },
      {
        "question": "您是否参加过创业广场党群服务中心的活动？(单选)",
        "name": "党群参与",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "参加过", "name": "参加过" },
          { "value": "还没有", "name": "还没有" }
        ]
      },
      {
        "question": "您知道工会是做什么的吗？(多选)",
        "name": "了解工会",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "发福利组织活动等", "name": "发福利，组织活动等" },
          { "value": "给员工维权", "name": "给员工维权" },
          { "value": "不知道", "name": "不知道" }
        ]
      },
      {
        "question": "您是通过什么渠道了解工会的？(多选)",
        "name": "工会传播",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "企业工会宣传", "name": "企业工会宣传" },
          { "value": "朋友介绍", "name": "朋友介绍" },
          { "value": "网络书籍", "name": "网络书籍" },
          { "value": "新闻媒体", "name": "新闻媒体" },
          { "value": "街站宣传", "name": "街站宣传" },
          { "value": "维权事件", "name": "维权事件" },
          { "value": "不知道工会", "name": "不知道工会" },
          { "value": "本次调研", "name": "本次调研" }
        ]
      },
      {
        "question": "如已加入工会，您加入的渠道是？(单选)",
        "name": "入会分析",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "企业规定入职时自动加入", "name": "企业规定，入职时自动加入" },
          { "value": "同事介绍加入", "name": "同事介绍加入" },
          { "value": "自愿申请加入", "name": "自愿申请加入" },
          { "value": "工会干部动员", "name": "工会干部动员" },
          { "value": "还没有", "name": "还没有" },
          { "value": "考虑加入", "name": "考虑加入" },
          { "value": "没兴趣", "name": "没兴趣" }
        ]
      },
      {
        "question": "您希望工会提供哪些职业技能培训？(多选)",
        "name": "需求分析",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "投资理财", "name": "投资理财" },
          { "value": "平面设计", "name": "平面设计" },
          { "value": "基础英语", "name": "基础英语" },
          { "value": "科技应用", "name": "科技应用" },
          { "value": "基础会计", "name": "基础会计" },
          { "value": "人力资源专业技能", "name": "人力资源专业技能" },
          { "value": "企业管理", "name": "企业管理" }
        ]
      },
      {
        "question": "您更喜欢青年之家的哪个服务？(多选)",
        "name": "青内涵",
        "column": { "type": "text", "size": 1024 },
        "type": "checkbox",
        "items": [
          { "value": "青组织", "name": "青·组织：智慧团建·推优入党·青年之声" },
          { "value": "青公益", "name": "青·公益：提供社会公益活动" },
          { "value": "青创业", "name": "青·创业：搭建公益创业平台，帮助创业青年寻找青春伙伴人" },
          { "value": "青驿站", "name": "青·驿站：为来深求职大学生提供7天免费住宿、就业咨询及城市融入等" },
          { "value": "青学堂", "name": "青·学堂：开设各类综合课程、提供社会实践和主题沙龙" },
          { "value": "青联盟", "name": "青·联盟：凝聚、联络、培育各种青年社会组织及青年团体，搭建交流推广平台" },
          { "value": "青联谊", "name": "青·联谊：搭建青年交友平台，扩宽社交圈，满足交友、婚恋等成长需求" }
        ]
      },
      {
        "question": "您是否知道园区里的青年之家？(单选)",
        "name": "知道青",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "刚刚知道", "name": "刚刚知道" },
          { "value": "愿意参加青年之家的活动", "name": "不知道，但愿意参加" },
          { "value": "不感兴趣", "name": "不感兴趣" }
        ]
      },
      {
        "question": "您近3个月内，办理过哪类业务？（多选）",
        "name": "近来办理事务种类",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "落户", "name": "落户" },
          { "value": "证件", "name": "证件" },
          { "value": "社保、医保、公积金", "name": "社保、医保、公积金" },
          { "value": "人才补助申请", "name": "人才补助申请" },
          { "value": "租房", "name": "租房" },
        ]
      },
      {
        "question": "未来，我们会定期在党群服务中心开展各种活动，你有什么建议或者期待（如形式、内容等）（开放题）:",
        "name": "期待和建议",
        "column": { "type": "text", "size": 2048 },
        "type": "textarea",
        "items": []
      },
      {
        "question": "您在工作中的专业领域是？",
        "name": "专业领域",
        "column": { "type": "text", "size": 255 },
        "type": "textbox",
        "items": []
      },
      {
        "question": "您的职业: (单选)",
        "name": "职业",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "上班族", "name": "上班族" },
          { "value": "自由职业者", "name": "自由职业者" },
          { "value": "创业者", "name": "创业者" }
        ]
      },
      {
        "question": "您的职务: (单选)",
        "name": "职务",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "员工", "name": "员工" },
          { "value": "部门负责人", "name": "部门负责人" },
          { "value": "公司高层", "name": "公司高层" },
          { "value": "您自己的定位", "name": "您自己的定位" }
        ]
      },   
      {
        "question": "贵公司的名字: ",
        "name": "公司名字",
        "column": { "type": "text", "size": 255 },
        "type": "textbox",
        "items": []
      },        
      {
        "question": "性别",
        "name": "性别",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "男", "name": "男" },
          { "value": "女", "name": "女" }
        ]
      },
      {
        "question": "您的电话:",
        "name": "电话",
        "column": { "type": "number", "size": 0 },
        "type": "textbox",
        "items": []
      },
      {
        "question": "您的年龄范围: (单选)",
        "name": "年龄范围",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "28岁以下", "name": "28岁以下" },
          { "value": "28-30岁", "name": "28-30岁" },
          { "value": "31-35岁", "name": "31-35岁" },
          { "value": "35岁以上", "name": "35岁以上" }
        ]
      },
      {
        "question": "政治面貌: (单选)",
        "name": "政治面貌",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "群众", "name": "群众" },
          { "value": "团员", "name": "团员" },
          { "value": "党员", "name": "党员" }
        ]
      }
    ]
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var index = e.target.dataset.index
    var items = this.data.questions[index].items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }
    // Set the current checkbox in the editing mode
    updateQuestions(this, index, items, e.target.dataset.name);

  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var index = e.target.dataset.index
    var items = this.data.questions[index].items, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break
        }
      }
    }
    // Set the current checkbox in the editing mode
    updateQuestions(this, index, items, e.target.dataset.name);
  },

  submitSurvey: function (e) {
    var formData = e.detail.value
    for (var key in formData) {
      if (formData[key] instanceof String && formData[key].trim() === ""
        || formData[key].length == 0) {        
        util.showModel("错误", key + ',还没有填');
        return
      }
    }
    surveyUtil.sendSurvey(this.data.takeSession, formData, e.detail.formId, this.data.surveyType)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // load user info
    var dataInterval = setInterval(function () {
      if (surveyUtil.loadData()) {
        console.log("clearing the time interval")
        clearInterval(dataInterval)
      }
    }, 3000);
    console.log("timer set to load user info")

    // load and set questions        
    var tmpQuestions = this.data.questions;

    for (var i = 0; i < tmpQuestions.length; i++) {
      tmpQuestions[i].index = i;
      tmpQuestions[i].editing = true;
      tmpQuestions[i].size = tmpQuestions[i].items.length;
    }
    this.setData({ questions: tmpQuestions });
    console.log("questions index and size updated")
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