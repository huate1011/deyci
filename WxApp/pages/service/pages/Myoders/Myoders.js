"use strict";var util=getApp().globalData.utilFun,common=getApp().globalData.commonFun,yuexpert=require("../../../commonPage/yuexpert/temp.js"),payTempImport=getApp().globalData.payTemp,payEvent=getApp().globalData.payEvent;Page({data:{requestStatus:!1,contactStatus:!0,logoPosBottom:!0,navbar:["全部订单","已完成","未完成"],currentTab:0,lists:[],array:[],theme:"false",pretime:"",serviceOrderTk:["hide"],reasonValue:""},state:{limit:5,offset:0,pageOnShow:!1,isOnReachBottom:!0,isonPullDownRefresh:!1,hasmore:!0,index:-1,tuikuanIndex:-1},onLoad:function(){wx.showLoading({title:"加载中...",mask:!0});var t=common.getAccessToken(),e=this;common.payAndBingPhoneSetData(e,function(t){e.setData({payAndBingPhoneStatus:!0})}),t?(common.commonFun(e),common.getWallet(e)):getApp().globalData.tokenUpdated=function(){console.log("update success"),common.commonFun(e),common.getWallet(e)},this.getData(0)},navbarTap:function(t){var e=t.currentTarget.dataset.idx;Number(this.data.currentTab)!==Number(e)&&(this.state.offset=0,this.setData({lists:[],currentTab:e,requestStatus:!1}),wx.showLoading({title:"",mask:!0}),this.getData(0))},onShow:function(){var t=this;getApp().globalData.updateServiceOrderDel=function(e){var a=t.data.lists;a.splice(e,1),t.setData({lists:a})},getApp().globalData.updateServiceOrderStatus=function(e){t.detail(e)}},getData:function(t){var e="/api/ExpertToClient/getOrder?limit="+this.state.limit+"&offset="+t+"&status="+this.data.currentTab,a=this;util.httpRequest(e,{},"GET","v2").then(function(e){if("success"===e.result){e.results.forEach(function(t,a){e.results[a].seeAll=!1});var s=common.dataListHandle(a,e,a.data.lists,t);a.setData({lists:s.list,requestStatus:!0,hasNext:s.hasNext})}else common.showClickModal(e.msg);wx.hideLoading()})},onReachBottom:function(){this.state.isonPullDownRefresh||this.state.isOnReachBottom&&this.state.hasmore&&(wx.showLoading({title:"",mask:!0}),this.state.offset=this.state.limit+this.state.offset,this.state.scrolltolower=!1,this.getData(this.state.offset))},onPullDownRefresh:function(){wx.showLoading({title:"加载中...",mask:!0}),this.state.isonPullDownRefresh=!0,this.state.hasmore=!0,this.state.offset=0,this.getData(0)},delet:function(t){var e=t.currentTarget.dataset.mm,a=this,s=a.data.lists;t.id=s[e].id,t.typeid=30,t.remark="service_zhuanjia_del",common.getFormId(t),yuexpert.deleteOrder(s[e].id,function(t){"success"===t.result?wx.showModal({title:"提示",content:"删除成功",icon:"success",showCancel:!1,success:function(){s.splice(e,1),a.setData({lists:s})}}):common.showClickModal(t.msg)})},TuiKuanReason:function(t){var e=this;t.id=this.state.orderId,t.typeid=30,t.remark="service_zhuanjia_tk",common.getFormId(t),yuexpert.orderRefund(this.state.orderId,t.detail.value.reason,function(t){"success"===t.result?wx.showModal({title:"提示",content:"申请成功",icon:"success",showCancel:!1,success:function(){e.detail(e.state.tuikuanIndex),e.state.tuikuanIndex=-1;var t=e.data.serviceOrderTk;t[0]="hide",e.setData({serviceOrderTk:t,reasonValue:""})}}):common.showClickModal(t.msg)})},invTuikuan:function(t){var e=t.currentTarget.dataset.mt,a=this.data.lists;t.id=a[e].id,t.typeid=30,t.remark="service_zhuanjia_tk",common.getFormId(t),this.state.orderId=a[e].id,this.state.tuikuanIndex=e;var s=this.data.serviceOrderTk;s[0]="show",this.setData({serviceOrderTk:s})},close:function(t){var e=t.currentTarget.dataset.index,a=this.data.serviceOrderTk;a[e]="hide",this.setData({serviceOrderTk:a,reasonValue:""})},score:function(t){var e=t.currentTarget.dataset.sc,a=this.data.lists;common.setStorage("commentImgUrl",a[e].OrderExp[0].photo.thumb_medium_url),wx.navigateTo({url:"/pages/comment/commentShop/commentShop?id="+a[e].id+"&type=service&index="+e})},evaluate:function(t){var e=t.currentTarget.dataset.mc,a={order_id:this.data.lists[e].id,idx:e};this.state.submitVals=a,this.setData({showPayMethod:!0,total_money:this.data.lists[e].money})},payEvent:function(t){payTempImport.payChangeEvent(this,t)},callPayment:function(t,e,a,s){if(this.state.formId=a,"wallet"===e)this.setData({payTk:"show",Board:"show"});else{var i=t.state.submitVals;i.payType="weixin",this.comfirmPay(i)}},walletPay:function(t){this.setData({payTk:"hide"});var e=t.state.submitVals;e.payType="wallet",e.password=this.data.passwords,this.comfirmPay(e),payEvent.passwordClear(this)},comfirmPay:function(t){var e=this;wx.showLoading({title:"",mask:!0}),payTempImport.wxPayEvent("/api/ExpertToClient/pay",t,"v2",function(a,s){"success"===a?wx.showModal({title:"提示",content:s,icon:"success",showCancel:!1,success:function(){e.detail(t.idx)}}):common.showClickModal(s)})},detail:function(t){var e=this.data.lists,a="/api/ExpertToClient/getOrderDetails?id="+e[t].id,s=this;util.httpRequest(a,{},"GET","v2").then(function(a){e[t].status=a.data.status,e[t].statusId=a.data.statusId,s.setData({lists:e})})},details:function(t){var e=t.currentTarget.dataset.to;wx.navigateTo({url:"../details/details?imd="+this.data.lists[e].id+"&index="+e}),this.state.index=e}});