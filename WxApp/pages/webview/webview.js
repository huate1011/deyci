"use strict";var common=getApp().globalData.commonFun;Page({data:{webview_url:""},state:{},onLoad:function(e){var t=common.getAccessToken();this.state.options=e;var o=this;t?o.openUrl(e):getApp().globalData.tokenUpdated=function(){console.log("update success"),o.openUrl(e)}},openUrl:function(e){e.hasOwnProperty("url")?this.setData({webview_url:e.url}):this.setData({webview_url:"https://"+common.getStorage("config").host+"/sell/?token="+common.getAccessToken()+"&key="+e.k+"&acid="+getApp().globalData.acid})},onShareAppMessage:function(){var e=this,t="/pages/webview/webview?k="+e.state.options.k;return e.state.options.hasOwnProperty("url")&&(t="/pages/webview/webview?url="+e.state.options.url),{title:"",path:t,success:function(e){},fail:function(e){}}}});