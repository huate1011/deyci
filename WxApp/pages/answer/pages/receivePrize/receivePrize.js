"use strict";var common=getApp().globalData.commonFun;Page({data:{scopeBtn:!1,addressInfo:""},state:{},onLoad:function(t){},onShow:function(){},onHide:function(){},store:function(t){this.setData(t)},changeAddress:function(){var t=this;wx.chooseAddress({success:function(o){console.log(o),t.store({addressInfo:o})},fail:function(o){wx.getSetting({success:function(o){o.authSetting["scope.address"]||wx.showModal({title:"提示",content:"请先点击下面“权限设置”按钮，开启“通讯地址”权限",showCancel:!1,success:function(){t.store({scopeBtn:!0})}})}})}})},getsetting:function(t){t.detail.authSetting["scope.address"]&&this.store({scopeBtn:!1})},saveInfo:function(t){console.log(t)}});