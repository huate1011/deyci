"use strict";var util=getApp().globalData.utilFun,common=getApp().globalData.commonFun;Page({data:{requestStatus:!1,currentId:1,dataList:[]},state:{offset:0,limit:10,pageOnShow:!1,isOnReachBottom:!0,isonPullDownRefresh:!1,hasmore:!0},onLoad:function(t){wx.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#35246b"}),this.state.options=t,wx.showLoading({title:"加载中...",mask:!0}),this.store({typeId:t.typeId}),this.rankList(0)},onShow:function(){},onPullDownRefresh:function(){this.state.isonPullDownRefresh=!0,wx.showLoading({title:"加载中...",mask:!0}),this.state.offset=0,1==this.data.currentId?this.rankList(0):this.inviteList(0)},onReachBottom:function(){this.state.isonPullDownRefresh||this.state.isOnReachBottom&&this.state.hasmore&&(wx.showLoading({title:"加载中...",mask:!0}),this.state.offset=this.state.offset+this.state.limit,1==this.data.currentId?this.rankList(this.state.offset):this.inviteList(this.state.offset),this.state.isOnReachBottom=!1)},store:function(t){this.setData(t)},navTab:function(t){var s=t.currentTarget.dataset.currentidx;this.data.currentId!=s&&(this.state.offset=0,this.store({currentId:s,dataList:[]}),wx.showLoading({title:"加载中...",mask:!0}),1==s?this.rankList(0):0==this.data.typeId?this.inviteList(0):this.recordList(0))},rankList:function(t){var s=this,i={offset:t,limit:s.state.limit,activeId:s.state.options.id};util.httpRequest("/answer/ClientActiveRank/get",i,"GET","v2").then(function(i){if("success"==i.result){var e=common.dataListHandle(s,i,s.data.dataList,t);s.store({dataList:e.list,requestStatus:!0,count:e.count,hasNext:e.hasNext})}else common.showClickModal(i.msg);wx.hideLoading()})},inviteList:function(t){var s=this,i="/answer/ClientActiveInvite/get";0!=s.data.typeId&&(i="/answer/ClientActiveAttend/get");var e={offset:t,limit:s.state.limit,activeId:s.state.options.id};util.httpRequest(i,e,"GET","v2").then(function(i){if("success"==i.result){var e=common.dataListHandle(s,i,s.data.dataList,t);s.store({dataList:e.list,requestStatus:!0,count:e.count,hasNext:e.hasNext})}else common.showClickModal(i.msg);wx.hideLoading()})},recordList:function(t){var s=this,i={offset:t,limit:s.state.limit,activeId:s.state.options.id};util.httpRequest("/answer/ClientActiveAttend/get",i,"GET","v2").then(function(i){if("success"==i.result){console.log(i);var e=common.dataListHandle(s,i,s.data.dataList,t);s.store({dataList:e.list,requestStatus:!0,count:e.count,hasNext:e.hasNext})}else common.showClickModal(i.msg);wx.hideLoading()})}});