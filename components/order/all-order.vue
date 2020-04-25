<template>
	<view class="allorder u-f-ajc">
		<!-- 单个订单 -->
		<view class="order">
			<view class="u-f-ajc u-f-jsb">
				<view class="name u-f-ajc">
					<view>{{item.shopname}}</view>
					<image class="" src="../../static/letright.png" mode="widthFix" style="width: 40upx;margin-left: 6upx;"></image>
				</view>									

				<view v-if="item.status==1">待取餐</view>
				<view v-if="item.status==2">已支付</view>
				<view v-if="item.status==3">待支付</view>
				<view v-if="item.status==4">已完成</view>
				<view v-if="item.status==5">已取消</view>
			</view>
			
			<view class="time u-f-ac">
				<view>{{item.date}}</view>
				<view>{{item.time}}</view>
			</view>
			<view class="goods u-f-ajc u-f-jsb">
				<view>{{item.goodsname}}等  {{item.allnum}} 件商品</view>
				<view>￥{{item.allprice}}</view>
			</view>
			<view class="status u-f-ajc u-f-jsb">
				<view class="u-f-ajc">
					<image src="../../static/商店.png" mode="widthFix" style="width: 40upx;"></image>
					<view>自提订单</view>
				</view>										
				<view class="u-f-ajc">
					<view class="u-f-ajc">取消订单</view>
					<view class="u-f-ajc" v-if="item.status==3">立即支付</view>
					<view class="tag u-f-ajc" v-if="item.status==1" @click="detail()">取餐码</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,		
		},
		methods:{
			// 点击跳转订单详情			
			detail(){
				uni.navigateTo({
					url:'../../pages/mannerorder/mannerdetail'
				})
			}
		},		
	}
</script>

<style>
	.allorder{
		width: 100%;
		background-color: #ebebeb;
		padding-top: 40upx;
	}
	.order{
		width: 80%;
		background-color: #ffffff;
		padding: 0 50upx 20upx 50upx ;
		border-radius: 30upx;
	}
	.name>view,.name>image{
		font-size: 35upx;
		font-weight: 600;
		margin-top: 20upx;
	}
	.order>view:first-child>view:last-child{
		font-size: 35upx;
		font-weight: 600;
		color: #550000;
		margin-top: 20upx;
	}
	.time{
		color: #aaaaaa;
	}
	.time>view:last-child{
		margin-left: 10upx;
	}
	.goods{
		margin-top: 40upx;
		color: #6a6a6a;
	}
	.goods>view:last-child{
		font-size: 35upx;
		font-weight: 600;
		color: #ff0000;
	}
	.status{
		margin-top: 40upx;
		
	}
	.status>view:first-child>view:last-child{
		color: #550000;
		margin-left: 10upx;
	}
	.status>view:last-child>view:first-child{
		width: 150upx;
		height: 70upx;
		border-radius: 10upx;
		border: 1upx solid #b6b6b6;
	}
	.status>view:last-child>view:last-child{
		width: 150upx;
		height: 70upx;
		border-radius: 10upx;
		border: 1upx solid #550000;
		margin-left: 10upx;
		background-color: #7f0000;
		color: #ffffff;
	}
	
	.tag{
		z-index: 2020;
	}
	
</style>
