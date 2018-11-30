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
        "items": [{
          "value": "H",
          "name": "我倾向于集中于某事物并紧张"
        },
        {
          "value": "I",
          "name": "我倾向与自然的并喜欢开玩笑"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "F",
          "name": "我是待人友好的并愿意结交新的朋友"
        },
        {
          "value": "E",
          "name": "我是独处的人，不太愿意与人交往"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "我很难放松并停止思考潜在的问题"
        },
        {
          "value": "A",
          "name": "潜在的问题不会影响我的工作"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "G",
          "name": "我是一个很好的‘聪明’的生存者"
        },
        {
          "value": "D",
          "name": "我是一个很好的高尚的‘理想’主义者"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "E",
          "name": "我需要给别人爱"
        },
        {
          "value": "G",
          "name": "我愿意与别人保持一定的距离"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "C",
          "name": "当给我一项新任务时，我通常问自己他是否对我有用"
        },
        {
          "value": "I",
          "name": "当给我一项新的任务时，我通常问自己它是否有趣"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "E",
          "name": "我倾向于关注我自己"
        },
        {
          "value": "A",
          "name": "我倾向于关注他人"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "别人依赖于我的见识与知识"
        },
        {
          "value": "G",
          "name": "别人以来与我的力量与决策"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "我给人的印象是十分不自信"
        },
        {
          "value": "D",
          "name": "我给人的印象是十分自信"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "F",
          "name": "我更加注重关系"
        },
        {
          "value": "C",
          "name": "我更加注重目的"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "F",
          "name": "我不能大胆滴表白我自己"
        },
        {
          "value": "I",
          "name": "我能大胆地说出别人想说但不敢说的话"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "不考虑其他选择而作某一确定的是对我来说是很困难的"
        },
        {
          "value": "D",
          "name": "放松更具灵活性对我来说是很困难的"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "我倾向于犹豫与拖延"
        },
        {
          "value": "G",
          "name": "我倾向与大胆与果断"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "A",
          "name": "我不愿意别人给我带来麻烦"
        },
        {
          "value": "F",
          "name": "我希望别人依赖我，让我帮忙解决麻烦"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "C",
          "name": "通常我会为了完成工作将感情置于一边"
        },
        {
          "value": "E",
          "name": "通常我会在我做事情之前需要克服我的感情"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "一般来说，我是讲求方法并且很谨慎"
        },
        {
          "value": "I",
          "name": "一般来说，我是敢于冒险"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "F",
          "name": "我倾向于成为帮助，给予型的人，喜欢与他人在一起"
        },
        {
          "value": "D",
          "name": "我倾向于成为严肃，缄默的人，喜欢讨论的问题"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "G",
          "name": "我常常感到自己需要成为顶梁柱"
        },
        {
          "value": "C",
          "name": "我常常感到自己需要做的十全十美"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "我主要感兴趣于问难题并保持独立性"
        },
        {
          "value": "A",
          "name": "我主要感兴趣于保持心里的稳定与平静"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "我太顽固并持有怀疑的态度"
        },
        {
          "value": "F",
          "name": "我太软心肠并多愁善感"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "I",
          "name": "我常常担心我不能得到较好的东西"
        },
        {
          "value": "G",
          "name": "我常常担心如果我放松警惕，别人就会欺骗我"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "E",
          "name": "我习惯与表现的很冷淡而使别人生气"
        },
        {
          "value": "D",
          "name": "我习惯于指使别人做事而使他们生气"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "A",
          "name": "如果有太多的刺激和鼓舞，我会感到忧虑"
        },
        {
          "value": "I",
          "name": "如果没有太多的刺激和鼓舞，我会感到忧虑"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "我要依靠我的朋友，并且他们知道他们可以依靠我"
        },
        {
          "value": "C",
          "name": "我不依靠别人并独立做事"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "我倾向于独立于专心"
        },
        {
          "value": "E",
          "name": "我倾向于情绪化并热衷于自己的想法"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "G",
          "name": "我喜欢向别人提出挑战，并且‘使他们振奋起来’"
        },
        {
          "value": "F",
          "name": "我喜欢安慰他人使他们冷静下来"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "I",
          "name": "我总的来说是个开朗的并喜欢交际的人"
        },
        {
          "value": "D",
          "name": "我总得来说是个认真的并且很能自律的人"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "A",
          "name": "我希望能迎合别人，当我与别人距离很远，我感到不舒服"
        },
        {
          "value": "C",
          "name": "我希望与众不同，当我不能看到别人与我的区别，我感到不舒服"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "对我来说，追求个人的兴趣比舒适与安全更重要"
        },
        {
          "value": "B",
          "name": "对我来说，追求舒适与安全比个人的兴趣更重要"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "E",
          "name": "当与他人有冲突时，我倾向于退缩"
        },
        {
          "value": "G",
          "name": "当他人有冲突时，我很少会改变原先的态度"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "A",
          "name": "我很容易屈服并受他人摆布"
        },
        {
          "value": "D",
          "name": "我不对别人做出让步，并对他们下达命令"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "I",
          "name": "我很赏识自己的高昂的精神状态与深沉"
        },
        {
          "value": "F",
          "name": "我很赏识自己深层的关心与热情"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "C",
          "name": "我很想给别人留下好的印象"
        },
        {
          "value": "H",
          "name": "我并不在乎要给别人留下好的印象"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "我依赖我的毅力与常有的感觉"
        },
        {
          "value": "E",
          "name": "我依赖我的想象与瞬间的灵感"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "A",
          "name": "基本上来说，我是很随和的，很可爱的"
        },
        {
          "value": "G",
          "name": "基本上来说，我是精力旺盛的，过分自信的"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "C",
          "name": "我努力工作以求得到别人的接受与喜欢"
        },
        {
          "value": "D",
          "name": "得到别人的接受与喜欢是对我来说并不重要"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "当别人给我压力使我变得更加退缩"
        },
        {
          "value": "I",
          "name": "当别人给我压力是我会变得更加自信"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "I",
          "name": "人们对我感兴趣是因为我很开朗，有吸引力，有趣"
        },
        {
          "value": "F",
          "name": "人们对我感兴趣是因为我很安静，不同寻常，深沉"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "职责与责任对我很重要"
        },
        {
          "value": "A",
          "name": "协调与认可对我很重要"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "G",
          "name": "我制定出重要的计划并作出承诺，以此来鼓励人们"
        },
        {
          "value": "D",
          "name": "我会指出不按照我的建议所残生的后果，以此来鼓励人们"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "我很少表露出情绪"
        },
        {
          "value": "F",
          "name": "我经常表露出情绪"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "I",
          "name": "我不擅长处于处理琐碎的事儿"
        },
        {
          "value": "C",
          "name": "我擅长处理琐碎的事儿"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "E",
          "name": "我常常强调自己与绝大多数的人的不同之处，尤其是与不同我的家庭"
        },
        {
          "value": "A",
          "name": "我常常强调自己与绝大多数的人的共同之处，尤其是与我的家庭共同"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "当场面变得热闹起来时，我倾向于站在一旁"
        },
        {
          "value": "B",
          "name": "当场面变得热闹起来时，我倾向于加入其中"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "即使朋友不对，我也会支持他们"
        },
        {
          "value": "D",
          "name": "我不想为了友情对正确的事情做妥协"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "F",
          "name": "我是一个善意的支持者"
        },
        {
          "value": "C",
          "name": "我是一个积极的老手"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "E",
          "name": "当遇到困难是我倾向于夸大我的问题"
        },
        {
          "value": "I",
          "name": "当遇到困难是我倾向于转移注意力"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "D",
          "name": "总的来说，我很确信知道情况应该如何"
        },
        {
          "value": "H",
          "name": "总的来说，我对情况持怀疑的态度"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "我的悲观，抱怨会给别人带来麻烦"
        },
        {
          "value": "G",
          "name": "我的老板式的，控制的方式会给别人带来麻烦"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "F",
          "name": "我倾向于按我的感觉办事并听之任之"
        },
        {
          "value": "A",
          "name": "我倾向于不按照我的感觉办事以避免产生更多的问题"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "C",
          "name": "通常我成为注意的焦点时，会很自然"
        },
        {
          "value": "E",
          "name": "通常我成为主义的焦点时，会很不习惯"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "B",
          "name": "我做事情很谨慎，努力为意料之外的事情做准备"
        },
        {
          "value": "I",
          "name": "我做事情凭一时冲动，只是在问题出现时才临时准备"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "F",
          "name": "当别人不是很欣赏我为他们所作的事情时我会很生气"
        },
        {
          "value": "D",
          "name": "当别人不听我说时我会很生气"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "G",
          "name": "独立，自力更生对我很重要"
        },
        {
          "value": "C",
          "name": "有价值，得到别人的称赞对我很重要"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "H",
          "name": "当与朋友争论时我倾向于强烈地坚持自己的观点"
        },
        {
          "value": "B",
          "name": "当与朋友争论时我倾向于顺其自然以免伤了和气"
        }
        ]
      },
      {
        "type": "radio",
        "items": [{
          "value": "F",
          "name": "我常常占有所爱的人--我不能放任他们"
        },
        {
          "value": "C",
          "name": "我常常‘考察’所爱的人，想确定他们是否爱我"
        }
        ]
      },
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
