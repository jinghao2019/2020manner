<template>
	<view class="orderdetail">
		<order-deatil :info="info" :goodslist="goodslist"></order-deatil>
	</view>
</template>

<script>
	import orderDeatil from "../../components/order/order-deatil.vue"//订单
	export default {
		components:{
			orderDeatil,
		},
		data() {
			return {
				info:
					{ 
						status:1,//1. 未支付，2.已支付(下单成功)，3，等待制作（预留），4.开始制作，5 待取餐，6已完成
						allnum:20,
						allprice:2.2,
						ordertype:0,//0到店取餐 1外卖
						pwd:1688,
						shopaddress:"上海市静安区成都北路199号",
						shopname:"商城路店",
						shoptel:18439915503,
						ordernum:362598457815,
						orderdate:"2020-2-20",
						ordertime:"20:20",
						pay:"微信支付"
					},
				goodslist:[
					{
						goodsname:"拿铁",
						goodsimg:"../../static/咖啡/1 浓缩-1.jpg",
						goodsprice:"0.2",
						goodsnum:"2",
					},
					{
						goodsname:"美式",
						goodsimg:"../../static/咖啡/4 澳白-1.jpg",
						goodsprice:"0.2",
						goodsnum:"4",
					}
				]
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
