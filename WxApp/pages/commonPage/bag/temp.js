"use strict";function getList(t,a){var e="/api/BagActivity/get?limit="+t.state.limit+"&offset="+a+"&status=4";util.httpRequest(e,{},"GET","v2").then(function(e){if("success"==e.result){var s=common.dataListHandle(t,e,t.data.list,a);t.setData({list:s.list,requestStatus:!0,count:s.count,hasNext:s.hasNext})}else common.showClickModal(e.msg);wx.hideLoading()})}function bagDetail(t,a){var e=t.data.list;if(e[a]){var s="/api/BagActivity/get?id="+e[a].id;util.httpRequest(s,{},"GET","v2").then(function(s){e[a].sellerNum=s.results.sellerNum,e[a].num=s.results.num,e[a].rankImg=s.results.rankImg,e[a].totalLookNum=s.results.totalLookNum,t.setData({list:e})})}}function configData(t){util.httpRequest("/api/BagConfig/get",{},"GET","v2").then(function(a){"success"===a.result&&t.setData({bagBg:a.results.bg,bag_banner:a.results.banner})}),wx.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#000000"})}function getIndexData(t){configData(t),getList(t,0)}var util=getApp().globalData.utilFun,common=getApp().globalData.commonFun;module.exports={getIndexData:getIndexData,configData:configData,getList:getList,bagDetail:bagDetail};