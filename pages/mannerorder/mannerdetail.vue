<template>
	<view>
		<view class="all" :class="{blur:Blur}">
			<view class="head" v-if="status === 0">
				待支付
			</view>
			<view class="u-f u-f-jsb head" v-if="status === 2">
				<view>自提订单</view>
				<view>已完成</view>
			</view>
			<view class="parent" v-if="status === 1 || status === 2" style="width: 100%;" @click="numbershow()" >
				<image class="tag" src="../../static/img/取餐码.png" mode="widthFix"></image>
				<view class="number">{{orderdetail.dish_code}}</view>
			</view>
			
			<view class="mask"  v-show="show" @click="numberhiden()"></view>
			<view class="info">			
				<!-- <view v-if="status === 0" class="u-f u-f-jsb">
					<view class="info1">自提订单</view>
					<view class="info2">待支付</view>
				</view> -->
				<!-- <view v-else-if="status === 2" class="u-f u-f-jsb">
					<view class="info1">自提订单</view>
					<view class="info2">待取餐</view>
				</view> -->
				<!-- <view v-else-if="status === 1" class="u-f u-f-jsb">
					<view class="info1">自提订单</view>
					<view class="info2">已完成</view>
				</view> -->
				<view class="infoshop u-f">										
						<view>{{orderdetail.orderstore.name}}</view>								
					<view><image src="../../static/右箭头1.png" style="width: 40upx;margin: 8upx 0 0 0;" mode="widthFix"></image></view>
				</view>
				<view class="address">{{orderdetail.orderstore.address}}</view>
				<view class="tel">取餐预留电话:13849929503</view>
				
				<block v-for="(item,index) in orderdetail.orderproduct" :key="index">
					<view class="infogoods">{{item.goods_name}}</view>
					<view class="u-f">
						<view class="infoguige">{{item.sku_str}}</view>
						<view class="infonum">x{{item.total}}</view>
						<view class="price">￥{{item.price}}</view>
					</view>
				</block>
				
				<view class="allprice u-f u-f-jsb">
					<view></view>
					<view class="u-f">
						<view style="font-size: 22upx;color: #9B9B9B;margin-top: 10upx;margin-left: 16upx;display: block;">总计:
						</view>
						<view style="font-size: 32upx;color: #4A4A4A;">￥{{orderdetail.total_price}}</view>
					</view>
				</view>
				<view class="order">
					<view class="u-f">
						<view>订单编号:</view>
						<view>{{orderdetail.order_sn}}</view>
					</view>
					<view class="u-f" v-if="status === 1 || status === 2">
						<view>支付时间:</view>
						<view>{{orderdetail.pay_time}}</view>
					</view>
					<view class="u-f" v-if="status === 2">
						<view>完成时间:</view>
						<view>{{orderdetail.confirm_time}}</view>
					</view>
					<view class="u-f">
						<view>支付方式:</view>
						<view v-if="pay_type === 1">余额</view>
						<view v-else-if="pay_type === 2">微信支付</view>
					</view>		
				</view>			
			</view>			
			<view class="foot">
				<view class="u-f u-f-jsb">
					<view>自助开票</view>
					<view><image src="../../static/右箭头1.png" style="width: 40upx;margin: 12upx 0 0 0;" mode="widthFix"></image></view>
				</view>
				<view class="u-f u-f-jsb">
					<view>客服与帮助</view>
					<view><image src="../../static/右箭头1.png" style="width: 40upx;margin: 12upx 0 0 0;" mode="widthFix"></image></view>
				</view>
			</view>
			<view class="close u-f-ajc">取消订单</view>
			<view v-if="status === 0" class="again u-f-ajc u-f-ac">
				去支付
			</view>
			<!-- <view v-else-if="status === 1 || status === 2" class="again u-f-ajc u-f-ac" @click="openMannerList()">
				再来一单
			</view> -->
			<view v-else-if="status === 0" class="again u-f-ajc u-f-ac" @click="openMannerList()">
				去支付
			</view>
		</view>
		<!-- 取餐码弹框 -->
		<view v-show="show">
			<view class="numbershow">
				<image src="../../static/img/numbershow.png" mode="widthFix" style="width: 600upx;border-radius: 20upx;"></image>
			</view>			
			<view class="bignumber">{{orderdetail.dish_code}}</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		//定义过滤器
		filters:{
			dateFormat(value){		
				var newDate = new Date(value);
				
				console.log(newDate.format('yyyy-MM-dd'));
			}
		},
		methods:{
			// 点击跳转订单详情			
			openMannerList(){
				
				uni.switchTab({
					url:'../../pages/mannerlist/mannerlist',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			//点击显示大图取餐码的事件
			numbershow(){
				this.show=true;
				this.Blur=true;
			},
			//点击隐藏大图取餐码的事件
			numberhiden(){
				this.show=false;
				this.Blur=false;
			},
		},	
		data(){
		
			return{
				Blur:false,
				// 蒙版
				show:false,
				status:0,//3取消(已关闭),0未支付,1已支付(取餐码),2已完成
				//订单号
				order_sn:"10002934921098209",
				//支付时间
				pay_time:"2020-03-02 11:56",
				//核销时间
				confirm_time:"2020-03-02 11:56",
				shopname:"南阳路店",
				shopaddress:"上海静安南阳路205号",
				tel:"135*****6789",
				//支付方式1:余额,2:微信
				pay_type:2,
				total_price:45,
				//该订单的总价
				number:1680,
				orderDetail:[{					
					goods:"澳式白咖啡",
					//该单品规格
				    taste:{
						"attrs_size":0,
						"attrs_ice":0,
						"attrs_milk":0,
						"attrs_concentration":0.5,
						"attrs_sugers":0,
						 },
					//单品的总价钱						 
					price:45,										
				}],
				orderdetail:{}
			}
		},
		onLoad() {

		},
		onShow() {
			this.orderdetail = this.$Util.getCache("now_order_detail");
			this.status = this.orderdetail.status;
			this.pay_type = this.orderdetail.pay_type;
		}
		
	}
</script>

<style>
.head{
	color: #4A4A4A;
	font-size: 28upx;
	font-weight: 300;
	padding: 22upx 0 0 52upx;

}
.head>view:first-child{
	font-size: 32upx;
	font-weight: 600;
}
.head>view:last-child{
	font-size: 28upx;
}
.parent{
	 position: relative;	 
}
.tag{
	z-index: 1000;
	display: flex; 
	margin: auto;
	width: 90%;
}
.number{
	position: absolute;
	margin-top: -140upx;
	margin-left: 250upx;
	color: white;
	font-size: 80upx;
	z-index: 2000;
	display: flex; 
}
.tel{
	border-bottom: 1upx solid #ebebeb;
	padding-bottom: 20upx;
}
.tel,.address{
	color: #7c7c7c;
	font-size: 25upx;
	line-height: 35upx;
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
	padding: 40upx 0;
}
.order>view>view:last-child{
	margin-left: 10upx;
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
.again{
	width: 646upx;
	height: 110upx;
	color: white;
	border-radius: 10upx;
	margin: 0 auto;
	font-size: 36upx;
	margin-bottom: 80upx;
	background: -webkit-linear-gradient(left,#DB2C24,#79041C);
}
.infoguige{
 flex: 5;
}
.infonum{
 flex: 2;
}
.infoprice{
 flex: 2;
}
.close{
	width: 136upx;
	height: 62upx;
	font-size: 28upx;
	color: #9B9B9B;
	margin: 0 auto;
	margin-top: 20upx;
	padding-bottom: 40upx;
	text-decoration:underline;
}
.numbershow{
	position: fixed;
	z-index: 2003;
	width: 100%;
	top: 20%;
	left: 10%;
}
.mask{
	width: 100%;
	height: 100%;
	z-index: 2002;
	position: fixed;
	background-color: rgba(222, 222, 222, 0.6);
	top: 0;
}
.bignumber{
	z-index: 2004;
	position: fixed;
	top: 30%;
	left: 30%;
	color: white;
	font-size: 80upx;
}
.blur{
	  -webkit-filter: blur(5px); /* Chrome, Opera */
       -moz-filter: blur(5px);
        -ms-filter: blur(5px);    
            filter: blur(5px);

}
/* .mask{
	 position:fixed;
	 top     : 0;
	 left    : 0;
	 bottom  : 0;
	 right   : 0;
	 background:rgba(0,0,0,0.8);
} */

</style>
