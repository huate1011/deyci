"use strict";var yuexpert=require("../../../commonPage/yuexpert/temp.js"),common=getApp().globalData.commonFun;Page({data:{active:0,currentTab:0,yunavs:[],list:[],peise:getApp().globalData.peise},state:{offset:0,limit:10,pageOnShow:!1,isOnReachBottom:!0,isonPullDownRefresh:!1,hasmore:!0,classId:0},tabOffsetTop:null,onLoad:function(){wx.showLoading({title:"加载中...",mask:!0});var t=this;common.getAccessToken()?yuexpert.getData(t):getApp().globalData.tokenUpdated=function(){console.log("update success"),yuexpert.getData(t)}},onShow:function(){var t=this;getApp().globalData.serviceUpdateData=function(e){yuexpert.service_getDetail(t,e)}},onPullDownRefresh:function(){this.state.isonPullDownRefresh=!0,wx.showLoading({title:"加载中...",mask:!0}),yuexpert.getData(this)},onReachBottom:function(){this.state.isonPullDownRefresh||this.state.isOnReachBottom&&this.state.hasmore&&(wx.showLoading({title:"加载中...",mask:!0}),this.state.offset=this.state.offset+this.state.limit,yuexpert.getList(this,this.state.offset),this.state.isOnReachBottom=!1)},store:function(t){this.setData(t)},onPageScroll:function(t){common.scrollIsTabFixed(this,t)}});