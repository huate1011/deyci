"use strict";function uploadImgs(t,a){var s=t.data.imgList,m=t.state.imgList_p;common.uploadImg("community",a,function(a,i){i.forEach(function(t){s.push(t)}),a.forEach(function(t){var a={oss_object:JSON.parse(t.data).url};m.push(a)}),t.state.imgList_p=m,t.setData({imgList:s})})}function removeImg(t,a){var s=t.currentTarget.dataset.index,m=a.data.imgList;m.splice(s,1);var i=a.state.imgList_p;i.splice(s,1),a.state.imgList_p=i,a.setData({imgList:m})}var common=getApp().globalData.commonFun;module.exports={uploadImgs:uploadImgs,removeImg:removeImg};