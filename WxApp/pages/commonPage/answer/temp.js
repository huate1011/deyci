"use strict";function answerConfig(t){var e=common.getStorage("userInfo");util.httpRequest("/answer/ClientConfig/get",{},"GET","v2").then(function(a){"success"==a.result?(t.state.answerConfig=a.results,t.setData({userInfo:e,answerConfig:a.results}),getInfo(t)):common.showClickModal(a.msg)})}function getInfo(t){var e="/answer/Attend/active",a=t.state.options;a.hasOwnProperty("id")&&(e+="?id="+a.id),a.hasOwnProperty("uid")&&common.getStorage("userInfo").id!=a.uid&&(a.hasOwnProperty("id")?e+="&uid="+a.uid:e+="?uid="+a.uid),util.httpRequest(e,{},"GET","v2").then(function(e){if(t.state.pageOnShow=!0,"success"==e.result){var a=e.results;0==a.attend_num.partNum&&2==a.typeId&&common.showClickModal("您已没有答题机会，点击页尾“领取答题卡”获取机会");var n=0,s=t.state.answerConfig;2==a.typeId&&(n=Number(a.setConfig.totalMoney)*Number(s.multiple)),t.setData({activity:a,requestStatus:!0,redMoney:n})}else common.showClickModal(e.msg);wx.hideLoading()})}function partNum(t){var e=t.data.activity;util.httpRequest("/answer/partNum/get",{activeId:e.id},"GET","v2").then(function(e){"success"==e.result?0==e.results.status?common.showClickModal("领取已达上限"):(common.showClickModal("领取成功"),getInfo(t)):common.showClickModal(e.msg)})}function answerEven(t,e){var a=e.currentTarget.dataset,n=t.data.activity;t.data.answerConfig;if("start"==a.types){if(2!=n.status)return void common.showClickModal("当前活动未开始或已结束");common.wxAuthorize(t,function(e){if(e){var a=common.getStorage("userInfo");t.setData({userInfo:a}),wx.showModal({title:"提示",content:"开始答题后将使用一次机会，答题中切勿退出，确定要开始答题吗？",success:function(t){t.confirm&&wx.navigateTo({url:"/pages/answer/pages/answer/answer?id="+n.id+"&typeId="+n.typeId})}})}})}else"join"==a.types?wx.navigateTo({url:"/pages/answer/pages/leaderboard/leaderboard?id="+n.id+"&typeId="+n.typeId}):"win"==a.types?wx.navigateTo({url:"/pages/answer/pages/leaderboard/leaderboard?id="+n.id+"&typeId="+n.typeId}):"opentk"==a.types?t.setData({tk_status:"show"}):"closetk"==a.types?t.setData({tk_status:"hide"}):"revival"==a.types?0==n.attend_num.partNum&&2==n.typeId&&partNum(t):"showShareAlter"==a.types&&(e.type="v2",e.url="/answer/AnswerPoster/share?type=2",dataTemp.detailShare(t,e))}function answerEvent(t){answerEven(this,t)}function shareEvent(t){t.type="v2",t.url="/answer/AnswerPoster/share",dataTemp.detailShare(this,t)}function answerShow(t){common.commonFun(t),common.wxAuthorize(t,function(t){}),answerConfig(t),t.answerEvent=answerEvent,t.shareEvent=shareEvent}var util=getApp().globalData.utilFun,common=getApp().globalData.commonFun,dataTemp=getApp().globalData.dataTempFun;module.exports={getInfo:getInfo,partNum:partNum,answerShow:answerShow};