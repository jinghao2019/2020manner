<template>
	<view class="farther">
		<!-- 
		 <evan-radio v-model="baseValue" label="base1">用法1</evan-radio>
		 <evan-radio v-model="baseValue" label="base2">用法2</evan-radio> -->
		   
			<!-- <evan-radio-group v-model="color">
		        <evan-radio ﻿v-for="item in colorList" :key="item.value" :label="item.value">{{item.label}}</evan-radio>
		    </evan-radio-group> -->
		<view class="filter-body-section-body style-flex style-flex-wrap">
		<axb-check-box ref="radio3" :list="sartTime" @change="radioChangeType"></axb-check-box>
		<axb-check-box ref="radio3" :list="sartTime1" @change="radioChangeType"></axb-check-box>
		</view>
		
		<view class="top">
			<view class="u-f-ac u-f-jsb">
				<view class="u-f-ac u-f-jsb">
					<view class="icon iconfont icon-xihuan1"></view>  
					<view class="u-f-ac" @click="openShop()">
						正弘城店<view class="icon iconfont icon-jinru"></view>
					</view>
				</view>
				<view><view>
					<switch checked color="#FFCC33" style="transform:scale(0.7)"/>
				</view></view>
			</view>
			<view>
				距离您12km
			</view>
		</view>

	
		
		<!-- 新的列表 -->
		<view class="content">
		
			<scroll-view class="menu-wrapper" scroll-y :style="'height:'+height+'px'">
				<view ref="menuWrapper">
					<!--  :class="{'current': currentIndex == index}" @click="selectMenu(index,$event)" -->
					<view style="position: relative;" v-for="(item,index) in goods" :key="index" ref="menuList" @click="select(index)"
					 :class="{'current': currentIndex == index}">
		
						<view class="menu-item">{{item.name}}</view>
						<text class="allcount" v-if="getAllCount>=item.count&&item.count>0">{{item.count}}</text>
						<!-- <text class="allcount">1</text> -->
					</view>
				</view>
			</scroll-view>
			<!--  @scroll="scroll" -->
			<scroll-view class="foods-wrapper" scroll-y :style="'height:'+height+'px'" :scroll-top="foodSTop">
				<view ref="foodsWrapper">
					<view ref="foodList" class="foods" v-for="(item, i) in goods" :key="i" >
		
						<view class="food-title" style="background: #f3f5f7">
							{{item.name}}
						</view>
						<view class="food" v-for="(food, index) in item.foods" :key="index" @click="showdeatil" style="z-index: 2003;">
							<image :src="food.img" mode="" style="width: 85px;height: 85px;margin-top: 6px;border-radius: 10upx;"></image>
							<view class="food-info">
								<text style="font-size: 15px;margin-top: 2px;font-weight: 600;">{{food.name}}</text>
								<text style="font-size: 10px;margin: 2px 0;">{{food.description}}</text>
								<text style="font-size: 12px;margin: 2px 0 4px;">唯品自营牧场的非餐饮牛奶</text>
		
								<!-- 加减 -->
								<view class="food-btm">
									<text class="food-price">￥{{food.price}}</text>

									<cartcontrol :food="food" @add="addCart" @dec="decreaseCart"></cartcontrol>
									
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<shopcart :goods="goods" @add="addCart" @dec="decreaseCart" @delAll="delAll"></shopcart>
		</view>
		
		<!-- 商品详情 -->
		<view class="goodsdetail" v-show="show">
			<view class="tops u-f">
				<image src="../../static/咖啡/6 摩卡-2.jpg" style="width: 85px;height: 85px;margin-top: 6px;border-radius: 10upx;"></image>
				<view >
					<view>澳式白咖啡</view>
					<view class="kinds">默认大杯</view>
					<view>￥15</view>
				</view>
			</view>
			<view>
				<view style="font-weight: 600;font-size: 30upx;">规格</view>
				<scroll-view class="guige" scroll-y="true">
								<view class="size">
									<view>杯型</view>
									<view class="u-f">
										<view>小杯</view>
										<view>中杯</view>
										<view>大杯</view>
									</view>
								</view>
								<view class="hot">
									<view>温度</view>
									<view class="u-f">
										<view>加冰</view>
										<view>少冰</view>
										<view>去冰</view>
									</view>
								</view>
								<view class="sugar">
									<view>口味</view>
									<view class="sugar1 u-f">
										<view>糖浆1</view>
										<view>糖浆2</view>
										<view>糖浆3</view>
										<view>糖浆1</view>
										<view>糖浆2</view>
										<view>糖浆3</view>	
									</view>
								</view>
				</scroll-view>				
			</view>
			
			
			<view class="u-f-ajc go">
				选好了
			</view>
		</view>
		<view class="mask" @click="hidedeatil()" v-show="show"></view>
	</view>
