// miniprogram/pages/result/result.js
Page({

  /**
   * Page initial data
   */
  data: {
    answers:{
      "A": "完美型: 一个完美主义者",
      "B": "助人型: 一个给予者",
      "C": "成就型: 一个实践者",
      "D": "自我型: 一个浪漫者",
      "E": "理智型: 一个观察者",
      "F": "忠诚型: 一个质问者",
      "G": "活跃型: 一个享乐者",
      "H": "领袖型: 一个支配者",
      "I": "和平型: 一个和平者"
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log("OPtions: " + options.data);
    var grades = JSON.parse(options.data);
    var summary = [];
    for (var index in grades) {
      var key = grades[index].k;
      var value = grades[index].v;
      summary.push(
        { title: this.data.answers[key], claz: key, score: value});
    }
    this.setData({ summary: summary });
    console.log("summary: " + JSON.stringify(summary));
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