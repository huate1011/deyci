"use strict";function promisify(){wx.pro={},["login","getUserInfo","navigateTo","checkSession","getStorageInfo","removeStorage","clearStorage","getNetworkType","getSystemInfo","chooseImage","uploadFile","chooseLocation","getImageInfo","requestPayment"].forEach(function(e){wx.pro[e]=function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(t,n){o.success=function(e){t(e)},o.fail=function(e){wx.hideLoading(),n(e)},wx[e](o)})}}),wx.pro.fromSync=function(e){return new Promise(function(o,t){try{o(e())}catch(e){t(e)}})},wx.pro.all=function(e){return Promise.all(e)},wx.pro.getStorage=function(e){return new Promise(function(o,t){wx.getStorage({key:e,success:function(e){o(e.data)},fail:function(e){o()}})})},wx.pro.setStorage=function(e,o){return new Promise(function(t,n){wx.setStorage({key:e,data:o,success:function(e){t(o)},fail:function(e){n(e)}})})},wx.pro.request=function(e){var o="https://api.miniprogramadmin.com/v1",t=extData.getData().ext;return wx.getExtConfigSync&&(t=wx.getExtConfigSync()),t&&t.serverurl&&(o=t.serverurl),e.types&&(o="https://v2.api.miniprogramadmin.com",t&&t.serverurlv2&&(o=t.serverurlv2)),e.toast&&wx.showToast({title:e.toast.title||"加载中",icon:"loading"}),new Promise(function(t,n){console.log(e.url);var r={url:o+e.url,method:e.method||"GET",header:{Authorization:"Bearer "+common.getAccessToken(),Position:JSON.stringify(common.getStorage("position"))},success:function(e){e.statusCode>=400?(console.log(e),401===e.statusCode&&wx.removeStorageSync("token"),wx.hideLoading(),n(e)):(t(e.data),e.data||wx.hideLoading())},fail:function(o){console.log(JSON.stringify(o)),console.error("wx.request fail [network]",e,o),n(o),wx.hideLoading()}};e.data&&(r.data=e.data,r.header["content-type"]="application/json"),wx.request(r)})}}var Promise=require("../polyfill/es6-promise.js").Promise,common=require("../utils/common.js"),extData=require("../utils/data.js");promisify(),module.exports=Promise;