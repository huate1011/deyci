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
        "index": 0,
        "size": 0,
        "items": []
      },
      {
        "question": "联系人姓名:",
        "name": "联系人姓名",
        "column": { "type": "text", "size": 255 },
        "type": "textbox",
        "index": 1,
        "size": 0,
        "items": []
      },  
      {
        "question": "联系人职务:",
        "name": "联系人职务",
        "column": { "type": "text", "size": 255 },
        "type": "textbox",
        "index": 2,
        "size": 0,
        "items": []
      }, 
      {
        "question": "联系人电话:",
        "name": "联系人电话",
        "column": { "type": "number", "size": 0 },
        "type": "textbox",
        "index": 3,
        "size": 0,
        "items": []
      },    
      {
        "question": "贵公司员工数量:",
        "name": "贵公司员工数量",
        "column": { "type": "number", "size": 0 },
        "type": "textbox",
        "index": 4,
        "size": 0,
        "items": []
      }, 
      {
        "question": "贵公司员工平均年龄约:",
        "name": "贵公司员工平均年龄约",
        "column": { "type": "number", "size": 0 },
        "type": "textbox",
        "index": 5,
        "size": 0,
        "items": []
      }, 
      {
        "question": "贵公司成立了以下哪些组织？(多选)", 
        "name":"已成立组织",
        "column": { "type": "text", "size": 255 },
        "type": "checkbox",
        "index": 6,
        "size":5,
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
        "index": 7,
        "size": 4,
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
        "index": 8,
        "size": 3,
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
        "index": 9,
        "size": 5,
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
        "index": 10,
        "size": 3,
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
        "index": 11,
        "size": 3,
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
        "index": 12,
        "size": 6,
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
        "index": 13,
        "size": 5,
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
        "index": 14,
        "size": 4,
        "items": [
          { "value": "员工关爱", "name": "员工关爱" },
          { "value": "培训学习", "name": "培训学习" },
          { "value": "法律支持", "name": "法律支持" },
          { "value": "支持成立党、青、工、妇组织", "name": "支持成立党、青、工、妇组织" }
        ]
      },
      {
        "question": "(开放式问题）您对党群服务中心的期待和建议:",
        "name": "期待和建议",
        "column": { "type": "text", "size": 2048 },
        "type": "textarea",
        "index": 15,
        "size": 0,
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
    if(index === 6) {
      this.setData({
        hasdangorganisations: values.length > 0
      });      
    }
  },

  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
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
        }
        util.showModel("错误", key + ',还没有填'); 
        return
      }
    }
    surveyUtil.sendSurvey(this.data.takeSession, formData, e.detail.formId,  this.data.surveyType)    
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