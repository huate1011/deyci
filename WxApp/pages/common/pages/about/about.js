"use strict";var dataTemp=getApp().globalData.dataTempFun,common=getApp().globalData.commonFun;Page({data:{alterHidden:"hide",info:{},tankuang:"hide",interfaceName:"about",logoPosBottom:!1},state:{pageOnShow:!1},onLoad:function(a){wx.showLoading({title:"加载中...",mask:!0}),dataTemp.showAbuotInfo(this),common.commonFun(this)}});