</template>
<script>
	import shopcart from '@/components/shopcart.vue';
	import cartcontrol from '@/components/cartcontrol.vue';
	import axbCheckBox from '../../components/axb-checkbox/axb-checkbox.vue'
	// import EvanRadio from '@/components/evan-radio/evan-radio.vue';
	// import EvanRadioGroup from '@/components/evan-radio/evan-radio-group.vue';
	// import UniIcons from '@/components/uni-icons/uni-icons.vue'
	import Vue from 'vue'
	export default {
		components: {		
			shopcart,
			cartcontrol,
			axbCheckBox	
		},
		 data() {
			return {	
					  sartTime: [{ // 开始日期
					        name: '66',
					        value: '3day',
					        checked: 0
					    }, {
					        name: '过去一周',
					        value: '1week',
					        checked: 0
					    }, {
					        name: '过去一月',
					        value: '1month',
					        checked: 0
					    }, {
					        name: '过去半年',
					        value: '6month',
					        checked: 0
					    }, {
					        name: '过去一年',
					        value: '1year',
					        checked: 0
					    }],
						sartTime1: [{ // 开始日期
						      name: '三天',
						      value: '3day',
						      checked: 0
						  }, {
						      name: '过周',
						      value: '1week',
						      checked: 0
						  }, {
						      name: '过月',
						      value: '1month',
						      checked: 0
						  }, {
						      name: '过年',
						      value: '6month',
						      checked: 0
						  }, {
						      name: '过年',
						      value: '1year',
						      checked: 0
						  }],
				   // baseValue:'base1',
				   //          color: 'red',
				   //          colorList: [{
				   //                  label: '红色',
				   //                  value: 'red'
				   //              },
				   //              {
				   //                  label: '绿色',
				   //                  value: 'green'
				   //              },
				   //              {
				   //                  label: '蓝色',
				   //                  value: 'blue'
				   //              },
				   //              {
				   //                  label: '粉色',
				   //                  value: 'pink'
				   //              },
				   //              {
				   //                  label: '黑色',
				   //                  value: 'black'
				   //              }
				   //          ],
				show:false,
				title: 'Hello',
				goods: [{
						"name": "热销",
						"foods": [{								
								"name": "拿铁",
								"price": 1,
								"oldPrice": "",
								"description": "云南豆子",
								"sellCount": 229,
								"img": '../../static/咖啡/3 拿铁-1.jpg',

							}, {
								"name": "美式",
								"price": 1,
								"oldPrice": "",
								"description": "云南豆子",
								"sellCount": 239,
								"img": '../../static/咖啡/6 摩卡-2.jpg'

							},
							{
								"name": "面包",
								"price": 1,
								"oldPrice": "",
								"description": "面包",
								"sellCount": 229,
								"img": '../../static/面包/小吐司-红豆.jpg'

							}
						]
					},
					{
						"name": "咖啡",
						"foods": [{
							"name": "小吐司1",
							"price": 2,
							"oldPrice": "",
							"description": "面包",
							"sellCount": 229,
							"img": '../../static/面包/小吐司-红豆.jpg'

						}, {
							"name": "澳白",
							"price": 9.9,
							"oldPrice": "",
							"description": "豆子:瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/咖啡/4 澳白-2.jpg'

						}],

					},
					{
						"name": "豆子",
						"foods": [{
							"name": "小吐司",
							"price": 1.88,
							"oldPrice": "",
							"description": "豆子:面包",
							"sellCount": 229,
							"img": '../../static/面包/小吐司-红豆.jpg'

						}, {
							"name": "澳式白咖啡",
							"price": 9.9,
							"oldPrice": "",
							"description": "豆子:瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/咖啡/4 澳白-2.jpg'

						}],

					},
					{
						"name": "面包",
						"foods": [{
							"name": "面包3只",
							"price": 1.88,
							"oldPrice": "",
							"description": "豆子:面包",
							"sellCount": 229,
							"img": '../../static/面包/小吐司-红豆.jpg'

						}, {
							"name": "澳式白咖",
							"price": 9.9,
							"oldPrice": "",
							"description": "豆子:瘦肉，干贝，花生等",
							"sellCount": 239,
							"img": '../../static/咖啡/4 澳白-2.jpg'

						}],

					},
					{
						"name": "其他",
						"foods": [{
							"name": "拿铁1",
							"price": 9.22,
							"oldPrice": "",
							"description": "云南豆子",
							"sellCount": 229,
							"img": '../../static/咖啡/3 拿铁-1.jpg'

						}, {
							"name": "美式1",
							"price": 9.8,
							"oldPrice": "",
							"description": "豆子:云南豆子",
							"sellCount": 239,
							"img": '../../static/咖啡/6 摩卡-2.jpg'

						}]
					},
			
				],
				
				height: 0,
				foodSTop: 0,
				currentIndex: 0//默认菜单类别
			}
		        },
				
				onLoad() {
					this.height = Number(uni.getSystemInfoSync().windowHeight) - 55;//可使用窗口高度减少55
					 //console.log(uni.getSystemInfoSync().windowHeight)
					 //可使用窗口高度是642
				},
				computed: {
				//循环遍历吗？
							
					// getList() {				
					// 	let result = [];						
					// 	this.goods.forEach((good) => {				
					// 		good.foods.forEach((food) => {				
					// 			if (food.count) {
					// 				result.push(food)
					// 			}
					// 		})
					// 	})
					// 	  console.log('result', result);
					// 	return result				
					// },
				
				
				},
				methods: {
					
					radioChangeType(val) {
					console.log(val) // 单选时 返回选中项的value, 反选返回null
					},
					//点击显示详情的事件
					showdeatil(){
						this.show=true;
					},
					//点击隐藏详情的事件
					hidedeatil(){
						this.show=false;
					},
					// 点击跳转店铺选择
					openShop(){
						uni.navigateTo({
							url:'../../pages/shop/shop',
						})
					},
				
					// 点击侧边栏，当前样式发生改变发生改变
					select(index) {
						this.currentIndex = index;
						this.setScrollH(index);
				
					},
				
					// 设置点击侧边栏右边滚动的高度
					setScrollH(index) {
						var that = this;
						let height = 0;
						var query = uni.createSelectorQuery();//创建结点查询器					
						// console.log('query',query);
						let foods = query.selectAll('.foods');
						 console.log('foods', foods);
				
						this.$nextTick(function() {
							foods.fields({
								size: true
							}, data => {
								//console.log(data)
								if (index == 0) {
									that.foodSTop = 0;
								}
								for (let i = 0; i < index; i++) {	
									//将字符串转换成整数 +=高度
									height += parseInt(data[i].height);
									// console.log('fh', foods);
									that.foodSTop = height;
									// console.log(that.foodSTop)
								}
				
							}).exec();
						})
				
					},
					// 获得购物车所有商品数量
					getAllCount: function(item) {
						// console.log('item', item)
						let result = [];//声明一个空的result数组
						let count = 0;	//购物车商品总数量初始为0
						//for循环goods下的数组
						for (let i = 0; i < this.goods.length; i++) {
							count = 0;
							//forrach循环foods内的good商品
							this.goods[i].foods.forEach((food) => {
									
								// console.log('food',food);
								//如果商品数量大于0,也就是说有商品的情况
								if (food.count >= 0) {
									//+=赋值给count
									count += food.count
									//存到进去，goods[i]等于count
									Vue.set(this.goods[i], 'count', count)									
								}
							})
							// console.log('result', count);
							//将count存入起初设定的count值
							result.push(count)
						}
						//冒泡
						result.sort(function(a, b) {
							return a - b;
						})
						//长度减一，因为下标从0开始
						count = result[result.length - 1]
						// console.log('result', count);
						return count;
					},
					//增加购物车事件
					addCart(item) {
						// console.log('ev', JSON.stringify(item))
						//如果商品数量大于等于0，也就是说已经有商品数量，这时候数量一定不是0
						if (item.count >= 0) {
							//点一次，数量加一
							item.count++
							//循环这个数组
							this.goods.forEach((good) => {
								good.foods.forEach((food) => {
									//每一次循环，都要作比较，商品名称等于循环的商品名称时
									if (item.name == food.name)
									//把item.count数量赋值给food数量
										food.count = item.count
								})
							})
							// console.log('c++', JSON.stringify(item))
				
						} else {
							//第一次点击，会走进else
							console.log('第一次点击加号，应该走这里一次，我才会显示')
							//循环这个数组
							this.goods.forEach((good) => {
								good.foods.forEach((food) => {
									//每一次循环，都要作比较，商品名称等于循环的商品名称时
									if (item.name == food.name)
									//直接把商品数量设置成1
										Vue.set(food, 'count', 1)
									//food.count = 1
									// console.log('add-shop', JSON.stringify(food))
								})
							})
						}
				
					},
					//点击减少事件
					decreaseCart(item) {
						//做判定，如果有商品的数量
						if (item.count) {
							//点击一次做一次减一计算
							item.count--
							//循环这个数组
							this.goods.forEach((good) => {
								good.foods.forEach((food) => {
									//每一次循环，都要作比较，商品名称等于循环的商品名称时
									if (item.name == food.name)
									//把item.count数量赋值给food数量
										food.count = item.count
									// console.log('dec-shop', JSON.stringify(this.foods))
								})
							})
						}
					},
					// 清空购物车事件
					delAll() {
						//循环这个数组
						this.goods.forEach((good) => {
							good.foods.forEach((food) => {
								//如果购物车内有商品的数量
								if (food.count) {
									//直接将数量变为0，清空
									food.count = 0//购物车内商品全变成0
									// console.log(JSON.stringify(food));
								}
							})
						})
					}
					
				}

			}
