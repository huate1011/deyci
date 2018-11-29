// pages/enneagram.js
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

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
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
  icon: 'success',
  duration: 3000
})

Page({

  /**
   * Component initial data
   */
  data: {
    open_id: null,
    surveyType: 'Enneagram',
    /**
     * All the questions
     */
    questions: [
      {
        "type": "radio",
        "items": [
          { "value": "G", "name": "组织资源并促使某些事情的发生是我的优势之一" },
          { "value": "I", "name": "提出新观点并促使某些事情的发生是我的优势之一" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "D", "name": "我要是在别人的驱策下才会做事，不能依赖自己" },
          { "value": "E", "name": "我过于情绪化，不能自律" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "I", "name": "我试图使生活高节奏，紧张并充满兴奋的感觉" },
          { "value": "A", "name": "我试图使生活有规律，稳定，宁静" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "B", "name": "尽管我已经取得成功，我仍怀疑自己的能力" },
          { "value": "C", "name": "尽管我抽到挫折，但我仍相信自己" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "E", "name": "一般我倾向于详细研究自己的情感并保持此情感很久" },
          { "value": "H", "name": "一般我倾向于减少自己的情感并不加以注意" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "F", "name": "我对许多人加以注意并培养他们" },
          { "value": "G", "name": "我指导许多人并鼓励他们" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "D", "name": "我对自己要求有点严格" },
          { "value": "I", "name": "我对自己有点宽容" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "C", "name": "我倾向于独断，并追求卓越" },
          { "value": "A", "name": "我谦虚，喜欢按自己的节奏做事儿" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "H", "name": "我为自己的清晰性与目标性感到自豪" },
          { "value": "B", "name": "我为自己的可靠性与诚实而感到自豪" }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "E", "name": "我花大量的时间反省--理解自己的感受对我来说是很重要的" },
          { "value": "G", "name": "我花大量的时间反省--做完事情对我来说是很重要的" }
        ]
      }
    ]
  },

  onLoad: function (options) {
    // load and set questions        
    var tmpQuestions = this.data.questions;

    for (var i = 0; i < tmpQuestions.length; i++) {
      tmpQuestions[i].index = i + 1;
    }
    this.setData({ questions: tmpQuestions });
    console.log("questions index and size updated")

  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var index = e.target.dataset.index - 1
    var items = this.data.questions[index].items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }
    // Set the current checkbox in the editing mode
    updateQuestions(this, index, items, e.target.dataset.name);

  },

  submitSurvey: function (e) {
    var formData = e.detail.value
    var answers = {};
    // Count the answers
    for (var key in formData) {
      if (formData[key] instanceof String && formData[key].trim() === ""
        || formData[key].length == 0) {
        showModel("错误", '第' + key + '题没有填');
        return
      }
      if (formData[key] in answers) {
        answers[formData[key]] += 1;
      } else {
        answers[formData[key]] = 1;
      }
    }

    // Sort all the answers
    var sortedAnswers = [];
    for (var key in answers) {
      var item = {k:key, v:answers[key]};
      if (sortedAnswers.length == 0) {
        sortedAnswers.push(item);
      } else {
        var isInserted = false;
        for (var i = 0; i < sortedAnswers.length; i++) {
          if (answers[key] >= sortedAnswers[i].v) {
            sortedAnswers.splice(i, 0, item);
            isInserted = true;
            break;
          }
        }
        if (!isInserted) {
          sortedAnswers.push(item);
        }
      }
    }
    console.log("Formdata： " + JSON.stringify(sortedAnswers));
    wx.navigateTo({
      url: '/pages/answers/answers?data=' + JSON.stringify(sortedAnswers),
    })
  },
})
