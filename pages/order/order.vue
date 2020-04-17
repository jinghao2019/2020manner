<template>
	<view>
		<!-- 自定义导航栏 -->
		<view class="uni-tab-bar">
			<scroll-view scroll-x class="uni-swiper-tab">
				<block v-for="(tab,index) in tabBars" :key="tab.id">				
					<view class="swiper-tab-list" 
					:class="{'active':tabIndex==index}"
					@tap="tabtap(index)"
					>
				 		{{tab.name}}
						<view class="swiper-tab-line"></view>
					</view>				
				</block>
			</scroll-view>
		</view> 
				
		<view class="uni-tab-bar">
			<swiper class="swiper-box" 
			:style="{height:swiperheight+'px'}" 
			:current="tabIndex"
			@change="tabChange">
				<swiper-item v-for="(items,index) in listtabBar" :key="index">
					<scroll-view scroll-y="" style="height:100%">
						<!-- block用来循环订单 -->
						<block v-for="(item,index1) in items.list" :key="index1">
							<!-- 订单组件 -->
							<all-order :item="item" :index="index"></all-order>
						</block>
					</scroll-view>
				</swiper-item>		
			</swiper>
		</view>
		
	</view>
</template>
<script>
	import noThing from "../../components/common/no-thing.vue";//无内容
	import allOrder from "../../components/order/all-order.vue"//订单
	export default {
		components:{
			noThing,
			allOrder
		},
		data() {
			return {
				swiperheight:500,
				tabIndex:0,
				tabBars: [
				  { name:'全部订单',id:'all'},
				  { name:'待支付',id:'waitpay'},
				  { name:'已支付',id:'okpay'},
				  { name:'退款',id:'redund'},
				  ],
				listtabBar:[
				  {
					  list:[
							{
								name:'商城路店2',
								id:'mingz',
								date:"2020-2-14",
								time:"09:08",
								status:1,//1已支付(正在制作)，2待取餐(制作完成)，3待支付，4已完成(已取餐)，5已取消
								},													 
							 {
								name:'大丸百货',
								id:'mingz',
								date:"2020-2-14",
								time:"09:08",
								status:1,
								},
							{
								name:'南洋1931',
								id:'mingz',
								date:"2020-2-14",
								time:"09:08",
								status:false,
								},
							{
								name:'南京西路',
								id:'mingz',
								date:"2020-2-14",
								time:"09:08",
								status:false,
								},		
					  ]
				  },
				  {
					  list:[																				 
							 {
								name:'大丸百货',
								id:'mingz',
								date:"2020-2-14",
								time:"09:08",
								status:true,
								},
							{
								name:'南洋1931',
								id:'mingz',
								date:"2020-2-14",
								time:"09:08",
								status:true,
								},
							{
								name:'南京西路',
								id:'mingz',
								date:"2020-2-14",
								time:"09:08",
								status:true,
								},					 
					  ]
				  },
				  {
					  list:[
					  		{
					  			name:'商城路店1',
					  			id:'mingz',
					  			date:"2020-2-14",
					  			time:"09:08",
					  			status:false,
					  			},						 
					  ]
				  },
				  {
					  list:[]
				  }, 
				],
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success:(res)=> {
					let height=res.windowHeight-uni.upx2px(100)
					this.swiperheight=height;
				}
			})
		}, 
		
		methods: {
			// 点击事件
			tabtap(index){
				this.tabIndex=index;
			},
			// 滑动时间
			tabChange(e){
				this.tabIndex=e.detail.current;
			}
		}
	}
</script>

<style>
	.swiper-tab-list{
		color: #bfbfbf;
		font-weight: bold;
		width: 25%;

	}
	.uni-tab-bar .active{
		color: #dfdfdf;
		
	}
	.active .swiper-tab-line{
		border-bottom: 6upx solid #d55353;
		width: 70upx;
		margin: auto;
		border-bottom: 6upx solid #f76260;
		border-radius: 50upx;
	}
	.swiper-box{
		
	}
	
	/* 订单 */
/* 	.allorder{
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
		color: #f76260;
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
		color: #f76260;
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
		border: 1upx solid #d55353;
		margin-left: 10upx;
		background-color: #f76260;
		color: #ffffff;
	} */
</style>
