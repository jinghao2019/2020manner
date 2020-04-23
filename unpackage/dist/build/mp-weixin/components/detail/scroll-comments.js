(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/detail/scroll-comments"],{"0b82":function(t,e,n){"use strict";n.r(e);var o=n("e877"),r=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=r.a},"22a5":function(t,e,n){"use strict";n.r(e);var o=n("ffcd"),r=n("0b82");for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);var a,i=n("f0c5"),c=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=c.exports},e877:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(n("e414"));function r(t){return t&&t.__esModule?t:{default:t}}var u={props:["comments","goods_id"],filters:{formatTime:function(t){return o.default.gettime(t)}},methods:{open:function(){t.navigateTo({url:"/pages/detail-comment/detail-comment?id="+this.goods_id})}}};e.default=u}).call(this,n("543d")["default"])},ffcd:function(t,e,n){"use strict";var o,r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.comments,(function(e,n){var o=t._f("formatTime")(e.create_time);return{$orig:t.__get_orig(e),f0:o}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},u=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/detail/scroll-comments-create-component',
    {
        'components/detail/scroll-comments-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("22a5"))
        })
    },
    [['components/detail/scroll-comments-create-component']]
]);