</script>

<style>		
.top>view>view:first-child{

	padding-left: 50upx;
}
.top>view>view>view:last-child{
	padding-left: 15upx;
}
.top>view>view:last-child{
	color: #333333;
	font-size: 32upx;
	padding-right: 50upx;
}
.top>view:last-child{
	font-size: 30upx;
	margin-top: 10upx;
	padding-left: 50upx;
}
.tops{
	padding: 20upx 20upx;
}

/* ///// */
.nav-left-item image{
	width: 60upx;
	padding-top: 20upx;
}	
.list image{
	width: 200upx;
	border-radius: 20upx;
}
.list>view>view:first-child{
	font-weight: 500;
	font-size: 30upx;
}
.text{
width: 130upx;
border-radius: 10upx;
background-color: #f1f1f1;
color:#C0C0C0;
}
.des{
font-size: 25upx;
color:#9a9a9a;	
}
.price,.num{
	font-size: 35upx;
	font-weight: 600;
}
.num{
	padding-left: 10upx;
	padding-right: 10upx;
}
.control{
	margin-left: 30%;
}

.list{
	padding-left: 20upx;
	padding-top: 40upx;
}
.list>view{
	padding-left: 20upx;
}
/* 轮播 */
.topic-swiper{
	width: 500upx;
	margin-left: 5%;
	padding-top: 10upx;
}
.topic-swiper image{
	width: 500upx;
}
.content {
		/* text-align: center; */
		/* height: 400upx; */
		display: flex;
		position: absolute;
		top: 150upx;
		bottom: 55px;
		width: 100%;
		overflow: hidden;
	}
	.current {
		position: relative;
		z-index: 0;
		background-color: #fff;
		color: #ff557f;
		border-left: 8upx solid #ff557f;
	}

	.menu-wrapper {
		text-align: center;
		width: 22%;
		display: flex;
		flex-direction: column;
		background: #f3f5f7;

	}

	.menu-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50px;
	}

	.allcount {
		position: absolute;
		right: 6px;
		top: 8px;
		display: inline-block;
		padding: 0 4px;
		font-size: 9px;
		line-height: 16px;
		font-weight: 400;
		border-radius: 50%;
		background-color: #ff557f;
		color: #ffffff;
	}

	.foods-wrapper {
		margin-left: 4px;
		width: 78%;
	}


	.food,.content {
		margin-top: 20upx;
		display: flex;
		flex-direction: row;
	}
	.food-btm{
		margin-top: -20upx;
		display: flex;
		flex-direction: row;
		}
		

	.food-title {
		padding: 2px 0;
	}

	.food-info {
		margin-left: 10px;
		margin-right: 16px;
		display: flex;
		flex-direction: column;
		flex: 2;
	}

	.food-btm {
		justify-content: space-between;
	}
	.food-price {
		color: #f01414;
		font-size: 16px;
	}
	.foodList{
		z-index: 2003;
	}
	
	
	
