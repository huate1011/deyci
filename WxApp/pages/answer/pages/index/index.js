"use strict";var temp=require("../../../commonPage/answer/temp.js"),common=getApp().globalData.commonFun,dataTemp=getApp().globalData.dataTempFun;Page({data:{requestStatus:!1,tk_status:"hide",activity:"",detailgg:"hide",shareAlter:"hide",shareAlter1:"hide"},state:{pageOnShow:!1},onLoad:function(t){wx.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#35246b"}),wx.showLoading({title:"加载中...",mask:!0});var e=decodeURIComponent(t.scene);console.log(e);var a={};if("undefined"!==e){a={id:e.split("#")[0]}}else a=t;this.state.options=a;var o=this;common.getAccessToken()?temp.answerShow(o):getApp().globalData.tokenUpdated=function(){console.log("update success"),temp.answerShow(o)}},onShow:function(){this.state.pageOnShow&&temp.answerShow(this)},onShareAppMessage:function(t){var e=this,a=e.data.activity;"show"==this.data.shareAlter&&this.store({shareAlter:"hide"});var o="/pages/answer/pages/index/index?uid="+e.data.userInfo.id+"&formType=1";return e.state.options.hasOwnProperty("id")&&(o+="&id="+e.state.options.id),{title:a.name,imageUrl:a.rankListImg?a.rankListImg.thumb_medium_url:"",path:o,success:function(a){"part"==t.target.dataset.types&&"button"==t.from&&temp.partNum(e)}}},store:function(t){this.setData(t)}});