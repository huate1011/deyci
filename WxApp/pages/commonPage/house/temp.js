"use strict";function pullhousedata(e,t,s,a){var u=e.state.limit,n=e.state.houseListTyps,i="/api/house/gethousemessage?types="+n+"&offset="+t+"&limit="+u;s&&(i+="&key="+s),a&&(i+="&screening="+a),util.httpRequest(i,{},"GET","v2").then(function(s){if("success"===s.result){var a=common.dataListHandle(e,s,e.data.list,t);e.setData({list:a.list,requestStatus:!0,hasNext:a.hasNext})}else common.showClickModal(s.msg)})}function isagent(e,t){var s={phone:common.getStorage("userInfo").phone};util.httpRequest("/api/house/isagent",s,"GET","v2").then(function(s){"success"===s.result&&(e.setData({isagent_status:s.status,isagent_id:s.id?s.id:0}),t(s))})}function houseEvent(e){eventChange(this,e)}function indexData(e){dataTemp.getBanner(e,"house"),isagent(e),common.commonFun(e),e.houseEvent=houseEvent;util.httpRequest("/api/house/menuconf",{},"GET","v2").then(function(t){if(wx.hideLoading(),"success"===t.result){var s="";t.switch_menu.length>0&&(s=t.switch_menu[0].menu_name),e.setData({switch_menus_status:t.switch_menu[0].menu_id,visiblemenus:t.visible_menu,searchdedefaultvalue:s,switch_menus:t.switch_menu,logoPosBottom:!1}),""!==t.type&&(e.state.houseListTyps=t.type,pullhousedata(e,0))}else common.showClickModal(t.msg)})}function nav(e,t){Number(t.index)!==Number(e.data.switch_menus_status)&&(wx.showLoading({title:"加载中...",mask:!0}),e.state.offset=0,e.state.houseListTyps=t.index,e.setData({switch_menus_status:t.index,list:[],requestStatus:!1}),pullhousedata(e,0))}function pickerChange(e,t){var s=t.detail.value,a=e.data.switch_menus,u=a[s].menu_id;e.setData({searchtype:u,searchdedefaultvalue:a[s].menu_name})}function houseentermenu(e,t){1===Number(t)||2===Number(t)||3===Number(t)||4===Number(t)||8===Number(t)?wx.navigateTo({url:"/pages/house/pages/list/list?types="+t}):5===Number(t)?wx.navigateTo({url:"/pages/house/pages/agent/agent"}):6===Number(t)?wx.navigateTo({url:"/pages/common/pages/stores/stores/stores"}):7===Number(t)?wx.navigateTo({url:"/pages/house/pages/publish/publish?isagentStatus=0&isagentid=0"}):9===Number(t)&&wx.navigateTo({url:"/pages/house/pages/publish/publish?isagentStatus="+e.data.isagent_status+"&isagentid="+e.data.isagent_id})}function housesearch(e){if(common.isNull(e.data.searchkey))common.showTimeToast("请填写关键字");else{var t=e.data.searchtype,s=e.data.searchkey;wx.navigateTo({url:"/pages/house/pages/list/list?types="+t+"&key="+s})}}function eventChange(e,t){var s=t.currentTarget.dataset;"nav"===s.types?nav(e,s):"housesearchInput"===s.types?e.setData({searchkey:t.detail.value}):"housePickerChange"===s.types?pickerChange(e,t):"houseentermenu"===s.types?houseentermenu(e,s.index):"housesearch"===s.types&&housesearch(e)}function houseDataSet(e){e.setData({visiblemenus:[],switch_menus:[],switch_menus_status:1,searchdedefaultvalue:"",searchtype:1,searchkey:"",peise:getApp().globalData.peise,requestStatus:!1,alterRequestStatus:!0,logoPosBottom:!0})}var util=getApp().globalData.utilFun,common=getApp().globalData.commonFun,dataTemp=getApp().globalData.dataTempFun;module.exports={indexData:indexData,eventChange:eventChange,pullhousedata:pullhousedata,houseentermenu:houseentermenu,houseDataSet:houseDataSet,isagent:isagent};