/* /////////////////////// */

/* 商品详情 */
.goodsdetail{
	border: 1upx solid #bbbbbb;
	border-radius: 10upx;
	position: fixed;
	width: 85%;
	height: 60%;
	margin: 0 7%;
	top: 20%;
	background-color: #ffffff;
	box-shadow: 0 0 20upx 1upx;
	z-index: 2006;
}
.mask{
	position: fixed;
	z-index: 2000;
	right: 0;
	top: 0;
	left: 0;
	bottom: 0;
	z-index: 2005;
}
.guige{
	height: 400upx;
}
.tops>view>view:first-child{
	font-size: 35upx;
	font-weight:600;
}
.kinds{
	font-size: 20upx;
	color: #555555;	
}
.tops>view>view:last-child{
	font-size: 35upx;
	font-weight:600;
	color: red;
	margin-top: 20upx;
}
.tops>view{
	margin-left: 20upx;
}
.size>view>view,
.hot>view>view,
.sugar>view>view{
	width: 26%;
	height: 60upx;
	margin: 10upx auto;
	display: flex;
	justify-content: center;
	border-radius: 10upx;
	background-color:#ff706bcf;
	color: white;
}
.size>view:first-child,
.hot>view:first-child,
.sugar>view:first-child{
	margin-left: 10upx;
}
.sugar1{
	display: flex;
	flex-wrap: wrap;
	list-style: none;
}
.sugar1>view{
	display: flex;
	justify-content: center;
}
.go{
	width: 100%;
	height: 100upx;
	font-size: 35upx;
	font-weight: 600;
	background-color: #f76260e8;
	color: white;
	margin-top: 34upx;
}
</style>
