"use strict";var common=getApp().globalData.commonFun,util=getApp().globalData.utilFun,dataTemp=getApp().globalData.dataTempFun,mallList=require("../../../commonPage/mall/shopListTemp.js"),sameCityTemp=require("../../../commonPage/sameCity/temp.js"),learnTemp=require("../../../commonPage/zhuanlan/temp.js");Page({data:{interfaceName:"search",requestStatus:!1,dataNull:"hide",logoPosBottom:!0,list:[],mall:{shopData:[]},info:{DataList:[],zhuanlanList:[],list:[]},is_hidden:!0,selectNumber:1,peise:getApp().globalData.peise},state:{offset:0,limit:10,nextCount:0},onLoad:function(){wx.hideShareMenu();var t=common.getStorage("layout");this.getSearchData(t)},store:function(t){this.setData(t)},getSearchData:function(t){var a=this;t.forEach(function(t){"search"===t.name&&a.store({parameter:t})})},danpinDetail:function(t){learnTemp.openDanpinDetail(t)},saveVal:function(t){this.state.keywords=t.detail.value,this.store({keywords:t.detail.value})},onSearchBtn:function(t){var a=this,e=this.data.parameter,s=t?t.detail.value:a.data.keywords;"button"==t.currentTarget.dataset.types&&(s=a.state.keywords),wx.showLoading({title:"搜索中...",mask:!0});var i="";switch(e.data.type){case"news":i="news";break;case"shequn":i="community";break;case"col":i="column";break;case"digitalcontent":i="digitalcontent";break;case"shop":i="product";break;case"catalog":i="catalogthread",a.state.limit=15,wx.showShareMenu();break;case"settle":i="settle";break;case"restaurant":i="restaurant";break;case"vote":i="vote";break;default:i="activity",a.state.limit=10}a.state.offset=0;var o={types:i,q:s};this.state.val=o,"news"===i?common.configData("news",function(){dataTemp.searchActivity(0,o,a)}):"product"===i?common.configData("shop",function(){a.setData({shopTempName:common.getStorage("config").shop.list_view_type}),dataTemp.searchActivity(0,o,a)}):"column"===i?common.configData("learn",function(){dataTemp.searchActivity(0,o,a)}):"settle"===i?dataTemp.searchSettle(0,o,a):"restaurant"===i?common.configData("restaurant",function(){dataTemp.searchActivity(0,o,a)}):"vote"===i?dataTemp.searchVote(0,o,a):("catalogthread"===i&&sameCityTemp.detailSameCityEvent(this),dataTemp.searchActivity(0,o,a))},onReachBottom:function(){var t=this.state.nextCount,a=this.data.parameter;t>0&&(this.state.offset+=this.state.limit,"settle"===a.data.type?dataTemp.searchSettle(this.state.offset,this.state.val,this):"vote"===a.data.type?dataTemp.searchVote(this.state.offset,this.state.val,this):dataTemp.searchActivity(this.state.offset,this.state.val,this))},getShopDetail:function(t,a){var e="/product/"+a+"/";wx.showLoading({title:"",mask:!0}),util.httpRequest(e).then(function(a){mallList.shopDetailElem(t,a)})},shopListEvent:function(t){mallList.shopListChangeEvent(this,t)},blurInput:function(t){mallList.inputBlur(this,t)},dianCanDetail:function(t){var a=t.currentTarget.dataset,e=common.getStorage("config").restaurant;1===Number(e.takeaway.open)?e.takeaway.working&&e.busTime.working?wx.navigateTo({url:"/pages/dianCan/pages/saomaDiancan/saomaDiancan?enterWay=wm&detail_id="+a.id+"&group_id="+a.groupid}):e.busTime.working?common.showClickModal("当前不在配送时间段！"):common.showClickModal("餐厅已打烊！"):common.showClickModal("本店暂不支持外卖！")},onShareAppMessage:function(t){if("button"===t.from){var a=this.data.list,e=t.target.dataset.index;return{title:a[e].content.substr(0,10)+"...",path:"pages/sameCity/pages/detail/detail?id="+a[e].id,success:function(t){},fail:function(t){}}}return{}}});