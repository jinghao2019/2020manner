(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mannerlist/mannerlist1"],{1011:function(t,e,n){"use strict";n.r(e);var o=n("5f7b"),i=n("d443");for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);n("766b");var r,c=n("f0c5"),u=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=u.exports},"333c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=s(n("4795")),i=n("2f62");function s(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,o,i,s,r){try{var c=t[s](r),u=c.value}catch(a){return void n(a)}c.done?e(u):Promise.resolve(u).then(o,i)}function c(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var s=t.apply(e,n);function c(t){r(s,o,i,c,u,"next",t)}function u(t){r(s,o,i,c,u,"throw",t)}c(void 0)}))}}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var h=function(){n.e("components/detail/base-info").then(function(){return resolve(n("d05f"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/detail/scroll-attrs").then(function(){return resolve(n("3ff5"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/uni-ui/uni-list-item/uni-list-item").then(function(){return resolve(n("4d8a"))}.bind(null,n)).catch(n.oe)},d=function(){Promise.all([n.e("common/vendor"),n.e("components/detail/scroll-comments")]).then(function(){return resolve(n("22a5"))}.bind(null,n)).catch(n.oe)},m=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-ui/uParse/src/wxParse")]).then(function(){return resolve(n("a484"))}.bind(null,n)).catch(n.oe)},g=function(){n.e("components/common/card").then(function(){return resolve(n("90f3"))}.bind(null,n)).catch(n.oe)},v=function(){n.e("components/common/common-list").then(function(){return resolve(n("f52b"))}.bind(null,n)).catch(n.oe)},w=function(){n.e("components/detail/bottom-btn").then(function(){return resolve(n("c223"))}.bind(null,n)).catch(n.oe)},b=function(){n.e("components/common/common-popup").then(function(){return resolve(n("f5f1"))}.bind(null,n)).catch(n.oe)},P=function(){n.e("components/common/price").then(function(){return resolve(n("2a15"))}.bind(null,n)).catch(n.oe)},S=function(){n.e("components/common/radio-group").then(function(){return resolve(n("c340"))}.bind(null,n)).catch(n.oe)},O=function(){n.e("components/uni-ui/uni-number-box/uni-number-box").then(function(){return resolve(n("9a2a"))}.bind(null,n)).catch(n.oe)},x={components:{baseInfo:h,scrollAttrs:f,uniListItem:p,scrollComments:d,uParse:m,card:g,commonList:v,bottomBtn:w,commonPopup:b,price:P,zcmRadioGroup:S,uniNumberBox:O},computed:a({},(0,i.mapState)({cartlist:function(t){return t.cart.list},changenumBtn:function(t){return t.cart.changenumBtn}}),{},(0,i.mapGetters)(["checkedAll","totalPrice","totalNum","disableSelectAll","popupData"]),{showPrice:function(){for(var t=0,e=0;e<this.newoptions.length;e++)0==this.newoptions[e].isnum&&(t+=parseFloat(this.newoptions[e].child[this.newoptions[e].selected].addPrice));return t+this.multiPrice+this.changePrice},checkedSkus:function(){var t=this,e=this.newoptions.map((function(e){if(0!=e.isnum&&0==e.isspecial&&0==e.ismulti){if(0!=e.isnum)return t.coffeePieces+"份"+e.name}else if(0==e.isnum&&0==e.isspecial&&0==e.ismulti)return e.child[e.selected]["name"]}));return e=this.$Util.removeEmptyArrayEle(e),(e.join("/")+"/"+this.multiAttrStr.join("/")).trim("/")}}),data:function(){return{specialexist:!1,coffeePieces:1,changePrice:0,multiPrice:0,multiAttrStr:[],shopping:!1,showattr:!1,showcart:!1,height:0,specialcard:!1,goodsNum:1,detail:{num:1},url:"",newoptions:[],popup:{attr:"none",express:"none",service:"none"},currentShop:{},currentGoods:{},goodsIndex:"",showLoading:!0,activeIndex:0,leftDomsTop:[],rightDomsTop:[],leftScrollTop:[],rightScrollTop:0,cate:[],list:[]}},watch:{activeIndex:function(t,e){var n=this;return c(o.default.mark((function e(){var i,s,r;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.getElInfo({size:!0,scrollOffset:!0});case 2:if(i=e.sent,s=i.height,r=i.scrollTop,!(n.leftDomsTop[t]+n.cateItemHeight>s+r)){e.next=7;break}return e.abrupt("return",n.leftScrollTop=n.leftDomsTop[t]+n.cateItemHeight-s);case 7:r>n.cateItemHeight&&(n.leftScrollTop=n.leftDomsTop[t]);case 8:case"end":return e.stop()}}),e)})))()}},onReady:function(){var t=this;this.getElInfo({all:"left",size:!0,rect:!0}).then((function(e){t.leftDomsTop=e.map((function(e){return t.cateItemHeight=e.height,e.top}))})),this.getElInfo({all:"right",size:!1,rect:!0}).then((function(e){t.rightDomsTop=e.map((function(t){return t.top}))}))},methods:a({},(0,i.mapMutations)(["addGoodsToCart"]),{},(0,i.mapActions)(["doSelectAll","doDelGoods","doShowPopup","doHidePopup","updateCartList","addCartList"]),{changeCartNum:function(t,e,n){var o=this;this.addCartList({index:n,num:t,hashKey:e.hashKey}).then((function(t){o.updateCartList()})),0==this.cartlist.length&&(this.showcart=!1,this.shopping=!1,this.specialcard=!1)},clickBtn:function(){this.changenumBtn=!this.changenumBtn},coffeePiecesNumber:function(t,e,n){this.coffeePieces=t,this.newoptions[n].isnum=t,this.changePrice=5*(Math.ceil(t/2)-1)},changeGoodsNumber:function(t){this.goodsNum=t},showAttr:function(){this.showattr=!this.showattr},attrOff:function(){this.coffeePieces=1,this.changePrice=0,this.multiPrice=0,this.currentGoods=[],this.newoptions=[],this.goodsNum=1,this.showattr=!1,this.specialcard=!1},showCart:function(){this.showcart=!this.showcart},cart:function(){this.showcart=!1,this.shopping=!0},off:function(){this.shopping=!1,this.showcart=!0},special:function(){this.specialcard=!this.specialcard},onShow:function(){var t=this;this.currentShop=this.$Util.getCache("current_shop"),this.updateCartList((function(e){e.length>0&&(t.showcart=!0)}))},onLoad:function(){var e=this;this.height=Number(t.getSystemInfoSync().windowHeight)-206,this.$H.post("/mannerdish/goods/goodslist",{},{token:!1}).then((function(t){e.cate=t,e.list=t,e.url=e.$H.common.ul})),this.$nextTick((function(){e.showLoading=!1}))},changeNum:function(t,e){this.currentGoods.num=t},addCart:function(){var e=this,n=this.currentGoods;n["option"]["options"]=this.newoptions,n["checkedSku"]=this.checkedSkus,n["showPrice"]=this.showPrice,n["checked"]=!0,n["num"]=this.goodsNum,this.$H.post("/mannerdish/cart/updateCart",{goods_info:JSON.stringify(this.currentGoods)},{token:!0}).then((function(n){e.hide("attr"),t.showToast({title:"加入成功"}),e.coffeePieces=1,e.changePrice=0,e.multiPrice=0,e.currentGoods=[],e.newoptions=[],e.goodsNum=1,e.showattr=!1,e.specialcard=!1,e.updateCartList(),e.off()}))},hide:function(t){var e=this;this.popup[t]="hide",setTimeout((function(){e.popup[t]="none"}),200)},show:function(t,e){this.goodsIndex=e;var n=this.$Util.deepClone(this.list[t]["goods"][this.goodsIndex]);this.currentGoods=n,this.currentGoods.num=1;var o=this.$Util.deepClone(this.list[t]["goods"][this.goodsIndex]["option"]["options"]);this.specialexist=!1;for(var i=0;i<o.length;i++)console.log("进来了"),1==o[i].isspecial&&(this.specialexist=!0);this.newoptions=o,console.log(this.newoptions),this.showattr=!0,this.showcart=!1},preview:function(t,e){console.log("src: "+t)},navigate:function(t,e){console.log("href: "+t)},getElInfo:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(o,i){var s={size:!!n.size,rect:!!n.rect,scrollOffset:!!n.scrollOffset},r=t.createSelectorQuery().in(e),c=n.all?r.selectAll(".".concat(n.all,"-scroll-item")):r.select("#leftScroll");c.fields(s,(function(t){o(t)})).exec()}))},changeCate:function(t){this.activeIndex=t,this.rightScrollTop=this.rightDomsTop[t]},selectShop:function(){t.navigateTo({url:"../../pages/mannershop/listshop"})},openMap:function(){var e={latitude:parseFloat(this.currentShop.lat),longitude:parseFloat(this.currentShop.lng),name:this.currentShop.address+this.currentShop.name};t.openLocation(e)},selectSimple:function(t,e){this.newoptions[t].selected=e},selectMulti:function(t,e){var n=0,o=[];this.$data.newoptions[t].child[e].selected=this.$data.newoptions[t].child[e].selected?0:1,this.$forceUpdate();for(var i=0;i<this.newoptions.length;i++)if(0==this.newoptions[i].isnum&&1==this.newoptions[i].isspecial&&1==this.newoptions[i].ismulti)for(var s=0;s<this.newoptions[i].child.length;s++)this.newoptions[i].child[s].selected&&(n+=parseFloat(this.newoptions[i].child[s].addPrice),o.push(this.newoptions[i].child[s].name));this.multiAttrStr=o,this.multiPrice=n},submitOrder:function(){this.$Util.setCache("current_order_info",this.cartlist,0),t.navigateTo({url:"../../pages/mannerorder/ordersubmit"})},onRightScroll:function(t){var e=this;return c(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.rightDomsTop.forEach((function(n,o){if(n<t.detail.scrollTop+3)return e.activeIndex=o,!1}));case 1:case"end":return n.stop()}}),n)})))()}})};e.default=x}).call(this,n("543d")["default"])},"5f7b":function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return o}))},"766b":function(t,e,n){"use strict";var o=n("99b7"),i=n.n(o);i.a},"99b7":function(t,e,n){},d0e1:function(t,e,n){"use strict";(function(t){n("4262"),n("921b");o(n("66fd"));var e=o(n("1011"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},d443:function(t,e,n){"use strict";n.r(e);var o=n("333c"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);e["default"]=i.a}},[["d0e1","common/runtime","common/vendor"]]]);