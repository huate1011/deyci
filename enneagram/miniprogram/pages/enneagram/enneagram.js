// pages/enneagram.js
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

var sendAnswers = (answers, recommendations, name, id, phone, type) => {
  var options = {
    url: 'https://db.deyci.cn/api/answers?apiKey=IOVBcqqf7J',
    data: JSON.stringify({ 
      'answers': answers, 'recommendations': recommendations, 'name': name, 'id': id, 'phone': phone, 'type': type}),
    header: {
      'content-type': 'application/json',
      'cache-control':'no-cache'
    },
    method: 'POST',
    success: function (result) {
      if (result.statusCode > 210) {
        console.log('提交失败', result.data.error)
      } else {
        console.log('request succeeded with:', JSON.stringify(result.data));
        wx.navigateTo({
          url: '/pages/answers/answers?data=' + JSON.stringify(recommendations),
        })
      }
    },
    fail: function (error) {
      console.log('request fail', error);
    }
  }
  wx.request(options);
}

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
        "items": [{
          "value": "E",
          "name": "我浪漫并富于幻想"
        },
        {
          "value": "B",
          "name": "我很实际并实事求是"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "G",
          "name": "我倾向于接受冲突"
        },
        {
          "value": "A",
          "name": "我倾向于避免冲突"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "C",
          "name": "我一般是老练的，有魅力的以及有上进心的"
        },
        {
          "value": "E",
          "name": "我一般是直率的，刻板的以及空想的"
        }
        ]
      },
      {
        "type": "radio",
        "items": [
          { "value": "E", "name": "我花大量的时间反省--理解自己的感受对我来说是很重要的" },
          { "value": "G", "name": "我花大量的时间反省--做完事情对我来说是很重要的" }
        ]
      }
    ],
    currentIndex: 0,
    answers: {},
    detailedAnswers: {}
  },

  onLoad: function (options) {
    this.setData({userInfo: JSON.parse(options.userInfo)});
    this.setData({questions: JSON.parse(options.questions)});
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  submitSurvey: function (e) {    
    var formData = e.detail.value;
    var answers = this.data.answers;
    var detailedAnswers = this.data.detailedAnswers;
    // Count the answers
    for (var key in formData) {
      if (formData[key] instanceof String && formData[key].trim() === ""
        || formData[key].length == 0) {
        showModel("错误", '第' + key + '题没有填');
        return;
      }
      detailedAnswers[key] = formData[key];
      if (formData[key] in answers) {
        answers[formData[key]] += 1;
      } else {
        answers[formData[key]] = 1;
      }      
    }
    this.setData({answers: answers});
    this.setData({detailedAnswers: detailedAnswers});
    // check the question index
    var oldIndex = this.data.currentIndex;
    if (oldIndex < this.data.questions.length - 1) {
      this.setData({ currentIndex: oldIndex + 1 });
      return;
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
    sendAnswers(detailedAnswers, sortedAnswers, this.data.userInfo.nickName, "id", "phone", this.data.surveyType);
  },
})
