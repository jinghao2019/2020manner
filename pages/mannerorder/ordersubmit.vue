<template>
	<view class="all">	
		<view class="info">			
			<view class="u-f u-f-jsb">
				<view class="info1">订单结算</view>
				<view class="info2"></view>
			</view>
			<view class="read">请仔细确认下单门店,下单后无法更改</view>
			<view class="infoshop u-f">
				<view>{{currentShop.name}}</view>
				<view><image src="../../static/右箭头1.png" style="width: 40upx;margin: 8upx 0 0 0;" mode="widthFix"></image></view>
			</view>
			
			<view class="address">{{currentShop.address}}</view>	
			
						
		</view>	
		
		<view class="info">
			<view class="orderdetail" style="margin-top: 20upx;font-size: 32upx;font-weight: 600;">订单详情</view>
			
			<block v-for="(item,index) in orderInfo" :key="index">
				<view class="infogoods">{{item.title}}</view>
				<view class="u-f">
					<view class="infoguige">{{item.checkedSku}}</view>
					<view class="infonum">x{{item.num}}</view>
					<view class="price">￥{{item.num * item.showPrice}}</view>
				</view>
			</block>
			
			
		
			<view class="allprice u-f u-f-jsb">
				<view></view>
				<view>总价:￥{{totalPrice}}</view>
			</view>
		</view>
		
		
		<view class="foot">
			<view class="u-f u-f-jsb">
				<view>优惠券</view>
				<view>暂无可用优惠券<image src="../../static/右箭头1.png" style="width: 40upx;margin: 25upx 0 0 0;" mode="widthFix"></image></view>
			</view>
			<view class="u-f u-f-jsb">
				<view>支付方式</view>
				<view>微信支付<image src="../../static/右箭头1.png" style="width: 40upx;margin: 25upx 0 0 0;" mode="widthFix"></image></view>
			</view>
		</view>		
		<view class="foot">
			<view class="u-f u-f-jsb">
				<view>打包</view>
				<view>是<image src="../../static/右箭头1.png" style="width: 40upx;margin: 25upx 0 0 0;" mode="widthFix"></image></view>
			</view>
			<view class="u-f u-f-jsb">
				<view>特殊备注</view>
				<view><image src="../../static/右箭头1.png" style="width: 40upx;margin: 25upx 0 0 0;" mode="widthFix"></image></view>
			</view>
			
		</view>
		<view style="background-color: #EBEBEB;padding: 10upx 40upx;font-size: 20upx;color: #4A4A4A;">我已阅读并同意我已阅读并同意我已阅读并同意我已阅读并同意我已阅读并同意我已阅读并同意我已阅读并同意</view>
		<view class="bottom u-f u-f-jsb">
			<view class=" u-f-ajc u-f-ac">
				总计:{{totalPrice}}
			</view>
			<view  class="pay u-f-ajc u-f-ac" @click="openPayMethods()">
				支付
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			onLoad(){
				var that = this;
				//1 取出订单缓存数据 放到data里面
				this.orderInfo = this.$Util.getCache("current_order_info");
				//2 取出当前店铺放到头部店铺信息
				this.currentShop = this.$Util.getCache('current_shop');
				//取出订单数据hashKey
				this.orderInfo.map(v => {
					this.hashKey.unshift(v.hashKey)
				})
				
				// #ifdef MP-WEIXIN
				this.options = [{
					title:"微信支付",
					note:"推荐使用微信支付",
					icon:"icon-weixinzhifu text-success",
					value:"wxpay"
				}]
				this.payMethod = 'wxpay'
				// #endif
			},
			/**
			 * 拉起微信支付
			 */
			pullWeiXinPay(res){
				var that = this
				// 跳转到支付页面
				uni.login({
					success: (e) => {
						this.$H.get('/mannerdish/pay/payment?order_id='+res.order_id+'&code='+e.code,{},{
							token:true,
							native:true
						})
						.then(res=>{
							// 发起小程序支付
							/*
							{
								appId:"wxb1f305de99c0fe32",
								nonceStr:"ZM7mqDUe5wYVpz1h",
								package:"prepay_id=wx31215725257777f851bd31661280875100",
								paySign:"2114A262F841E9A8080972A0D5C6E7F7",
								signType:"MD5",
								timeStamp:"1577800644"
							}
							*/
						   let paymentData = res.data.data;
						   uni.requestPayment({
						       timeStamp: paymentData.timeStamp,
						       nonceStr: paymentData.nonceStr,
						       package: paymentData.package,
						       signType: 'MD5',
						       paySign: paymentData.paySign,
						       success: (res) => {
						           // 重定向/防止重复支付
						           uni.redirectTo({
						           	// url: '../mannerorder/ordertoday?order_id='+that.$data.order_id
									url: '/pages/mannerorder/ordertoday'
						           });
						           console.log('success:' + JSON.stringify(res));
						       },
						       fail: (res) => { //支付失败
								   this.callDelayCancel(); 
						           uni.showModal({
						               content: "支付失败,原因为: " + res
						                   .errMsg,
						               showCancel: false
						           })
						       },
						       complete: () => {
						           this.loading = false;
						       }
						   })
						})
						.catch(err=>{ //支付失败
							this.loading = false
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							});
						})
					},
					fail: (e) => {
						console.log("fail", e);
						//用户取消的时候我们进行一个定时消单操作这个时候要请求后台
						this.callDelayCancel(); 
						this.loading = false;
						uni.showModal({
						    content: "支付失败,原因为: " + e.errMsg,
						    showCancel: false
						})
					}
				})
			},
			
			// 下单，支付
			openPayMethods(){
				var that = this;
				// 防止重复下单
				if(this.loading) return;
				let options = {
					hashKey:this.hashKey.join(','),
					flag:'cartPay', //表示从购物车进行支付
					currentShopName:this.currentShop.name,
					currentShopId:this.currentShop.id
				}
				// 是否选择优惠券
				if(this.coupon.id > 0){
					options.coupon_user_id = this.coupon.id
				}
				//在这里加一把锁
				this.loading = true
				//如果是第一次支付
				if(!this.order_id || !this.order_sn )
				{
					this.$H.post('/mannerdish/order/orderSubmit',options,{
						token:true
					}).then(res=>{
						that.$data.order_id = res.order_id
						that.$data.order_sn = res.order_id
						that.$data.order_result = res
						this.loading = false
						// // 通知购物车更新数据
						// uni.$emit('updateCart')
						return res;
					}).then(res=>{  //创建订单后拉取支付
						this.pullWeiXinPay(res)
					}).catch(err=>{
						this.loading = false
						console.log(err);
						uni.showToast({
							title: '创建订单失败',
							icon: 'none'
						});
					})
				}else{ //如果已经生成订单直接拉取支付
					this.pullWeiXinPay(this.$data.order_result)
				}
				
			},
		
		    //请求后台进行订单延迟取消
			callDelayCancel(){
				//拼接退单数据
				let data = {
					'order_id' : this.order_result.order_id,
					'order_sn' : this.order_result.order_sn
				}
				//请求退单接口
				this.$H.post('/mannerdish/order/orderDelayCancel',data,{
					token:true
				}).then(res=>{
					console.log(res+"测试")
				}).catch(err=>{
					this.loading = false
					console.log(err);
					uni.showToast({
						title: '取消订单失败',
						icon: 'none'
					});
				})
			}
		},	
	
		computed: {
			// 显示价格
			totalPrice(){
				let price = 0;
				for(let i = 0;i<this.orderInfo.length;i++)
				{
				    price += parseFloat(this.orderInfo[i].num * this.orderInfo[i].showPrice)
				}
				
				//规格价格
				return price;
				//下面可能会加上浓缩份数的价格
			},
		},
		data(){
			return{
				loading:false,
				//订单缓存数据
				orderInfo:[],
				//该订单的总价
				total_price:45,
				currentShop:{},
				couponCount:0,
				coupon:{
					id:0,
					type:0,
					value:0
				},
				order_id:0,
				order_sn:"",
				hashKey:[],
				payMethod:"alipay",
				options:[],
				order_result:{}
			}
		},
	}
