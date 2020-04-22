<template>
	<view class="all animated bounceInRight">
		<view class="title">
			<image src="../../static/img/我的1.png" mode="widthFix" style="width: 100%;"></image>
		</view>
		
		<view class="card">
			<!-- 卡片上部 -->
			<view class="u-f u-f-jsb card1">
				<view class="u-f">
					<view>
						<!-- 头像 -->
						<image src="../../static/img/用户头像.png" mode="widthFix" style="width: 100upx;margin-right: 20upx;"></image>
					</view>
					<view>
						<!-- 用户名 -->
						<view>童烨 Laura</view>
						<!-- 用户等级 -->
						<view style="color: #a5a5a5;">初级会员</view>
					</view>
				</view>
				<view>
					<!-- 二维码缩略图 -->
					<image src="../../static/img/缩略二维码.png" mode="widthFix" style="width: 60upx;"></image>
				</view>
			</view>
			<!-- 卡片下部 -->
			<view class="u-f u-f-jsb card2">
				<view>
					<view>会员积分</view>
					<view>335</view>
				</view>
				<view>
					<view>钱包余额</view>
					<view>200</view>
				</view>
				<view @click="discounts()">
					<view>优惠券</view>
					<view>2</view>
				</view>
			</view>
		</view>
		
		<view class="u-f u-f-jsb list order" @click="order">
			<view>订单管理</view>
			<view><image src="../../static/右箭头1.png" mode="widthFix" style="width: 40upx;"></image></view>
		</view>
		
		<view class="u-f u-f-jsb list middle">
			<view>会员资料</view>
			<view><image src="../../static/右箭头1.png" mode="widthFix" style="width: 40upx;"></image></view>
		</view>
		<view class="u-f u-f-jsb list middle" @click="address">
			<view>地址簿</view>
			<view><image src="../../static/右箭头1.png" mode="widthFix" style="width: 40upx;"></image></view>
		</view>
		<view class="u-f u-f-jsb list">
			<view>自定义菜单</view>
			<view><image src="../../static/右箭头1.png" mode="widthFix" style="width: 40upx;"></image></view>
		</view>
		
		<view class="u-f u-f-jsb list manner">
			<view>客服与反馈</view>
			<view><image src="../../static/右箭头1.png" mode="widthFix" style="width: 40upx;"></image></view>
		</view>
		<view class="u-f u-f-jsb list">
			<view>关于manner</view>
			<view><image src="../../static/右箭头1.png" mode="widthFix" style="width: 40upx;"></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods:{
			// 点击跳转订单详情
			order(){
				uni.switchTab({
				    url: '/pages/mannerorder/mannerorder'
				});
			},
			// 点击跳转订单详情
			address(){
				uni.navigateTo({
				    url: '/pages/addressList/addressList'
				});
			},
			discounts(){
				uni.navigateTo({
					url: '/pages/discounts/discounts'
				})
			}
		}
	}
</script>

<style>
	.all{
		background-color: #f5f5f5;
		position: relative;
	}
	.list{
		height: 100upx;
		padding: 0 60upx;
		margin: auto;
		background-color: #ffffff;
		display: flex;
		align-items: center;
	}
	.title{
		margin-bottom: 270upx;
	}
	.card{
		position: absolute;
		top: 140upx;
		left: 40upx;
		background-color: #ffffff;
		box-shadow: 0 1upx 10upx 5upx #cccccc;
		border-radius: 10upx;
		width: 80%;
		padding: 40upx;
	}
	.card1{
		border-bottom: 1upx solid #c8c8c8;
		padding-bottom: 20upx;
	}
	.card2>view>view:first-child{
		margin-top: 20upx;
		color:#610000;
		font-weight: 600;
	}
	.card2>view>view:last-child{
		display: flex;
		justify-content: center;
		font-weight: 600;
	}		
	.order{
		margin-bottom: 20upx;
	}
	.middle{
		
	}
	.manner{
		margin-top: 20upx;
	}
</style>
