"use strict";function hideAlter(e,a){3===Number(a)&&e.setData({bindPhone1:"",bindCode1:"",bindPhone2:"",bindCode2:""}),2===Number(a)&&e.setData({passPhone:"",passCode:"",pass1:"",pass2:""});var o=e.data.tankuang;o[a]="hide",e.setData({tankuang:o})}function bindPhoneModal(e){var a=e.data.tankuang;wx.showModal({title:"提示",content:"绑定成功！",showCancel:!1,success:function(){a[3]="hide",e.setData({CountdownVal:e.data.CountdownVal,CountdownTime:e.data.CountdownTime,onClick:e.data.onClick,clearTimeout:!1,tankuang:a})}})}function resultChange(e,a,o){if(e.setData({myInfo:o}),"setPageVal"===a.pageName)e.setData({numberValue:o.phone});else if("baoming"===a.pageName){var t=e.data.lists,n=e.state.inputVal,i=a.currentTarget.dataset.index;t[i].value=o.phone,n[i].value=o.phone,e.state.inputVal=n,e.setData({lists:t})}else"zhuanlan"===a.pageName?(a.types="payMethedSure",e.setData({bindPhone:!0}),e.buyZhuanlan(a)):"edit"===a.pageName?e.shuaxin():"sameCity"===a.pageName?e.setData({bindPhone:!0,tel:o.phone}):"point"===a.pageName||"extension"===a.pageName?bindPhoneModal(e):"market"===a.pageName&&bindPhoneModal(e)}function btnBindPhone(e,a){var o=e.data.tankuang;if("getPhoneNumber:ok"!==a.detail.errMsg)return o[3]="show",void e.setData({tankuang:o});var t={wx_encrypted:{encrypted_data:a.detail.encryptedData,iv:a.detail.iv}};util.httpRequest("/user/me/",t,"POST").then(function(e){return common.getPersonInfo()}).then(function(t){t.phone?(common.showTimeToast("手机号绑定成功"),common.setStorage("userInfo",t),resultChange(e,a,t)):(common.showTimeToast("手机号绑定失败"),o[3]="show",e.setData({tankuang:o}))}).catch(function(a){403===a.statusCode&&(common.showTimeToast("手机号绑定失败"),common.getToken(),o[3]="show",e.setData({tankuang:o}))})}function userPhoneChange(e,a,o){"zhuanlan"===a.pageName&&"point"===a.pageName&&"extension"===a.pageName||common.showClickModal("绑定成功");var t=e.data.tankuang;if(t[3]="hide",e.data.CountdownVal[2]="发送验证码",e.data.CountdownTime[2]=60,e.data.onClick[2]=!0,"setPageVal"===a.pageName)e.setData({numberValue:o});else if("baoming"===a.pageName){var n=e.data.lists,i=e.state.inputVal;n[e.state.phoneInputsId].value=o,i[e.state.phoneInputsId].value=o,e.state.inputVal=i,e.setData({lists:n})}else"zhuanlan"===a.pageName?(a.types="payMethedSure",e.setData({bindPhone:!0,tankuang:t}),e.buyZhuanlan(a)):"market"===a.pageName&&bindPhoneModal(e);common.getWallet(e),e.setData({CountdownVal:e.data.CountdownVal,CountdownTime:e.data.CountdownTime,onClick:e.data.onClick,clearTimeout:!1,tankuang:t})}function userPhoneBind(e,a){var o=a.detail.value.phone,t=a.detail.value.code,n="",i="";if("edit"===a.pageName&&e.data.bindPhone&&(n=a.detail.value.oldphone,i=a.detail.value.oldcode,common.isNull(n)))return void common.showTimeToast("请输入旧手机号");if(common.isNull(o))common.showTimeToast("请输入手机号");else if(common.isNull(t)&&!e.state.notNeedCode)common.showTimeToast("请输入验证码");else{var s={};s="edit"===a.pageName&&e.data.bindPhone?{original:{phone:n,captcha:i},updated:{phone:o,captcha:t},scenario:"rebind_phone"}:{original:{},updated:{phone:o,captcha:t},scenario:"rebind_phone"},wx.showLoading({title:"绑定中...",mask:!0}),util.httpRequest("/account/",s,"POST").then(function(t){if(wx.hideLoading(),"success"===t.result){common.getPersonInfo();var n=e.data.myInfo;n.phone=o,common.setStorage("userInfo",n),userPhoneChange(e,a,o)}else common.showClickModal(t.msg)})}}function settime(e,a){var o=setTimeout(function(){if(e.data.clearTimeout){var t=e.data.CountdownTime,n=e.data.CountdownVal,i=e.data.onClick;0===t[a]?(n[a]="发送验证码",t[a]=60,i[a]=!0,clearTimeout(o)):(n[a]="重新发送("+e.data.CountdownTime[a]+")",t[a]-=1,settime(e,a)),e.setData({CountdownVal:e.data.CountdownVal,CountdownTime:e.data.CountdownTime,onClick:e.data.onClick})}else clearTimeout(o)},1e3)}function codeSend(e,a){var o=a.currentTarget.dataset.index,t="";if(t=3===Number(o)?e.data.oldphone:e.data.phone,common.isNull(t))common.showTimeToast("请输入手机号");else{if(!e.data.onClick[o])return;e.data.onClick[o]=!1,e.setData({onClick:e.data.onClick}),wx.showLoading({title:"发送中...",mask:!0}),wx.pro.request({url:"/account/captcha/",data:{phone:t,acid:getApp().globalData.acid},method:"POST"}).then(function(a){if(wx.hideLoading(),"success"===a.result)common.showClickModal("发送成功"),settime(e,o);else{common.showClickModal(a.msg);var t=e.data.onClick;t[o]=!0,e.setData({onClick:t})}}).catch(function(a){wx.hideLoading(),common.showClickModal("发送失败");var t=e.data.onClick;t[o]=!0,e.setData({onClick:t})})}}function setPassConfirm(e,a,o,t){var n=a.detail.value.phone,i=a.detail.value.code,s=a.detail.value.newPassword,d=a.detail.value.confirmNewPassword;if(common.isNull(n))common.showTimeToast("请输入手机号");else if(common.isNull(i))common.showTimeToast("请输入验证码");else if(common.isNull(s))common.showTimeToast("请输入新密码");else if(common.isNull(d))common.showTimeToast("请再次输入密码");else if(s!==d)common.showTimeToast("两次输入的密码不一致");else{var l="";l=0===o?{original:{phone:n,captcha:i},updated:{password:d},scenario:e.data.scenario[o]}:{original:{phone:n,captcha:i},updated:{pay_password:d},scenario:e.data.scenario[o]},wx.showLoading({title:"设置中...",mask:!0}),wx.pro.request({url:"/account/",data:l,method:"POST"}).then(function(a){if(wx.hideLoading(),"success"===a.result){common.showClickModal("设置成功");var n=e.data.CountdownVal,i=e.data.CountdownTime,s=e.data.onClick;n[o]="发送验证码",i[o]=60,s[o]=!0,e.setData({CountdownVal:n,CountdownTime:i,onClick:s,clearTimeout:!1,isSetPayPassword:!0}),setTimeout(function(){hideAlter(e,t)},2e3)}else common.showClickModal(a.msg)})}}function phoneChange(e,a){var o=a.currentTarget.dataset;if("button"===o.types)btnBindPhone(e,a);else if("importPhone"===o.types){var t=e.data.tankuang;t[3]="show",e.setData({tankuang:t})}else"close"===o.types?hideAlter(e,o.index):"sendCode"===o.types?codeSend(e,a):"oldphone"===o.types?e.setData({oldphone:a.detail.value}):"phone"===o.types?e.setData({phone:a.detail.value}):"bindPhone"===o.types?userPhoneBind(e,a):"payPassword"===o.types&&setPassConfirm(e,a,1,2)}var util=require("util.js"),common=require("common.js");module.exports={phoneChange:phoneChange,codeSend:codeSend,setPassConfirm:setPassConfirm,hideAlter:hideAlter};