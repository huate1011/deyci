// miniprogram/pages/result/result.js
Page({

  /**
   * Page initial data
   */
  data: {
    results:{
      "A": [
        { "key":"第一型，完美型", "value":"一个完美主义者"},
        { "key": "一号特性", "value": "改革者"},
        { "key": "基本恐惧", "value": "怕自己错，变坏，被腐败"},
        { "key": "基本欲望", "value": "希望自己是对的，好的，贞洁的，有诚信的"},
        { "key": "对自己的要求", "value": ""},
        { "key": "特质", "value": ""},
        { "key": "顺境（被认同时）", "value": ""},
        { "key": "逆境（不被认同时）", "value": ""},
        { "key": "处理感情的方法", "value": ""},
        { "key": "身体语言", "value": "挺硬，可以长久保持同一个姿势；面部表情变化少，严肃，笑容不多；讲话方式，语调缺乏幽默感，直接；毫不留情，不懂得婉转；重复讯息多次；速度偏慢，声线较尖"},
        { "key": "常用词汇", "value": ""},
        { "key": "工作环境", "value": ""},
        { "key": "背后感情", "value": ""},
        { "key": "一号警钟", "value": ""},
        { "key": "座右铭", "value": ""},
        { "key": "典型冲突", "value": ""},
        { "key": "优点", "value": ""},
        { "key": "缺点", "value": ""},
        { "key": "最适宜的工作环境", "value": ""},
        { "key": "不适宜的工作环境", "value": ""},
        { "key": "管理方案", "value": ""},
        { "key": "令人舒服的地方", "value": ""},
        { "key": "令人不舒服的地方", "value": ""},
        { "key": "沟通要素", "value": ""},
        { "key": "时间管理", "value": ""},
        { "key": "达成协议", "value": ""},
        { "key": "常见问题", "value": ""},
        { "key": "解救方法", "value": ""}],
      "B": [
        { "key": "第二型，助人型", "value": "一个给予者"},
        { "key": "二号特性", "value":"帮助者"},
        { "key": "基本恐惧", "value": ""},
        { "key": "基本欲望", "value": ""},
        { "key": "对生命的要求", "value": ""},
        { "key": "特质", "value": ""},
        { "key": "顺境（可以爱人及被爱时）", "value": ""},
        { "key": "逆境（没有爱或被背叛时）", "value": ""},
        { "key": "处理感情的方法", "value": ""},
        { "key": "身体语言", "value": ""},
        { "key": "常用词汇", "value": ""},
        { "key": "工作环境", "value": ""},
        { "key": "不能处理逆境的出现的性格", "value": "戏剧性性格，骄傲"},
        { "key": "二号警钟", "value":""},
        { "key": "座右铭", "value": ""},
        { "key": "典型冲突", "value": ""},
        { "key": "优点", "value": ""},
        { "key": "缺点", "value": ""},
        { "key": "最适应的工作环境", "value": ""},
        { "key": "不适应的工作环境", "value": ""},
        { "key": "管理方式", "value": ""},
        { "key": "令人不舒服的地方", "value": ""},
        { "key": "沟通要点", "value": ""},
        { "key": "激发要点", "value": ""},
        { "key": "时间管理", "value": ""},
        { "key": "达成协议", "value": ""},
        { "key": "常见问题", "value": ""},
        { "key": "解救方法", "value": ""}
      ],
      "C": [
        { "key": "第三型，成就型", "value": "一个实践者"},
        { "key": "三号特性", "value": "促动者"},
        { "key": "基本恐惧", "value": ""},
        { "key": "基本欲望", "value": ""},
        { "key": "对生命的要求", "value": ""},
        { "key": "特质", "value": ""},
        { "key": "顺境（有成就时）", "value": ""},
        { "key": "逆境（一事无成时）", "value": ""},
        { "key": "处理感情的方法", "value": ""},
        { "key": "身体语言", "value": ""},
        { "key": "常用词汇", "value": ""},
        { "key": "工作环境", "value": ""},
        { "key": "不能处理逆境的出现的性格", "value": ""},
        { "key": "三号警钟", "value": ""},
        { "key": "座右铭", "value": ""},
        { "key": "典型冲突", "value": ""},
        { "key": "优点", "value": ""},
        { "key": "缺点", "value": ""},
        { "key": "最适应的工作环境", "value": ""},
        { "key": "不适应的工作环境", "value": ""},
        { "key": "管理方式", "value": ""},
        { "key": "令人舒服的地方", "value": ""},
        { "key": "令人不舒服的地方", "value": ""},
        { "key": "沟通要点", "value": ""},
        { "key": "激发要点", "value": ""},
        { "key": "时间管理", "value": ""},
        { "key": "达成协议", "value": ""},
        { "key": "常见问题", "value": ""},
        { "key": "解救方法", "value": ""}
      ],
      "D": [
        { "key": "第四型，自我型", "value": "一个浪漫者"},
        { "key": "四号特性", "value": "艺术家"},
        { "key": "基本恐惧", "value": ""},
        { "key": "基本欲望", "value": ""},
        { "key": "对自己的要求", "value": ""},
        { "key": "特质", "value": ""},
        { "key": "顺境（有独特认同时）", "value": ""},
        { "key": "逆境（没有独特认同时）", "value": ""},
        { "key": "处理感情的方法", "value": ""},
        { "key": "身体语言", "value": ""},
        { "key": "常用词汇", "value": ""},
        { "key": "工作环境", "value": ""},
        { "key": "不能处理逆境的出现的性格", "value": ""},
        { "key": "四号警钟", "value": ""},
        { "key": "座右铭", "value": ""},
        { "key": "典型冲突", "value": ""},
        { "key": "优点", "value": ""},
        { "key": "缺点", "value": ""},
        { "key": "最适应的工作环境", "value": ""},
        { "key": "不适应的工作环境", "value": ""},
        { "key": "管理方式", "value": ""},
        { "key": "令人舒服的地方", "value": ""},
        { "key": "令人不舒服的地方", "value": ""},
        { "key": "沟通要点", "value": ""},
        { "key": "激发要点", "value": ""},
        { "key": "时间管理", "value": ""},
        { "key": "达成协议", "value": ""},
        { "key": "常见问题", "value": ""},
        { "key": "解救方法", "value": ""}
      ],
      "E": [
        { "key":"第五型，理智型", "value": "一个观察者"},
        { "key":"五号特性", "value": "思想家"},
        { "key":"基本恐惧", "value": ""},
        { "key":"基本欲望", "value": ""},
        { "key":"对自己的要求", "value": ""},
        { "key":"特质", "value": ""},
        { "key":"顺境（能干时）", "value": ""},
        { "key":"逆境（无能时）", "value": ""},
        { "key":"处理感情的方法", "value": ""},
        { "key":"身体语言", "value": ""},
        { "key":"常用词汇", "value": ""},
        { "key":"工作环境", "value": ""},
        { "key":"不能处理逆境的出现的性格", "value": ""},
        { "key":"五号警钟", "value": ""},
        { "key":"座右铭", "value": ""},
        { "key":"典型冲突", "value": ""},
        { "key":"优点", "value": ""},
        { "key":"缺点", "value": ""},
        { "key":"最适应的工作环境", "value": ""},
        { "key":"不适应的工作环境", "value": ""},
        { "key":"管理方式", "value": ""},
        { "key":"令人舒服的地方", "value": ""},
        { "key":"令人不舒服的地方", "value": ""},
        { "key":"沟通要点", "value": ""},
        { "key":"激发要点", "value": ""},
        { "key":"时间管理", "value": ""},
        { "key":"达成协议", "value": ""},
        { "key":"常见问题", "value": ""},
        { "key":"解救方法", "value": ""}
      ],
      "F": [
        { "key":"第六型，忠诚型", "value": "一个质问者"},
        { "key":"三号特性", "value": "忠诚者"},
        { "key":"基本恐惧", "value": ""},
        { "key":"基本欲望", "value": ""},
        { "key":"内在声音", "value": ""},
        { "key":"特质", "value": ""},
        { "key":"顺境（得到支持时）", "value": ""},
        { "key":"逆境（没有支持时）", "value": ""},
        { "key":"处理感情的方法", "value": ""},
        { "key":"身体语言，恐慌", "value": ""},
        { "key":"身体语言，先发制人", "value": ""},
        { "key":"常用词汇", "value": ""},
        { "key":"工作环境，恐慌", "value": ""},
        { "key":"工作环境，先发制人", "value": ""},
        { "key":"不能处理逆境的出现的性格", "value": ""},
        { "key":"六号警钟", "value": ""},
        { "key":"座右铭", "value": ""},
        { "key":"典型冲突", "value": ""},
        { "key":"优点", "value": ""},
        { "key":"缺点", "value": ""},
        { "key":"最适应的工作环境", "value": ""},
        { "key":"不适应的工作环境", "value": ""},
        { "key":"管理方式", "value": ""},
        { "key":"令人舒服的地方", "value": ""},
        { "key":"令人不舒服的地方", "value": ""},
        { "key":"沟通要点", "value": ""},
        { "key":"激发要点", "value": ""},
        { "key":"时间管理", "value": ""},
        { "key":"达成协议", "value": ""},
        { "key":"常见问题", "value": ""},
        { "key":"解救方法", "value": ""}
      ],
      "G": [
        { "key":"第七型，活跃型", "value": "一个享乐者"},
        { "key":"座右铭", "value": ""},
        { "key":"典型冲突", "value": ""},
        { "key":"优点", "value": ""},
        { "key":"缺点", "value": ""},
        { "key":"最适应的工作环境", "value": ""},
        { "key":"不适应的工作环境", "value": ""},
        { "key":"管理方式", "value": ""},
        { "key":"令人舒服的地方", "value": ""},
        { "key":"令人不舒服的地方", "value": ""},
        { "key":"沟通要点", "value": ""},
        { "key":"激发要点", "value": ""},
        { "key":"时间管理", "value": ""},
        { "key":"达成协议", "value": ""},
        { "key":"常见问题", "value": ""},
        { "key":"解救方法", "value": ""}
      ],
      "H": [
        { "key":"第八型，领袖型", "value": "一个支配者"},
        { "key":"八号特性", "value": "指导者"},
        { "key":"基本恐惧", "value": ""},
        { "key":"基本欲望", "value": ""},
        { "key":"对世界的要求", "value": ""},
        { "key":"特质", "value": ""},
        { "key":"顺境（有权有势时）", "value": ""},
        { "key":"逆境（无权无势时）", "value": ""},
        { "key":"处理感情的方法", "value": ""},
        { "key":"身体语言", "value": ""},
        { "key":"常用词汇", "value": ""},
        { "key":"工作环境", "value": ""},
        { "key":"不能处理逆境的出现的性格", "value": ""},
        { "key":"八号警钟", "value": ""},
        { "key":"座右铭", "value": ""},
        { "key":"典型冲突", "value": ""},
        { "key":"优点", "value": ""},
        { "key":"缺点", "value": ""},
        { "key":"最适应的工作环境", "value": ""},
        { "key":"不适应的工作环境", "value": ""},
        { "key":"管理方式", "value": ""},
        { "key":"令人舒服的地方", "value": ""},
        { "key":"令人不舒服的地方", "value": ""},
        { "key":"沟通要点", "value": ""},
        { "key":"激发要点", "value": ""},
        { "key":"时间管理", "value": ""},
        { "key":"达成协议", "value": ""},
        { "key":"常见问题", "value": ""},
        { "key":"解救方法", "value": ""},
        { "key":"其他注释", "value": ""},
      ],
      "I": [
        { "key":"第九型，和平型", "value": "一个和平者"},
        { "key":"三号特性", "value": "和事佬"},
        { "key":"基本恐惧", "value": ""},
        { "key":"基本欲望", "value": ""},
        { "key":"内在声音", "value": ""},
        { "key":"特质", "value": ""},
        { "key":"顺境（内心平和时）", "value": ""},
        { "key":"逆境（内心不平和时）", "value": ""},
        { "key":"身体语言", "value": ""},
        { "key":"常用词汇", "value": ""},
        { "key":"工作环境", "value": ""},
        { "key":"不能处理逆境的出现的性格", "value": ""},
        { "key":"九号警钟", "value": ""},
        { "key":"座右铭", "value": ""},
        { "key":"典型冲突", "value": ""},
        { "key":"优点", "value": ""},
        { "key":"缺点", "value": ""},
        { "key":"最适应的工作环境", "value": ""},
        { "key":"不适应的工作环境", "value": ""},
        { "key":"管理方式", "value": ""},
        { "key":"令人舒服的地方", "value": ""},
        { "key":"令人不舒服的地方", "value": ""},
        { "key":"沟通要点", "value": ""},
        { "key":"激发要点", "value": ""},
        { "key":"时间管理", "value": ""},
        { "key":"达成协议", "value": ""},
        { "key":"常见问题", "value": ""},
        { "key":"解救方法", "value": ""}
      ]
    }

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("OPtions: " + options.data);
    
    this.setData({ personality: this.data.results[options.data]});
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})