"use strict";function showData(a,e){var t=a.state.page_name;getApp().globalData.updateSignInCallback=function(){a.setData({isShowSignIn:!1})},getApp().globalData.learnCallback=function(){e.columnTemp.zhuanlanIndex(a)},getApp().globalData.updateDanpinCallback=function(n){if("userDefined"!==t&&"defined"!==t){var o=a.data.danpinList;e.columnTemp.getDanpinDetail(a,o[n].id,n)}},getApp().globalData.updateZhuanlanCallback=function(n){if("userDefined"!==t&&"defined"!==t){var o=a.data.info;e.columnTemp.getZhuanlanDetail(a,o.zhuanlanList[n].id,n)}},getApp().globalData.newMovementCallback=function(e,n,o){if("userDefined"===t){var s=a.data.info;s.temp.forEach(function(a){if("newsList"===a.name){var t=a.data.list;t[e]&&n&&o&&t[e].id==n&&(t[e].comment_count=o.comment_count,t[e].like_count=o.like_count,t[e].views=o.views)}}),a.setData({info:s})}else{var i=a.data.list;i[e]&&(o?(i[e].comment_count=o.comment_count,i[e].like_count=o.like_count,i[e].views=o.views,a.store({list:i})):dataTemp.getNewsDetail(a,i[e].id,e))}},getApp().globalData.updateHouseList=function(){a.state.offset=0,e.house.pullhousedata(a,0)},getApp().globalData.updateShequnList=function(e){Number(e)>0?dataTemp.shequnDetail(a,e):(a.state.offset=0,dataTemp.getShequnData(a,0))},getApp().globalData.gator=function(t){a.state.offset=0,a.state.condition=t,a.setData({currentTab:t.publishType}),e.carpooling.getList(a,0)},getApp().globalData.serviceUpdateData=function(t){e.service.service_getDetail(a,t)},"sameCity"===t&&e.catalog.implementShow(a),getApp().globalData.updateBargainList=function(t){e.bargTemp.getDetail(a,t)},getApp().globalData.updateBlessDetail=function(t){e.bagTemp.bagDetail(a,t)},getApp().globalData.updateShopIndex=function(t){e.mall.getCouponList(a)},getApp().globalData.updateShopDetail=function(){},getApp().globalData.showMyCard=function(){e.busiCardTemp.getData(a)},"settle"===t&&e.enter.showLoadEvent(a),"userDefined"===t&&(getApp().globalData.settleUpdateCallback=function(e,t){var n=a.data.info;n.temp.forEach(function(a){if("business"===a.name){var n=a.data.list;n[e]&&t&&(n[e].businessName=t.businessName,n[e].logo=t.logo,n[e].service=t.service,n[e].address=t.address,n[e].views=t.views,n[e].comments=t.comments)}}),a.setData({info:n})}),a.state.videos&&a.state.videos.pause();var n=!1;switch(a.state.page_name){case"zhuanlan":e.userDefTemp.isShowAudeoPlay(a);break;case"userDefined":case"defined":a.data.info.temp.forEach(function(t){"learn"===t.name&&e.userDefTemp.isShowAudeoPlay(a),"shoplist"!==t.name&&"shop"!==t.name&&"shopSeck"!==t.name&&"shopGroup"!==t.name||n||(e.mall.getCartNum(a),n=!0)});break;case"shopCart":a.store({is_edit:!1,is_selectAll:!1,totalNumber:0,selectCount:0,totalMoney:0})}if(a.state.pageOnShow){if(a.authInfo(),"hbArea"===a.state.page_name){return void(-1!==getApp().globalData.hbcDetailIndex&&e.voiceHongbao.getDetails(a))}switch(a.state.page_name){case"my":dataTemp.showGetUserInfo(a);break;case"userDefined":case"defined":var o=a.data.info;-1!==a.state.layoutArrIndex&&(o.temp[a.state.layoutArrIndex].data.myInfo=common.getStorage("userInfo")),a.setData({info:o}),wx.setNavigationBarTitle({title:a.state.page_title});break;case"shopList":e.mall.getCartNum(a);break;case"shopCart":e.mallCart.cartList(a,0);break;case"house":e.house.isagent(a);break;case"answer":e.answerTemp.answerShow(a);break;case"vote":e.voteTemp.voteShow(a)}}}var common=getApp().globalData.commonFun,util=getApp().globalData.utilFun,dataTemp=getApp().globalData.dataTempFun;module.exports={showData:showData};