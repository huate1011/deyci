"use strict";var userDefined=require("../../../userDefined/temp/userDefined.js"),dataTemp=getApp().globalData.dataTempFun,common=getApp().globalData.commonFun;Page({data:{interfaceName:"my",contactStatus:!0,info:{},menuList:{},menuStatus:!1},state:{pageOnShow:!1},onLoad:function(e){wx.showLoading({title:"加载中...",mask:!0}),userDefined.setNavigationBarColor("#ffffff","#"+getApp().globalData.peise.mcolor);var t=this;common.getAccessToken()?(dataTemp.showGetUserInfo(t),common.commonFun(t)):getApp().globalData.tokenUpdated=function(){console.log("update success"),dataTemp.showGetUserInfo(t),common.commonFun(t)}},onShow:function(){this.state.pageOnShow&&dataTemp.showGetUserInfo(this)},store:function(e){this.setData(e)}});