<template>
	<view>
		<!-- 头部图片 -->
		<image src="../../static/个人.jpg" mode="widthFix" style="width: 100%;"></image>
		<!-- 个人信息 -->
		<view class="name">
			<view class="u-f-ac">
				<view>你好</view>
				<view>小明</view>
			</view>
			<!-- 会员卡样式 -->
			<view class="card">
				<view class="card1 u-f u-f-jsb">
					<view>
						<view>我的订单</view>
					</view>
					<image class="photo" src="../../static/微信用户头像.jpg" mode="widthFix" style="width: 150upx;"></image>
				</view>
				<view class="order u-f">
					<view>						
						<image src="../../static/钱包.png" mode="widthFix" style="width: 60upx;"></image>
						<view>全部</view>
					</view>
					<view>
						<image src="../../static/钱包.png" mode="widthFix" style="width: 60upx;"></image>
						<view>未付款</view>
					</view>
					<view>
						<image src="../../static/钱包.png" mode="widthFix" style="width: 60upx;"></image>
						<view>已付款</view>
					</view>
					<view>
						<image src="../../static/钱包.png" mode="widthFix" style="width: 60upx;"></image>
						<view>退款</view>
					</view>
				</view>
			</view>
			<view class="about">
				<view class="u-f u-f-jsb">
					<view class="u-f">
						<image src="../../static/发票.png" style="width: 50upx;" mode="widthFix"></image>
						<view>发票管理</view>
					</view>
					<image src="../../static/右箭头1.png" style="width: 40upx;" mode="widthFix"></image>
				</view>
				
				<view class="u-f u-f-jsb">
					<view class="u-f">
						<image src="../../static/铃铛.png" style="width: 50upx;" mode="widthFix"></image>
						<view>关于我们</view>
					</view>
					<image src="../../static/右箭头1.png" style="width: 40upx;" mode="widthFix"></image>
				</view>
				
				<view class="u-f u-f-jsb">
					<view class="u-f">
						<image src="../../static/问号.png" style="width: 50upx;" mode="widthFix"></image>
						<view>帮助中心</view>
					</view>
					<image src="../../static/右箭头1.png" style="width: 40upx;" mode="widthFix"></image>
				</view>
			</view>
		</view>
		{{test}}
		<h1 @click="getMachineNum">发起网络请求</h1>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				test:11,
			}
		},
		methods: {
			getMachineNum(){
			    this.sendRequest({
			        url :'orderInfo' + '?'+'order_id=1',
			        success: (res) => {
			        	var data = res.time;
			        	this.test=data;
			        	console.log(data)
			        },
			        fail: (e) => {
			         	console.log("失败");
			        },
			    },'../myhome/myhome','2')
			}
		},
	}
</script>

<style>
.name{
	background-color:#efefef;
	padding-bottom: 40upx;
}
.name>view:first-child{
	padding: 20upx 20upx;
	color: #7c3e00;
}
.name>view:first-child>view:first-child{
	font-size: 35upx;
	font-weight: 600;
}
.name>view:first-child>view:last-child{
	margin: 0 3%;
}
.card{
	background-color:#ffffff;
	border:1upx solid #efefef;
	border-radius: 20upx;
	width: 90%;
	margin: auto;
	/* box-shadow: 0 1upx 10upx 1upx; */
}
.card1{
	position: relative;
	padding: 40upx 0 40upx 0;
}
.card1>view:first-child>view{
	padding-left: 20upx;
	font-size: 35upx;
	font-weight: 600;
}
.photo{
	position: absolute;
	top: -40px;
	left: 70%;
	border-radius:50%
}
.order{
	padding-top: 20upx;
	border-top: 1upx solid #d4d4d4;	
	margin-bottom: 40upx;
}
.order>view{
	margin-left:11%;
}
.about{
	background-color: #ffffff;
	padding: 40upx 0 40upx 0;
	border-radius: 20upx;
	width: 90%;
	margin: 40upx auto;
/* 	box-shadow: 0 1upx 10upx 1upx; */
}
.about>view{
	margin: 0 20upx;
	margin-top: 30upx;
}
.about>view>view>view:last-child{
	margin-left: 10upx;
}
</style>
