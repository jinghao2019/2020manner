<template>
	<view class="all">
		<view class="discounts">
			<image src="../../static/img/discounts.png" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view class="discounts1 u-f u-f-jsb">
			<view>可用优惠券</view>
			<view>查看失效券</view>
		</view>
		
		<view class="discounts2 u-f-ac">
				<view>去使用</view>
		</view>
		<view class="discounts2 u-f-ac">
				<view>去使用</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style>
	.all{
		background-color: #F3F3F3;
	}
	.discounts{
		padding: 30upx;
	}
	.discounts1{
		padding: 30upx;
	}
	.discounts1>view:first-child{
		font-size: 35upx;
		font-weight: 600;
	}
	.discounts1>view:last-child{
		font-size: 30upx;
		color: #adadad;
		text-decoration-line: underline;
	}
	.discounts2{
		width: 90%;
		height: 150upx;
		border-radius: 10upx;
		background-color: #ffffff;
		margin: auto;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		box-shadow: 0 0 20upx 1upx #dfdfdf;
		margin-top: 20upx;
	}
	.discounts2>view{
		border-radius: 50upx;
		background-color: #830000;
		margin-right: 20upx;
		width: 150upx;
		height: 50upx;
		color: #ffffff;
		font-size: 25upx;
		text-align: center;
	}
</style>
