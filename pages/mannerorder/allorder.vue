<template>
	<view>
		<view class="u-f u-f-jsb head px-4">
			<view style="font-size: 40upx;font-weight: 600;">全部订单</view>
			<view class="u-f" style="margin-top: 16upx;">
				<view>自主开票</view>
				<image src="../../static/icon/right.png" mode="widthFix" style="width: 15upx;margin-top: 18upx;margin-left: 10upx;"></image>
			</view>
		</view>
		
		<view class="allorder" v-for="(item,index1) in allorder" :key="index1"  >
			<view class="time u-f u-f-jsb px-4">
				<view>{{item.datatime}}</view>
				<view class="u-f">
					<!-- <view>全部订单类型</view>
					<image src="../../static/icon/right.png" mode="widthFix" style="width: 15upx;margin-top: 18upx;margin-left: 10upx;"></image> -->
				</view>				
			</view>
			<view class="order px-4">	
			<block v-for="(items,index2) in item.data" :key="index2">	
				<view @click="toOrderDetail(index1,index2)">
					<view class="u-f u-f-jsb">
						<view class="u-f">
							<view>{{items.orderstore.name}}自提</view>
							<view style="margin: 0 20upx;">周{{item.datatime|dateFormat}}</view>
						</view>
						<view v-if="items.status === 2">已完成</view>
						<view v-if="items.status === -1" style="color: #000000;">已取消</view>
					</view>
					<view class="u-f u-f-jsb">
						<view>{{items.orderproduct[0].goods_name}}等{{items.total_num}}件商品</view>
						<view style="color: #4A4A4A;font-size: 38upx;font-weight: 600;">￥{{items.total_price}}</view>
					</view>
				</view>
			</block>
			
			</view>
				
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				allorder:[],
			}
		},
		//定义过滤器
		filters:{
			dateFormat(value){
				var weekArray = ["日", "一", "二", "三", "四", "五", "六"]
				return weekArray[new Date(value).getDay()];
			}
		},
		methods:{
			toOrderDetail(index1,index2){
				console.log(index1,index2)
				this.$Util.setCache("now_order_detail",this.allorder[index1].data[index2])
			    uni.navigateTo({
					    url: '../../pages/mannerorder/mannerdetail',			
				});
			},
			onLoad(){
				this.getData();
				this.url = this.$H.common.ul;
			},
			
			getData(){
				var that = this
				this.$H.get('/mannerdish/order/getAllOrder',{},{
					token:true,
					native:true
				}).then(res=>{
					console.log(res.data.data)
					that.$data.allorder = res.data.data
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
.time{
	padding: 20upx 40upx;
	background-color: #F5F5F5;
}
.time view{
	color: #4A4A4A;
	font-size: 28upx;
}
.order>view{
	height: 125upx;
	border-bottom: 1upx solid #eeeeee;
}
.order>view>view{
	margin-top: 20upx;
}
.order>view>view>view{
	font-size: 24upx;
	color: #4A4A4A;
}
.order>view>view>view:last-child{
	color: #89262C;
}
</style>
