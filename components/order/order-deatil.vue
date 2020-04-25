<template>
	<view class="orderdetail">
		<template>
			<view class="headtitle" v-show="info.status==1">
				等待付款
			</view>	
			<view class="headtitle" v-show="info.status==2">
				下单成功
			</view>		
			<view class="headtitle" v-show="info.status==3">
				等待制作
			</view>
			<view class="headtitle" v-show="info.status==4">
				开始制作
			</view>
			<view class="headtitle" v-show="info.status==5">
				待取餐
			</view>
			<view class="headtitle" v-show="info.status==6">
				已完成
			</view>		
		</template>
		
		<view class="info">
			<template>
				<view v-show="info.status==1">
					等待付款
				</view>	
				<view v-show="info.status==2">
					下单成功
				</view>		
				<view v-show="info.status==3">
					等待制作
				</view>
				<view v-show="info.status==4">
					开始制作
				</view>
				<view v-show="info.status==5">
					待取餐
				</view>
				<view v-show="info.status==6">
					已完成
				</view>
			</template>
			<view class="cancel u-f-ajc">取消订单</view>
			<view class="u-f-ajc">
				<image src="../../static/电话.png" mode="widthFix" style="width: 45upx;margin-right: 10upx;"></image>
				<view>联系商家</view>
			</view>			
		</view>
		<view class="info1">
			<view class="u-f">
				<view>大洋百货店</view>
				<image src="../../static/letright1.png" mode="widthFix" style="width: 45upx;"></image>
			</view>
			<block v-for="(item,index) in goodslist" :key="index">
				<view class="goods u-f u-f-jsb">
					<view class="u-f"> 
						<image :src="item.goodsimg" mode="widthFix" style="width: 140upx;border-radius: 10upx;"></image>
						<view class="goodsname">{{item.goodsname}}</view>
					</view>
					<view style="color: #afafaf;">
						<view>加冰</view>
						<view>大杯</view>
						<view>糖浆</view>
					</view>
					<view class="price">
						<view>￥{{item.goodsprice}}</view>
						<view>×{{item.goodsnum}}</view>
					</view>					
				</view>
			</block>
					
			<view class="smallprice u-f">
				<view>共{{info.allnum}}商品</view>
				<view>小计</view>
				<view>￥{{info.allprice}}</view>
			</view>
			
		</view>
		<view class="info2">
			<view>取餐信息</view>
			<view class="u-f u-f-jsb">
				<view>订单类型</view>
				<view v-if="info.ordertype==0">到店取餐</view>
				<view v-else>外卖</view>
			</view>
			<view class="u-f u-f-jsb">
				<view>取货码</view>
				<view>{{info.pwd}}</view>
			</view>
			<view class="u-f u-f-jsb">
				<view>商家地址</view>
				<view>{{info.shopaddress}}</view>
			</view>
			<view style="margin-left: 80%;">{{info.shopname}}</view>
			<view class="u-f u-f-jsb">
				<view>预留电话</view>
				<view>{{info.shoptel}}</view>
			</view>
		</view>
		<view class="info3">
			<view>订单信息</view>
			<view class="u-f u-f-jsb">
				<view>订单号码</view>
				<view class="u-f">
					<view>{{info.ordernum}}</view>
					<view class="copy u-f-ajc">复制</view>
				</view>
			</view>
			<view class="u-f u-f-jsb">
				<view>下单时间</view>
				<view class="u-f">
					<view>{{info.orderdate}}</view>
					<view class="time">{{info.ordertime}}</view>
				</view>
			</view>
			<view class="u-f u-f-jsb">
				<view>支付方式</view>
				<view>{{info.pay}}</view>
			</view>
		</view>
		<!-- 支付按钮 -->
		<view class="pay u-f u-f-jsb" v-show="info.status==1">
			<view class="u-f u-f-ajc">
				<view>合计</view>
				<view>0.2</view>元
			</view>
			<view class="u-f-ajc">立即支付</view>
		</view>

	</view>
</template>

<script>
	export default {
		props:{
			info:Object,
			goodslist:Array
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.orderdetail{
	width: 100%;
	height: 100%;
	padding: 20upx 0;
	background-color: #eef1f5;
}

.pay{
	width: 100%;
	position: fixed;
	/* top:84%; */
	bottom: 0;
	left: 0;
	right: 0;
	height: 54px;
	z-index: 197;
}
.pay>view:first-child{
	background-color: rgba(53, 53, 53, 209);
	color: white;
	flex: 3;
}
.pay>view>view:first-child{
	
	margin: 0 20upx 0 50%;

	}
.pay>view:last-child{
	background-color: #550000;
	color: white;
	flex: 1;
}
.headtitle{
	font-size: 40upx;
	font-weight: 600;
	margin-left: 5%;
	margin-bottom: 20upx;
}
.info{
	width: 80%;
	border-radius: 20upx;
	background-color: white;
	padding: 30upx;
	margin: 20upx auto;
}
.info>view:first-child,
.info1>view:first-child,
.info2>view:first-child,
.info3>view:first-child{
	font-size: 30upx;
	font-weight: 600;
	border-bottom: 1upx solid #d6d6d6;
}

.cancel{
	border: 1upx solid #b4b4b4;
	border-radius: 10upx;
	width: 170upx;
	height: 70upx;
	margin: 30upx 0;
}
.info>view:last-child{
	font-size: 35upx;
	border-top: 1upx solid #e8e8e8;
	padding-top: 20upx;
}
.info1{
	width: 80%;
	border-radius: 20upx;
	background-color: white;
	padding: 30upx;
	margin: 20upx auto;
}
.info1>view:first-child{
	margin-bottom: 20upx;
}
.goods{
	margin: 20upx 0;
}
.goodsname{
	font-size: 30upx;
	font-weight: 600;
	margin: 0 30upx;
}
.price>view:first-child{
	font-size: 30upx;
	font-weight: 600;
}
.price>view:last-child{
	color: #ababab;
}
.pack>view:first-child{
	border: 1upx solid #b5b5b5;
	border-radius: 10upx;
	font-size: 25upx;
	background-color: #e8e8e8;
	color: #b5b5b5;
	width: 70upx;	
	height: 40upx;
}
.pack>view:last-child{
	font-size: 30upx;
	margin: 0 20upx;
	height: 40upx;
}

.packaging{
	margin: 30upx 0;
}
.smallprice>view:first-child{
	margin-left: auto;
	margin-right: 20upx;
}
.smallprice>view:last-child{
	margin-left: 20upx;
	font-size: 30upx;
	font-weight: 600;
}
.info2{
	width: 80%;
	border-radius: 20upx;
	background-color: white;
	padding: 30upx;
	margin: 20upx auto;
}
.info2>view,
.info3>view{
	margin: 10upx 0;
}
.info2>view>view:first-child,
.info3>view>view:first-child{
	color: #b5b5b5;
}
.info3{
	width: 80%;
	border-radius: 20upx;
	background-color: white;
	padding: 30upx;
	margin: 20upx auto 100upx auto;
}
.copy{
	border: 1upx solid #bababa;
	color: #b9b9b9;
	border-radius: 10upx;
	margin-left: 20upx;
	width: 80upx;
}
.time{
	margin-left: 20upx;
}
</style>
