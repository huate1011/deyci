"use strict";function applyData(a,e,t){if(common.getStorage("is_signIn_btn")){var s=util.getFormatDate(new Date),n=common.getStorage("hide_signIn_btn_time"),o=Date.parse(s),r=Date.parse(n);Number(o-r)>0&&wx.removeStorageSync("is_signIn_btn")}switch(dataTemp.getSignInData(function(e){a.setData({is_signIn_btn:common.getStorage("is_signIn_btn")?common.getStorage("is_signIn_btn"):"show",isShowSignIn:0==e.data.my.status})}),t){case"list":dataTemp.activityType(a);break;case"userDefined":case"defined":a.setData({isUserDefined:!0,logoPosBottom:!1}),e.pageTemp.getUserDefined(a);break;case"shequn":dataTemp.getShequnConfig(a);break;case"zhuanlan":e.columnTemp.zhuanlanIndex(a);break;case"zllist":e.columnTemp.learnIndex(a,"zhuanlan");break;case"dplist":e.columnTemp.learnIndex(a,"danpin");break;case"album":dataTemp.albumConfig(a);break;case"shopIndex":e.mall.indexData(a);break;case"shopList":e.mall.shopListNav(a);break;case"shopCart":e.mallCart.cartList(a,0);break;case"my":dataTemp.showGetUserInfo(a);break;case"about":dataTemp.showAbuotInfo(a);break;case"newMovement":dataTemp.newsNavList(a);break;case"sameCity":e.catalog.config(a);break;case"sameCityPub":e.catalog.typeListData(a,0);break;case"dianCan":e.restaurant.diancanShow(a);break;case"klhb":e.voiceHongbao.navColor(a,"klhb");break;case"hbArea":e.voiceHongbao.navColor(a,"hbArea");break;case"from":dataTemp.formList(a,0);break;case"easyYuyue":e.easyYuyue.indexData(a);break;case"service":e.service.getData(a);break;case"settle":e.enter.settleDataSet(a),e.enter.showLoad(a);break;case"house":e.house.houseDataSet(a),e.house.indexData(a);break;case"car":e.carpooling.carDataSet(a),e.carpooling.getData(a);break;case"store":dataTemp.storeList(a,0);break;case"bargain":e.bargTemp.getIndexData(a);break;case"hotel":e.hotTemp.hotelDataSet(a),e.hotTemp.getData(a,0);break;case"bag":e.bagTemp.getIndexData(a);break;case"sales":e.salesTemp.setSalesData(a);break;case"answer":wx.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#35246b"}),e.answerTemp.answerShow(a);break;case"vote":e.voteTemp.voteShow(a);break;case"busiCard":e.busiCardTemp.getData(a);break;case"catering":e.catering.setCateringData(a)}}function pageData(a,e){var t=common.getStorage("userDefined"),s=a.state.key,n=t[s];n&&(a.state.page_name=n.name,a.state.page_title=n.title,a.state.page_id=n.id);var o=a.state.page_name,r=a.state.page_title;wx.setNavigationBarTitle({title:r}),common.getAccessToken()?(applyData(a,e,o),a.authInfo()):getApp().globalData.tokenUpdated=function(){console.log("update success"),applyData(a,e,o),a.authInfo()},a.store({interfaceName:o,name:o})}var common=getApp().globalData.commonFun,dataTemp=getApp().globalData.dataTempFun,util=getApp().globalData.utilFun;module.exports={pageData:pageData};