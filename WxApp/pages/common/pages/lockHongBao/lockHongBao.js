"use strict";var common=getApp().globalData.commonFun,util=getApp().globalData.utilFun;Page({data:{alterHidden:"hide",list:[],requestStatus:!1,interfaceName:"lhb",contactStatus:!0},state:{offset:0,limit:10,hasmore:!0,isOnReachBottom:!1},onLoad:function(t){wx.showLoading({title:"加载中...",mask:!0}),this.setData({locked_hongbao:t.locked_hongbao}),this.getData(0),common.commonFun(this)},getData:function(t){var a=this,s="/wallet/hongbao/?offset="+t+"&limit="+this.state.limit;util.httpRequest(s).then(function(s){var e=common.dataListHandle(a,s,a.data.list,t);a.setData({list:e.list,requestStatus:!0})})},onPullDownRefresh:function(){wx.showLoading({title:"加载中...",mask:!0}),this.state.offset=0,this.getData(0)},store:function(t){this.setData(t)},onReachBottom:function(){this.state.isOnReachBottom&&this.state.hasmore&&(wx.showLoading({title:"加载中...",mask:!0}),this.state.offset=this.state.offset+this.state.limit,this.getData(this.state.offset),this.state.isOnReachBottom=!1)}});