"use strict";var common=getApp().globalData.commonFun,util=getApp().globalData.utilFun,dataTemp=getApp().globalData.dataTempFun,temp=require("./temp.js");Page({data:{interfaceName:"commentShop",contactStatus:!0,startStatus:!1,contentStatus:!0,shopImgUrl:"",peise:getApp().globalData.peise,imgStatus:!1,nmVal:0,imgList:[],gradeImg:["https://www.haojian.cn/wximg/mall/star_def.png","https://www.haojian.cn/wximg/mall/star_def.png","https://www.haojian.cn/wximg/mall/star_def.png","https://www.haojian.cn/wximg/mall/star_def.png","https://www.haojian.cn/wximg/mall/star_def.png"]},state:{imgList_p:[],starNum:0,anonymous:!1,options:{}},onLoad:function(t){wx.showLoading({title:"加载中...",mask:!0});var e=this;common.getPersonInfo().then(function(a){wx.hideLoading(),common.commonFun(e),e.setDataPage(t)})},setDataPage:function(t){this.state.options=t,this.state.productId=t.id,this.state.type=t.type;var e=this.data.startStatus,a=this.data.contentStatus,s=this.data.imgStatus;("tcDetail"===t.type&&1===Number(t.ispoint)||"newsDetail"===t.type&&1===Number(t.ispoint)||"shop"===t.type||"activity"===t.type||"settleIn"===t.type||"bargain"===t.type||"pointShop"===t.type)&&(e=!0,s=!0),"service"===t.type&&(e=!0,a=!1),"hotel"===t.type&&(e=!0,a=!0,s=!0),this.setData({startStatus:e,contentStatus:a,imgStatus:s,shopImgUrl:common.getStorage("commentImgUrl")})},onUnload:function(){var t=this.state.options;t.hasOwnProperty("index")&&("service"===this.state.type&&getApp().globalData.updateServiceOrderStatus(t.index),"bargain"===this.state.type&&getApp().globalData.updateBargainOrder("",t.index,"comment"),"hotel"===this.state.type&&getApp().globalData.hotelOrderComment(t.index)),wx.removeStorageSync("commentImgUrl")},selNIming:function(t){var e=t.currentTarget.dataset.isnm;1===e?(e=0,this.state.anonymous=!1):(e=1,this.state.anonymous=!0),this.store({nmVal:e})},sendComment:function(t){var e=this,a=t.detail.value.desc,s=this.state.starNum,n="";if(this.data.startStatus&&0===Number(s))return void common.showTimeToast("请选择评分等级");if(this.data.contentStatus&&common.isNull(a)&&0===e.state.imgList_p.length)return void common.showTimeToast("请填写评价内容");var o={wx_form_id:t.detail.formId,content:a,attachments:e.state.imgList_p,rating:Number(2*s),anonymous:e.state.anonymous},i="/product/"+e.state.productId+"/comment/";o.type="shop",o.did=e.state.productId,"activity"===e.state.type?(i="/activity/"+e.state.productId+"/comment/",o.type="activity"):"newsDetail"===e.state.type?(i="/news/"+e.state.productId+"/comment/",o.type="newsDetail"):"tcDetail"===e.state.type?(i="/catalogthread/"+e.state.productId+"/comment/",o.type="tcDetail"):"settleIn"===e.state.type?(n="v2",i="/business/Information/comment",o.id=e.state.productId,delete o.type,delete o.did):"service"===e.state.type?(i="/api/ExpertToClient/makeGrade",n="v2",o.type="service"):"bargain"===e.state.type?(i="/api/BargainOrder/comment",n="v2",o.type="bargain"):"hotel"===e.state.type?(i="/api/HotelToClient/comments",n="v2",o.type="hotel"):"pointShop"===e.state.type&&(i="/api/integralMall/addComment",n="v2",o.type="pointShop"),wx.showLoading({title:"",mask:!0}),util.httpRequest(i,o,"POST",n).then(function(t){if(wx.hideLoading(),"success"===t.result){var e="评价成功";t.hasOwnProperty("comment")&&"wait_confirm"===t.comment.status&&(e="评论已提交，等待审核！"),wx.showModal({title:"提示",content:e,showCancel:!1,success:function(t){t.confirm&&wx.navigateBack({delta:1})}})}else common.showClickModal(t.msg)})},store:function(t){this.setData(t)},uploadImgs:function(){temp.uploadImgs(this,9-this.data.imgList.length)},removeImg:function(t){temp.removeImg(t,this)},changestar:function(t){var e=this.data.gradeImg,a=t.currentTarget.dataset.index;this.state.starNum=Number(a)+1;for(var s=0;s<e.length;s+=1)e[s]="https://www.haojian.cn/wximg/mall/star_def.png";for(var n=0;n<=a;n+=1)e[n]="https://www.haojian.cn/wximg/mall/star_act.png";this.store({gradeImg:e})},userInfoHandler:function(t){dataTemp.userInfoBind(this,t)}});