<template>
	<view style="height: 100%;background-color: #F0F2F5;">
		<!-- 订单中心 -->
		<view class="u-f u-f-jsb head">
			<view class="u-f">
				<view style="font-size: 40upx;color: red;font-weight: 600;">Manner.</view>
				<view style="font-size: 38upx;font-weight: 600;">今日</view>
			</view>
			<view class="u-f" style="margin-top: 16upx;" @click="toallorder()">
				<view>全部订单</view>
				<image src="../../static/icon/right.png" mode="widthFix" style="width: 15upx;margin-top: 18upx;margin-left: 10upx;"></image>
			</view>
		</view>
		<scroll-view scroll-y style="height: 100%;background-color: #F0F2F5;padding: 0 0 10px 0;">
			<view class="allorder  animated bounceInRight">
			<block v-for="(item,index) in listorder" :key="index">
				<view class="order">
					<view class="u-f u-f-jsb">
						<view>
							<view style="font-size: 28upx;color: #4A4A4A;">{{item.orderstore.name}}自提</view>
							<view class="u-f">
								<view style="font-size: 24upx;color: #4A4A4A;" >{{item.date}}</view>
								<view style="font-size: 24upx;color: #4A4A4A;margin-left: 10upx;" >{{item.time}}</view>
							</view>
						</view>
						<view class="u-f" v-if="item.status === 1">
							<view class="key">取餐码</view>
							<view style="font-size: 52upx;
							color: #88272E;
							margin-right: 26upx;">{{item.dish_code}}
							</view>
						</view>
						<view  class="u-f" v-if="item.status === 0" 
						style="font-size: 28upx;
							color: #4A4A4A;
							margin-right: 26upx;">待支付
						</view>
						<view  class="u-f" v-if="item.status === 2"
						style="font-size: 28upx;
							color: #4A4A4A;
							margin-right: 26upx;">已完成
						</view>
						<view  class="u-f" v-if="item.status === 3"
						style="font-size: 28upx;
							color: #4A4A4A;
							margin-right: 26upx;">已取消
						</view>
					</view>
					<view>
						<block v-for="(item2,index) in item.orderproduct" :key="index">
							<image :src="url + item2.goods_img" mode="widthFix"></image>
						</block>
						
					</view>
					<view class="u-f foot">
						<view style="flex: 1;">共{{item.total_num}}件商品</view>
						<view style="flex: 1;" class="u-f">
							<view>实付￥</view>
							<view style="font-size: 32upx;margin-top: -4upx;">{{item.total_price}}</view>
						</view>
						<view  v-if="item.status === 1||item.status === 2||item.status === 3">再来一单</view>
						<view v-if="item.status === 0">去支付</view>
					</view>
				</view>
			</block>				
		</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				url:'',
				listorder:[]
			}
		},
		onShow() {
			this.getData();
			this.url = this.$H.common.ul;
		},
		methods:{
			onLoad(){
			},
			toallorder(){
				uni.navigateTo({
					    url: '../../pages/mannerorder/allorder',			
				});
			},
			getData(){
				var that = this
				this.$H.get('/mannerdish/order/todayorder',{},{
					token:true,
					native:true
				}).then(res=>{
					console.log(res.data.data)
					that.$data.listorder = res.data.data
				}).catch(err=>{ //支付失败
					this.loading = false
					uni.showToast({
						title: '支付失败',
						icon: 'none'
					});
			    })
			}
		},
	}
</script>

<style>
.head{
	padding: 20upx 62upx 40upx 62upx;
}
.allorder{
	background-color: #F0F2F5;
	padding: 30upx 20upx;
	height: 100%;
}
.order{
	border-radius: 10upx;
	padding: 10upx 0upx 0upx 26upx;
	background-color: white;
	margin-top: 20upx;
	box-shadow:4upx 2upx 2upx 2upx #dadada;
}
.key{
	font-size: 22upx;
	color: #4A4A4A;
	margin-top: 36upx;
	margin-right: 20upx;
	
}
image{
	width: 80upx;
	margin-right: 10upx;
	margin-top: 8upx;
}
.foot{
		height: 70upx;
}
.foot>view:first-child{
	font-size: 24upx;
	color: #4A4A4A;
}
.foot>view:last-child{
	flex: 1;
	color: white;
	margin-left: 30upx;
	font-size: 28upx;
	text-align: center;
	line-height: 70upx;
	background: -webkit-linear-gradient(left,#DB2C24,#79041C);
	border-radius: 20upx 0 0 0;
}
</style>
