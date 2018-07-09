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
    matchingcompanies: [],
    /**
     * All the questions
     */
    questions:[
      {
        "question": "行业领域:",
        "name": "行业领域",
        "column": { "type": "text", "size": 255 },
        "type": "textbox",
        "items": []
      },
      {
        "question": "贵公司员工数量:",
        "name": "贵公司员工数量",
        "column": { "type": "number", "size": 0 },
        "type": "textbox",
        "items": []
      },
      {
        "question": "贵公司员工平均年龄约:",
        "name": "贵公司员工平均年龄约",
        "column": { "type": "number", "size": 0 },
        "type": "textbox",
        "items": []
      },
      {
        "question": "贵公司成立时间 (单选）:",
        "name": "贵公司成立时间",
        "column": { "type": "text", "size": 50 },
        "type": "radio",
        "items": [
          { "value": "0-2", "name": "2年以内（含2年）" },
          { "value": "2-5", "name": "2-5年" },
          { "value": "5-10", "name": "5-10年" },
          { "value": "10+", "name": "10年以上" }
        ]
      },
      {
        "question": "贵公司现阶段规模（单选）:",
        "name": "贵公司规模",
        "column": { "type": "text", "size": 50 },
        "type": "radio",
        "items": [
          { "value": "初创", "name": "初创" },
          { "value": "小微企业", "name": "小微企业" },
          { "value": "快速发展中", "name": "快速发展中" },
          { "value": "成熟企业", "name": "成熟企业" },
          { "value": "融资上市", "name": "融资上市" }
        ]
      },
      {
        "question": "您的姓名:",
        "name": "联系人姓名",
        "column": { "type": "text", "size": 255 },
        "type": "textbox",
        "items": []
      },  
      {
        "question": "您的职务:",
        "name": "联系人职务",
        "column": { "type": "text", "size": 255 },
        "type": "textbox",
        "items": []
      }, 
      {
        "question": "您的电话:",
        "name": "联系人电话",
        "column": { "type": "number", "size": 12 },
        "type": "textbox",
        "items": []
      },      
      {
        "question": "贵公司成立了以下哪些组织？(多选)", 
        "name":"已成立组织",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items":[
          { "value": "党支部", "name": "党支部" },
          { "value": "团支部", "name": "团支部" },
          { "value": "工会", "name": "工会" },
          { "value": "妇联", "name": "妇联" },
          { "value": "义工服务队", "name": "义工服务队" }
        ]
      },
      {
        "question": "如有以上组织，平时组织活动频次:(单选)", 
        "name": "组织活动频次",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "每月一次", "name": "每月一次" },
          { "value": "每季度一次", "name": "每季度一次" },
          { "value": "半年一次", "name": "半年一次" },
          { "value": "不定期根据公司业务情况安排", "name": "不定期，根据公司业务情况安排" }
        ]
      },
      {
        "question": "以上组织，平常会开展什么活动？(单选)",
        "name": "组织什么活动",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "娱乐活动", "name": "娱乐活动" },
          { "value": "户外活动", "name": "户外活动" },          
          { "value": "培训学习", "name": "培训学习" }
        ]
      },
      {
        "question": "如果没有以上组织，贵公司是否有意向成立以下组织?(多选)",
        "name": "意向成立组织",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "党支部", "name": "党支部" },
          { "value": "团支部", "name": "团支部" },
          { "value": "工会", "name": "工会" },
          { "value": "妇联", "name": "妇联" },
          { "value": "义工服务队", "name": "义工服务队" }
        ]
      },
      {
        "question": "如果没有以上组织，贵公司是否了解成立以上组织的要求和流程:(单选)",
        "name": "了解组织要求",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "非常了解", "name": "非常了解" },
          { "value": "我想了解", "name": "我想了解" },          
          { "value": "我不了解", "name": "我不了解" }
        ]
      },
      {
        "question": "贵公司平时会组织哪些活动?(多选)",
        "name": "公司活动",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "员工生日会", "name": "员工生日会" },
          { "value": "团队拓展训练", "name": "团队拓展训练" },
          { "value": "其他", "name": "其他" }
        ]
      },
      {
        "question": "成立以上组织，您觉得对贵公司有以下哪些帮助?(多选)",
        "name": "帮助成立组织",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "增加团队凝聚力", "name": "增加团队凝聚力" },
          { "value": "提升员工对公司的认同感", "name": "提升员工对公司的认同感" },
          { "value": "加强公司内部的交流与互动", "name": "加强公司内部的交流与互动" },
          { "value": "提升企业文化传递", "name": "提升企业文化传递" },
          { "value": "提升企业形象", "name": "提升企业形象" },
          { "value": "没有帮助", "name": "没有帮助" }
        ]
      },
      {
        "question": "您觉得公司组织活动会有哪些方面的困难?(多选)",
        "name": "组织活动困难",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "活动经费", "name": "活动经费" },
          { "value": "公司高层参与度", "name": "公司高层参与度" },
          { "value": "员工参与热情低", "name": "员工参与热情低" },
          { "value": "活动内容与形式缺乏新颖性", "name": "活动内容与形式缺乏新颖性" },
          { "value": "其他", "name": "其他" }
        ]
      },
      {
        "question": "您是否了解党群服务中心提供以下服务?(多选)",
        "name": "了解党群服务",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "员工关爱", "name": "员工关爱" },
          { "value": "培训学习", "name": "培训学习" },
          { "value": "法律支持", "name": "法律支持" },
          { "value": "支持成立党、青、工、妇组织", "name": "支持成立党、青、工、妇组织" }
        ]
      },
      {
        "question": "贵公司在现阶段需要哪些支持：（多选）",
        "name": "公司需要的支持",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "金融资本", "name": "金融资本" },
          { "value": "资源引入", "name": "资源引入" },
          { "value": "成长培训：总裁班、管理运营、技能", "name": "成长培训：总裁班、管理运营、技能" },
          { "value": "政策传递：人才政策、发展支持", "name": "政策传递：人才政策、发展支持" },
          { "value": "专业支持：如法律、财务、专利、知识产品", "name": "专业支持：如法律、财务、专利、知识产品" },
          { "value": "其他", "name": "其他" }
        ]
      },
      {
        "question": "贵公司在现阶段在团队建设中需要哪些支持：（多选）",
        "name": "团队需要哪些支持",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "人员招聘：招聘会、人才档案库", "name": "人员招聘：招聘会、人才档案库" },
          { "value": "团队活动：员工关爱、园区融入", "name": "团队活动：员工关爱、园区融入" },
          { "value": "员工培训：技能提升", "name": "员工培训：技能提升" },
          { "value": "其他", "name": "其他" }
        ]
      },
      {
        "question": "请问您近3个月办理过哪类事项？（多选）",
        "name": "近来办理的事项",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "综合服务：劳动保障、社会事务", "name": "综合服务：劳动保障、社会事务" },
          { "value": "公共服务：金融社保、交通违章", "name": "公共服务：金融社保、交通违章" },
          { "value": "行政服务：企业财税、注册运营", "name": "行政服务：企业财税、注册运营" }
        ]
      },
      {
        "question": "近3个月内，您到政府机关办理过多少项业务:（单选)",
        "name": "近来政府机办理的业务",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "不到5项", "name": "不到5项" },
          { "value": "约5-10项", "name": "约5-10项" },
          { "value": "约11-20项", "name": "约11-20项" },
          { "value": "很多，数不清", "name": "很多，数不清" }
        ]
      },
      {
        "question": "据您所知，到政府机关窗口办理业务，除在途时间外，平均每次大约需要花费多少时间？不含等待结果的时间（单选)",
        "name": "政府机每次时间",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "0-30分钟", "name": "30分钟内"},
          { "value": "30-60分钟", "name": "30-60分钟" },
          { "value": "60-120分钟", "name": "60-120分钟" },
          { "value": "半天", "name": "半天" },
          { "value": "一天", "name": "一天" }
        ]
      },
      {
        "question": "您对党群服务中心设立综合业务窗口的看法如何（单选)",
        "name": "对设立综合业务窗口的看法",
        "column": { "type": "text", "size": 255 },
        "type": "radio",
        "items": [
          { "value": "很方便，节省人力物力", "name": "很方便，节省人力物力" },
          { "value": "纯属摆设，没有影响", "name": "纯属摆设，没有影响" },
          { "value": "附近办事大厅很方便，设立属于重复浪费", "name": "附近办事大厅很方便，设立属于重复浪费" },
          { "value": "其他", "name": "其他" }
        ]
      },
      {
        "question": "您希望得到的政务帮助有哪些？（多选）",
        "name": "希望政务帮助",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "items": [
          { "value": "政务咨讯", "name": "政务咨讯" },
          { "value": "办事指南", "name": "办事指南" },
          { "value": "相关政策", "name": "相关政策" },
          { "value": "其他", "name": "其他" }
        ]
      },
      {
        "question": "(开放式问题）您对党群服务中心的期待和建议:",
        "name": "期待和建议",
        "column": { "type": "text", "size": 2048 },
        "type": "textarea",
        "items": []
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
    var questions = this.data.questions;
    questions[index].items = items
    this.setData({
      questions: questions
    });
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
    var questions = this.data.questions;
    questions[index].items = items    
    this.setData({
      questions: questions    
    });    
    if (questions[index].name === "已成立组织") {
      this.setData({
        hasdangorganisations: values.length > 0
      });      
    }
  },

  searchChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    
    var items = this.data.matchingCompanies; 
    if (items === undefined)   {
      console.log('matching company undefined')
      return //it keeps saying matchingCompanies undefined
    }
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }
    this.setData({
      matchingCompanies: items
    });
  },

  findCompanies: function(e) {
    var input = e.detail.value
    var that = this
    var results = []
    if (input.trim() !== "") {
      for (var i = 0; i < this.data.companies.length; i++) {
        if (this.data.companies[i].name.includes(input)) {
          var company = {}
          company['name'] = this.data.companies[i].name
          company['value'] = this.data.companies[i].name
          results.push(company)
        }
        if (results.length == 4) {
          break;
        }
      }
    }
        
    if(results.length == 0) {
      var company = {}
      company['name'] = "贵公司不在列表"
      company['value'] = "贵公司不在列表"
      results.push(company)      
    }
    that.setData({ matchingcompanies: results })    
  },

  submitSurvey: function (e) {
    var formData = e.detail.value
    if (formData['公司名字'] == "其他") {
      formData['公司名字'] = formData['公司名字查找']
    }
    delete formData['公司名字查找']

    for (var key in formData) {          
      if (formData[key] instanceof String && formData[key].trim() === "" 
        || formData[key].length == 0) {
        if (key === '已成立组织' && formData['已成立组织'].length === 0) {   
          continue;
        } else if (key === '组织什么活动' && formData['已成立组织'].length === 0) {
          continue;
        } else if (key === '期待和建议' && formData['期待和建议'].length === 0) {
          continue;
        } else if (key.startsWith('其他') && formData[key].length ===0 && formData[key.substring(2)].indexOf('其他') == -1) {
          continue;
        }
        util.showModel("错误", key + ',还没有填');
        
        var tmpQuestions = this.data.questions;
        for (var i = 0; i < tmpQuestions.length; i++) {
          if (tmpQuestions[i].name === key) {
            tmpQuestions[i].focus = true;            
          } else {
            tmpQuestions[i].focus = false;        
          }
        }
        this.setData({questions: tmpQuestions});
        return
      }
    }
    surveyUtil.sendSurvey(this.data.takeSession, formData, e.detail.formId,  this.data.surveyType)    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    // load user info
    var dataInterval = setInterval(function () { 
      if(surveyUtil.loadData()) {
        console.log("clearing the time interval")
        clearInterval(dataInterval)
      }      
     }, 3000);    
    console.log("timer set to load user info")

    // load and set questions        
    var tmpQuestions = this.data.questions;
    
    for (var i = 0; i < tmpQuestions.length; i++) {      
        tmpQuestions[i].index = i;
        tmpQuestions[i].size = tmpQuestions[i].items.length;
    }
    this.setData({ questions: tmpQuestions });
    console.log("questions index and size updated")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {    
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