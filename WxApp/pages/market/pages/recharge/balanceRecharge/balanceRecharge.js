"use strict";var common=getApp().globalData.commonFun,util=getApp().globalData.utilFun,payTempImport=getApp().globalData.payTemp;Page({data:{interfaceName:"balanceRecharge",contactStatus:!0,requestStatus:!1,cashcardList:[]},state:{fee_product_id:"",id:""},onLoad:function(t){this.getCashcard(t),common.commonFun(this)},getCashcard:function(t){var a=this,s="/hdh/"+getApp().globalData.acid+"/cashcard/?0ffset=0";util.httpRequest(s).then(function(s){var e=0,i=0;t.hasOwnProperty("id")?s.results.length>0&&s.results.forEach(function(a,c){s.results[c].status=!1,Number(t.id)===Number(a.id)&&(s.results[c].status=!0,e=a.fee_product_id,i=a.id)}):s.results.length>0&&(s.results.forEach(function(t,a){s.results[a].status=!1}),s.results[0].status=!0,e=s.results[0].fee_product_id,i=s.results[0].id),a.state.fee_product_id=e,a.state.id=i,a.store({cashcardList:s.results,requestStatus:!0}),wx.hideLoading()})},selectPrice:function(t){var a=t.currentTarget.dataset.index,s=this.data.cashcardList;Number(a)!==this.data.selectIndex&&(s.forEach(function(t,a){s[a].status=!1}),s[a].status=!0,this.state.id=s[a].id,this.state.fee_product_id=s[a].fee_product_id,this.store({cashcardList:s}))},confirm:function(t){wx.showLoading({title:"",mask:!0});var a="/account/"+this.state.id+"/payment/",s={wx_form_id:t.detail.formId,product_id:this.state.fee_product_id,platform:"weixin"};payTempImport.payment(this,a,s,function(t,a){getApp().globalData.updateCashcard(),"success"===t?wx.showModal({title:"提示",content:"充值成功",showCancel:!1,success:function(t){wx.navigateBack()}}):common.showClickModal(a)})},store:function(t){this.setData(t)}});