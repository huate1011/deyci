"use strict";function getGoodsList(t,e){var a=e.data.mall,o="/hdh/"+getApp().globalData.acid+"/product/?offset="+t+"&limit="+e.state.limit;e.state.searchKey?o+="&q="+e.state.searchKey:o+="&category_id="+e.state.categoryid,a.order&&(o+="&order="+a.order,"price"===a.order&&(1===Number(a.sort)?o+="&sort=asc":2===Number(a.sort)&&(o+="&sort=desc"))),util.httpRequest(o).then(function(o){var s=common.dataListHandle(e,o,a.shopData,t);a.shopData=s.list,a.hasNext=s.hasNext;var r=e.data.shopSearch;r=!!e.state.searchKey,e.store({mall:a,requestStatus:!0,saleDisplay:Number(common.getStorage("config").shop.saleDisplay),shopSearch:r}),wx.stopPullDownRefresh()})}function mallSwichNav(t,e){console;var a=t.data.mall,o=e.categoryid,s=parseInt(e.current),r=t.data.navList,i=r[s].sub_shop;t.state.categoryid=o,t.data.currentTab!==s&&(a.seconNav=0),0!==Number(o)&&i&&i.length>0?t.store({mall:a,currentTab:s,seconNavL:i}):(wx.showLoading({title:"加载中...",mask:!0}),a.shopData=[],a.toView="category_"+s,a.order="",a.sort=0,t.store({mall:a,seconNavL:[],currentTab:s,requestStatus:!1,logoPosBottom:!0}),t.state.offset=0,getGoodsList(0,t))}function mallSeconNav(t,e){var a=t.data.mall;t.state.categoryid=e.categoryid,wx.showLoading({title:"加载中...",mask:!0}),a.shopData=[],a.order="",a.sort=0,a.seconNav=e.categoryid,t.store({mall:a,seconNavL:[],requestStatus:!1}),t.state.offset=0,getGoodsList(0,t)}function getCartNum(t){var e="/cart/?acid="+getApp().globalData.acid;util.httpRequest(e).then(function(e){t.store({cartNum:e.count})})}function data(t){var e=t.data.mall,a=getApp().globalData.mallcategoryId,o=t.state.options,s=0,r=common.getStorage("config").shop,i=r.categories;0===Number(a)&&i.length>0&&!o.hasOwnProperty("category_id")?t.state.categoryid=i[0].id:(o.hasOwnProperty("category_id")?t.state.categoryid=o.category_id:t.state.categoryid=a,i.forEach(function(e,a){Number(e.id)===Number(t.state.categoryid)&&(s=a)}),e.shopData=[],e.toView="category_"+s,getApp().globalData.mallcateId=0),0==i.length&&(wx.hideLoading(),o.hasOwnProperty("category_id")?t.state.categoryid=o.category_id:t.state.categoryid=a),t.store({shopTempName:r.list_view_type,isShowShopClass:r.isShowShopClass,navList:r.categories,mall:e,currentTab:s,contactStatus:!0}),common.getAccessToken()?(getGoodsList(0,t),getCartNum(t)):getApp().globalData.tokenUpdated=function(){console.log("update success"),getGoodsList(0,t),getCartNum(t)}}function data2(t){var e=t.data.mall,a=getApp().globalData.mallcategoryId,o=common.getStorage("config").shop,s=o.categories,r=t.state.options;if(0!==Number(a)||r.hasOwnProperty("category_id")){r.hasOwnProperty("category_id")?t.state.categoryid=r.category_id:t.state.categoryid=a,e.shopData=[],getApp().globalData.mallcateId=0,0==s.length&&(wx.hideLoading(),r.hasOwnProperty("category_id")?t.state.categoryid=r.category_id:t.state.categoryid=a);var i={};o.categories.forEach(function(t){i[t.id]=t}),t.store({shopTempName:o.list_view_type,isShowShopClass:o.isShowShopClass,navList:i[t.state.categoryid].sub_shop,mall:e,contactStatus:!0})}else t.state.categoryid=0,t.store({shopTempName:o.list_view_type,isShowShopClass:o.isShowShopClass,navList:[],mall:e,contactStatus:!0});common.getAccessToken()?(getGoodsList(0,t),getCartNum(t)):getApp().globalData.tokenUpdated=function(){console.log("update success"),getGoodsList(0,t),getCartNum(t)}}function mallSeconNav2(t,e){var a=t.data.mall;t.state.categoryid=e.categoryid,wx.showLoading({title:"加载中...",mask:!0}),console.log(e),a.shopData=[],a.order="",a.sort=0,t.store({mall:a,currentTab:e.current,requestStatus:!1}),t.state.offset=0,getGoodsList(0,t)}function shopListNav(t,e){dataTemp.getBanner(t,"shop"),common.configData("shop",function(){var e=common.getStorage("config").shop;common.commonFun(t),e.module?0===Number(e.isShowShopClass)?data2(t):data(t):common.showClickModal(e.msg)})}function openConfirm(t,e,a){var o=!1,s="cart",r="",i=t.data.detail;"detail"===a&&(s="detail",i.ptStatus&&!t.state.danmai&&(s="groupon",r=i.groupon.id,o=i.ptStatus));var n={skuData:e.skuData,from:s,ptStatus:o,grouponId:r};common.setStorage("confirmData",n),t.setData({orderNum:1}),t.state.isPay=!1;var c=t.state.options,u=0;c&&c.hasOwnProperty("isMallODOpen")&&(u=c.isMallODOpen),wx.hideLoading(),t.state.pagesLeg&&4===t.state.pagesLeg?(0!==Number(u)&&(u=Number(u)-1),wx.redirectTo({url:"/pages/mall/pages/confirmOrder/confirmOrder?isMallODOpen="+u})):wx.navigateTo({url:"/pages/mall/pages/confirmOrder/confirmOrder?isMallODOpen="+u})}function addShopCar(t,e,a){if("shopCart"===e)return void openConfirm(a,t,"");var o="/cart/?acid="+getApp().globalData.acid;util.httpRequest(o,t.cartsku,e).then(function(o){a.state.isPay||"PUT"===e?openConfirm(a,t,""):a.state.isCart?((a.data.cartNum||0===a.data.cartNum)&&a.store({cartNum:Number(a.data.cartNum)+Number(a.data.orderNum)}),a.store({orderNum:1}),a.state.isCart=!1,wx.hideLoading()):"POST"===e&&(a.store({cartNum:o.cart.count}),wx.hideLoading())})}function changeSpecify(t,e){for(var a=e.data.orderNum,o=t.idx,s=t.index,r=t.value,i=e.data.shopKeys.split("；"),n=e.data.keys,c=e.data.tk_sku,u=0;u<n[o].value.length;u+=1)u===s?(n[o].status[u]=!0,i.splice(o,1,r)):n[o].status[u]=!1;var l=!1;n[o].status.forEach(function(t){t&&(l=!0)}),n[o].checked=l,i=i.join("；");for(var d=e.data.detail.skus,p=[],m=0;m<d.length;m+=1){for(var g=d[m],h=[],f=0;f<g.sale_props.length;f+=1)h.push(g.sale_props[f].value);p.push(h.join("；")),i===h.join("；")&&(c=g,a=1)}common.IsInArray(p,i)||(a=1,c.hasOwnProperty("stock_count")?c.stock_count=0:c={stock_count:0,preview:e.data.detail.cover,price:e.data.detail.price_desc}),e.store({keys:n,shopKeys:i,tk_sku:c,orderNum:a})}function updShopCartData(t,e,a,o){var s=t.data.detail,r=t.data.orderNum,i=t.data.tk_sku,n=[{sku_id:i.id,count:Number(r),price:a,normal_product:o,isMemberProduct:s.isMemberProduct,inputs:t.state.inputVal}],c="",u=i.sale_props;u.length>0&&u.forEach(function(t){c+=t.value+","}),","===c.substr(c.length-1,1)&&(c=c.substr(0,c.length-1));var l={cartsku:{cartsku:n},skuData:[{count:r,sku_id:i.id,price:a,normal_product:o,isMemberProduct:s.isMemberProduct,inputs:t.state.inputVal}]},d=t.data.selectSku;d?d.price=i?i.price_desc:detail.price_desc:d=i,console.log(d),t.store({selectSku:d,is_hidden:!0,isScroll:!0}),t.state.isPay?openConfirm(t,l,e.pageName):t.state.isChooseSku?t.state.isChooseSku=!1:addShopCar(l,"POST",t)}function sureChange(t,e){for(var a=t.data.keys,o=0;o<a.length;o+=1)if(!a[o].checked)return void common.showTimeToast("请选择"+a[o].name);if(!t.data.orderNum||0===Number(t.data.orderNum))return void common.showClickModal("请输入正确的数量");var s=t.data.tk_sku,r=(s.id,t.data.orderNum),i=t.data.detail,n=s?s.stock_count:t.data.stock_count,c=s?s.price:i.price_desc,u=!0;if(i.msStatus){var l=i.seckilling.price_desc;"元"===l.substr(l.length-1,1)&&(l=l.substr(0,l.length-1)),c=l,u=!1}if(i.ptStatus&&!t.state.danmai&&(n=i.groupon.stock_count,c=i.groupon.price,u=!1),u&&i.isMemberProduct&&(c=s?s.price_member:i.fee_member),Number(n)<Number(r))return void common.showClickModal("超出库存量");t.state.inputVal.length>0?inputChange.contentJudge(t,function(a){updShopCartData(t,e,c,u)}):updShopCartData(t,e,c,u)}function skuProps(t){var e=[],a=[],o=[],s="",r=0,i=!1,n=0;if(t.skus.forEach(function(t){if(r+=t.stock_count,t.sale_props.length>0){n+=1;var e=[];t.sale_props.forEach(function(a){var s={id:t.id,key:a.key,value:a.value};e.push(a.value),o.push(s)})}}),n>0){i=!0,o.forEach(function(t){-1===a.indexOf(t.key)&&a.push(t.key)});for(var c=0;c<a.length;c+=1){var u={};u.checked=!1,u.name=a[c],u.value=[],u.status=[];for(var l=0;l<o.length;l+=1)o[l].key===a[c]&&-1===u.value.indexOf(o[l].value)&&(u.value.push(o[l].value),u.status.push(!1));e.push(u)}}else s=t.skus[0];return{shopKeys:a.join("；"),keys:e,stock_count:r,selectSku:s,tk_sku:s,hasSku:i}}function shopDetailElem(t,e){var a=skuProps(e);e.hasOwnProperty("seckilling")&&(e.msStatus=!0),e.hasOwnProperty("groupon")&&(e.ptStatus=!0),t.store({detail:e,shopKeys:a.shopKeys,keys:a.keys,stock_count:a.stock_count,selectSku:a.selectSku,tk_sku:a.tk_sku,hasSku:a.hasSku,is_hidden:!1,isScroll:!1,orderNum:1})}function valueChange(t,e){var a=e.currentTarget.dataset.value,o=t.data.tk_sku?t.data.tk_sku.stock_count:t.data.stock_count;Number(o)<Number(a)&&(common.showClickModal("超出库存量"),a=Number(o)),t.store({orderNum:a})}function valueAdd(t,e){var a=t.data.orderNum?Number(t.data.orderNum):0,o=t.data.tk_sku?t.data.tk_sku.stock_count:t.data.stock_count;Number(o)>Number(a)&&t.store({orderNum:a+=1})}function valueDown(t){var e=Number(t.data.orderNum);e>1&&t.store({orderNum:e-=1})}function inputBlur(t,e){var a=e.detail.value;""===a||Number(a)}function getShopDetail(t,e){var a="/product/"+e+"/";wx.showLoading({title:"",mask:!0}),util.httpRequest(a).then(function(e){wx.hideLoading(),shopDetailElem(t,e)})}function chooseSort(t,e){var a=t.data.mall;if("price"===e.typename){a.order=e.typename;var o=e.orsort;0===Number(o)?a.sort=1:1===Number(o)?a.sort=2:2===Number(o)&&(a.sort=0,a.order="")}else{if(a.order===e.typename)return;a.sort=0,a.order=e.typename}a.seconNav=t.state.categoryid,t.store({mall:a,seconNavL:[]}),wx.showLoading({title:"加载中...",mask:!0}),t.state.offset=0,getGoodsList(0,t)}function shopListChangeEvent(t,e){var a=e.currentTarget.dataset;if("input"===e.type&&(a.value=e.detail.value),console.log(e),"shopListSearch"==a.types)t.state.searchKey="","submit"===e.type&&(t.state.searchKey=e.detail.value.keyword),"confirm"===e.type&&(t.state.searchKey=e.detail.value),t.state.offset=0,getGoodsList(0,t);else if("shopListCancelSearch"===a.types)t.state.searchKey="",t.state.offset=0,getGoodsList(0,t);else if("swichNav"===a.types)t.state.categoryid=a.categoryid,mallSwichNav(t,a);else if("seconNav"===a.types)mallSeconNav(t,a);else if("closeNav"===a.types){var o=t.data.mall;o.seconNav=t.state.categoryid,t.store({mall:o,seconNavL:[]}),t.state.offset=0,getGoodsList(0,t)}else if("addCart"===a.types)getShopDetail(t,a.id);else if("selectSpecify"===a.types)changeSpecify(a,t);else if("downNumber"===a.types)valueDown(t);else if("addNumber"===a.types)valueAdd(t,e);else if("closeModal"===a.types)t.state.isCart=!1,t.state.isPay=!1,t.state.danmai=!0,t.store({is_hidden:!0,isScroll:!0,orderNum:1});else if("sure"===a.types)sureChange(t,e);else if("changeValue"===a.types)valueChange(t,e);else if("openWindow"===a.types)common.openUrl(a,t);else if("ggHide"===a.types){var s=common.getStorage("indexpop");s.status=!0,common.setStorage("indexpop",s),t.store({alterHidden:"hide"})}else if("chooseSort"===a.types)chooseSort(t,a);else if("searchBtn"===a.types){var r=[{name:"search",data:{placeholder:"搜索",type:"shop"}}];common.setStorage("layout",r),wx.navigateTo({url:"/pages/common/pages/search/search"})}else"openList"===a.types?(getApp().globalData.mallcategoryId=a.id,wx.navigateTo({url:"/pages/mall/pages/shopList/shopList"})):"swichNav2"===a.types&&mallSeconNav2(t,a)}function getRecommendGoodsList(t,e){var a="/hdh/"+getApp().globalData.acid+"/product/?offset="+t+"&limit="+e.state.limit+"&category_id=0&order=nominate";util.httpRequest(a).then(function(a){var o=common.dataListHandle(e,a,e.data.list,t);e.setData({list:o.list,hasNext:o.hasNext,requestStatus:!0}),wx.stopPullDownRefresh(),getCartNum(e)})}function getCouponList(t){var e="/hdh/"+getApp().globalData.acid+"/coupon/?type_ids=0";util.httpRequest(e).then(function(e){t.store({couponList:e.results})})}function indexData(t){common.commonFun(t),common.configData("shop",function(e){dataTemp.getBanner(t,"shop");var a=[];a=0===Number(e.shop.categories[0].id)?e.shop.categories.splice(1,e.shop.categories.length-1):e.shop.categories;var o=[],s=[];a.forEach(function(t,e){s.push(t),8!==s.length&&e!==a.length-1||(o.push(s),s=[])}),t.setData({typeName:o,shopTempName:e.shop.list_view_type,saleDisplay:Number(e.shop.saleDisplay)}),getCouponList(t),getRecommendGoodsList(0,t)})}var common=getApp().globalData.commonFun,util=getApp().globalData.utilFun,dataTemp=getApp().globalData.dataTempFun,inputChange=getApp().globalData.inputFun,userDefined=require("../../userDefined/temp/userDefined.js");module.exports={shopListChangeEvent:shopListChangeEvent,getGoodsList:getGoodsList,shopListNav:shopListNav,getShopDetail:getShopDetail,inputBlur:inputBlur,getCartNum:getCartNum,addShopCar:addShopCar,skuProps:skuProps,indexData:indexData,getRecommendGoodsList:getRecommendGoodsList,getCouponList:getCouponList};