</script>

<style>
.read{
	color: #88272E;
	font-size: 28upx;
	font-weight: 600;
	padding: 10upx 20upx;
	box-shadow:0 0 10px #ebebeb;
	width: 500upx;
	border-radius: 20upx;
	}
.tag{
	display: flex; 
	margin: auto;
	width: 90%;
}
.tel{
	border-bottom: 1upx solid #ebebeb;
	padding-bottom: 20upx;
}
.address{
	color: #7c7c7c;
	font-size: 25upx;
	line-height: 35upx;
	margin-bottom: 20upx;
}
.allprice{
	width: 100%;
	border-bottom: 1upx solid #ebebeb;
}
.allprice>view:last-child{
	margin-right: 10upx;
}
.allprice>view{
	border-bottom: 1upx solid #ebebeb;
}
.all{
	background-color: #F3F3F3;
	height: 100%;
}
.order{
	color: #4A4A4A;
}
.order>view>view:last-child{
	margin-left: 10upx;
}
.orderdetail{
	font-size: 30upx;
}
.info,.orderinfo,.foot{
	padding: 20upx 50upx 0 50upx;
	background-color: white;
	margin-top: 30upx;
}
.info>view:first-child{
	margin-top: 40upx;
}
.info1{
	font-family: Microsoft YaHei;
	font-size: 35upx;
	font-weight: 600;
}
.info2{
	color: #89262C;
	font-weight: 600;
}
.infoshop{
	margin-top: 20upx;
	color: #4A4A4A;
	font-weight: 600;
}
.infoguige{
	font-size: 25upx;
	color: #b4b4b4;
}
.infonum{
	margin-left: 10upx;
	font-size: 25upx;
}
.infogoods{
	margin-top: 20upx;
	font-weight: 600;
	color: #4A4A4A;
}
.price{
	margin-left: 40upx;
}
.allprice>view:last-child{
	font-size: 35upx;
	font-weight:600;	
	padding-bottom: 40upx;
}
.orderinfo>view>view{
	font-size: 28upx;
	color: #8a8a8a;
	margin-top: 10upx;
}
.foot{
	margin-top: 30upx;
	color: #4A4A4A;
}
.foot>view>view:first-child{
	margin: 20upx 0;
}
.foot image{
	margin-top: 30upx;
}
.again{
	width: 646upx;
	height: 110upx;
	background-color: #88272E;
	color: white;
	border-radius: 80upx;
	margin: 0 auto;
	font-size: 36upx;
	margin-bottom: 80upx;
}
.bottom{
	background-color: #ffffff;
	margin-bottom: 0;
	padding: 40upx 40upx;
}
.pay{
	color: #ffffff;
	background-color: #88272E;
	font:36upx;
	width: 244upx;
	height: 80upx;
	font-size: 36upx;
	border-radius: 50upx;
}
.infoguige{
 flex: 4;
}
.infonum{
 flex: 1;
}
.infoprice{
 flex: 1;
}
</style>
