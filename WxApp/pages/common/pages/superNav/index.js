"use strict";var common=getApp().globalData.commonFun,util=getApp().globalData.utilFun;Page({data:{introduce:"为您推荐",currentTab:0,navs:[],theme:"",imgUrls:[{link:"",url:"http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"},{link:"",url:"http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg"},{link:"",url:"http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg"}],columns:[],lists:[],showtk:!1,indicatorDots:!0,autoplay:!0,interval:5e3,duration:1e3},state:{offset:0,limit:10,hasmore:!0,isOnReachBottom:!0,isonPullDownRefresh:!1,navId:0},store:function(t){this.setData(t)},onLoad:function(){var t=this;wx.showLoading({title:"加载中...",mask:!0}),common.getAccessToken()?t.getNavlist():getApp().globalData.tokenUpdated=function(){console.log("update success"),t.getNavlist()}},getNavlist:function(){var t=this,s="/api/supernav/getNav?acid="+getApp().globalData.acid;return util.httpRequest(s,{},"GET","v2").then(function(s){wx.hideLoading(),t.state.isonPullDownRefresh&&(t.state.isonPullDownRefresh=!1,wx.stopPullDownRefresh()),"success"===s.result?t.store({navs:s.data.navget,columns:s.data.recommend,theme:s.data.theme}):common.showClickModal(s.msg)}).then(function(){t.getAppList(0)})},getAppList:function(t){var s=this,e={id:s.state.navId,acid:getApp().globalData.acid,offset:t,limit:s.state.limit};util.httpRequest("/api/supernav/getapp",e,"GET","v2").then(function(e){if(wx.hideLoading(),"success"===e.result){var a=s.data.lists,o=common.dataListHandle(s,e,a,t);s.store({lists:o.list})}else common.showClickModal(e.msg)})},viewCode:function(t){var s=t.currentTarget.dataset.index,e=t.currentTarget.dataset.types,a=this.data.columns;"list"===e&&(a=this.data.lists),a[s].appid?wx.navigateToMiniProgram({appId:a[s].appid,success:function(t){console.log(t)}}):this.store({selCode:a[s],showtk:!0})},navbarTap:function(t){var s=t.currentTarget.dataset.idx;Number(s)!==Number(this.data.currentTab)&&(this.state.navId=s,this.store({currentTab:s}),wx.showLoading({title:"加载中...",mask:!0}),this.state.offset=0,this.getAppList(0))},onPullDownRefresh:function(){this.state.isonPullDownRefresh=!0,wx.showLoading({title:"加载中...",mask:!0}),this.getNavlist()},onReachBottom:function(){this.state.isonPullDownRefresh||this.state.isOnReachBottom&&this.state.hasmore&&(this.state.offset=this.state.offset+this.state.limit,wx.showLoading({title:"",mask:!0}),this.getAppList(this.state.offset),this.state.isOnReachBottom=!1)},closeTk:function(){this.store({showtk:!1})},viewBigImg:function(){var t=this.data.selCode;wx.previewImage({urls:[t.qr_code]})}});