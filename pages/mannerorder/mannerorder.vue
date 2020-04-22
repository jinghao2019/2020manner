<template>
	<view style="background-color: #F3F3F3;">
		<!-- 自定义导航栏 -->
		<view class="uni-tab-bar">
			<scroll-view scroll-x class="uni-swiper-tab">
				<block v-for="(tab,index) in tabBars" :key="tab.id">				
					<view class="swiper-tab-list" 
					:class="{'active':tabIndex==index}"
					@tap="tabtap(index)"
					>
				 		{{tab.orderstatus}}
						<view class="swiper-tab-line"></view>
					</view>				
				</block>
			</scroll-view>
		</view> 
				
		<view class="uni-tab-bar animated bounceInRight">
			<swiper class="swiper-box" 
			:style="{height:swiperheight+'px'}" 
			:current="tabIndex"
			@change="tabChange">
				<swiper-item v-for="(items,index) in listtabBar" :key="index">
					
					<scroll-view scroll-y="" style="height:100%">
						<template v-if="items.list.length>0">
							<!-- block用来循环订单 -->
							<block v-for="(item,index1) in items.list" :key="index1">
								<!-- 订单组件 -->
								<all-order :item="item" :index="index"></all-order>
							</block>
						</template>
						<!-- //此模板无内容时显示 -->
						<template v-else>
							<!-- 无内容默认 -->
							<no-thing></no-thing>
						</template>		
					</scroll-view>
				</swiper-item>		
			</swiper>
		</view>
		
	</view>
</template>
<script>
	import noThing from "../../components/common/no-thing.vue";//无内容
	import allOrder from "../../components/order/all-order.vue";//订单
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
				  { orderstatus:'进行中',id:'all'},
				  { orderstatus:'待支付',id:'waitpay'},
				  { orderstatus:'已完成',id:'okpay'},
				  { orderstatus:'取消/退款',id:'redund'},
				  ],
				listtabBar:[
				  {
					  list:[
							{
								shopname:'商城路店2',
								goodsname:'美式咖啡',
								allnum:'1',
								id:'mingz',
								allprice:"15",
								date:"2020-2-14",
								time:"09:08",
								status:2,//1.待取餐（做好了） 2.已支付(刚付钱) 3.待支付(未付钱) 4.已完成(取过了) 5.已取消(待支付和已支付都可取消)
								},													 
							 {
								shopname:'大丸百货',
								goodsname:'拿铁咖啡',
								allnum:'2',
								id:'mingz',
								allprice:"15",
								date:"2020-2-14",
								time:"09:08",
								status:2,
								},
							{
								shopname:'南洋1931',
								goodsname:'拿铁咖啡',
								allnum:'2',
								id:'mingz',
								allprice:"15",
								date:"2020-2-14",
								time:"09:08",
								status:2,
								},
									
					  ]
				  },
				  {
					  list:[
							 {
								shopname:'大丸百货',
								goodsname:'拿铁咖啡',
								allnum:'2',
								id:'mingz',
								allprice:"15",
								date:"2020-2-14",
								time:"09:08",
								status:0,
								},
							{
								shopname:'南洋1931',
								goodsname:'拿铁咖啡',
								allnum:'2',
								id:'mingz',
								allprice:"15",
								date:"2020-2-14",
								time:"09:08",
								status:0,
								},
							{
								shopname:'南京西路',
								goodsname:'拿铁咖啡',
								allnum:'2',
								id:'mingz',
								allprice:"15",
								date:"2020-2-14",
								time:"09:08",
								status:0,
								},					 
					  ]
				  },
				  {
					  list:[
					  		{
					  			shopname:'商城路店1',
								goodsname:'拿铁咖啡',
								allnum:'2',
								id:'mingz',
								allprice:"15",
								date:"2020-2-14",
								time:"09:08",
					  			status:2,
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
			// 可用窗口高度
			uni.getSystemInfo({
				success:(res)=> {
					let height=res.windowHeight-uni.upx2px(100)
					this.swiperheight=height;
				}
			})
		}, 
		
		methods: {
			// 自己测试添加数据 可删
			// onLoad(){
			// 	this.listtabBar[2].list.push({
			// 			name:"新加",
						
			// 		})
			// },
			// 点击事件:横向导航切换
			tabtap(index){
				this.tabIndex=index;
			},
			// 滑动事件，横向导航滑动效果
			tabChange(e){
				this.tabIndex=e.detail.current;
			},	
			//下拉刷新
			onPullDownRefresh:function(){
				// this.getList();
				console.log('刷新啦')
			 },
			//触底事件
			onReachBottom:function(){
				 // 这里向后台请求触底刷新数据
				console.log('触底了')
			}
		},
		
	}
</script>

<style>
	.swiper-tab-list{
		color: #bfbfbf;
		font-weight: bold;
		width: 25%;
	}
	.uni-tab-bar .active{
		color: #000000;
	}
	.active .swiper-tab-line{
		width: 70upx;
		margin: auto;
		border-bottom: 6upx solid #950000;
		border-radius: 50upx;
	}
	.swiper-box{
	height: 100%;
	}
	
</style>
