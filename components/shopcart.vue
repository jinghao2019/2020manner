<template>
	<view class="shopcart">
		<!-- @click="toggleList" -->
		<view class="cartBottom" @click="toggleList">
			<view class="carIcon">
				<view class="iconBox" :class="getAllCount ? 'active' : '' ">
					<!-- 购物车总数 -->
					<text class="allcount" v-if="getAllCount">{{getAllCount}}</text>
					<!-- 购物车图标 -->
					<image src="/static/cart.png" mode="widthFix" class="img"></image>
				</view>
			</view>
			<view class="middle">
				<text class="price" :class="getAllCount ?　'active': ''">￥{{getAllPrice}}</text>
				<text class="deliveryPrice" style="font-size: 12px;">免配送费|支持自取</text>
			</view>
			<view class="BtnRight u-f-ajc" v-show="isShowList" @click="openOrder()">
				去结算
			</view>
		</view>
		<!-- 选择的商品 -->
		<view class="cartList" v-show="isShowList && getList.length">
			<scroll-view scroll-y style="max-height: 200px;">
				<view class="title">
					<text>购物车</text>
					<view class="clear" @click="delShopcart">
						清空
					</view>
				</view>
				<view class="list">
					<view class="list-text" v-for="(item,index) in getList" :key="index">
						<text style="flex:1">{{item.name}}</text>
						<text style="flex:1">￥{{item.price}}</text>
						<cartcontrol :food="item" @add="addCart" @dec="decreaseCart"></cartcontrol>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="listMask" v-show="isShowList && getList.length" @click="toggleList"></view>
	</view>
</template>

<script>
	import cartcontrol from '@/components/cartcontrol.vue'
	// import {mul} from '@/utils/lib'
	export default {
		props: {
			goods: {
				type: Array
			}
		},
		data() {
			return {
				isShowList: false,
			};
		},
		components: {
			cartcontrol
		},
		computed: {
			getList() {
				let result = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							result.push(food)
							// console.log('res', JSON.stringify(result))
						}
					})
				})
				return result
			},
			// 获得购物车所有商品数量
			getAllCount() {
				let result = 0;
				this.getList.forEach((food) => {
					result += food.count
				})
				return result
			},



			// 总价
			getAllPrice() {
				let result = 0;
				let result1 = 0;
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						result1 += this.accMul(food.count, food.price)//数量×价格
						result = result1.toFixed(2);				//浮点
					})
				})
				return result
			}
		},
		methods: {
	
			// 点击跳转订单详情
			openOrder(){
				uni.navigateTo({
					url:'../../pages/order/orderdeatil',
				})
			},
			// 解决浮点数 运算出现多位小数
			accMul(arg1, arg2) {
				let m = 0,
					s1 = '',
					s2 = '';
				if (arg1 && arg1 != null)
					s1 = arg1.toString();
				if (arg2 && arg2 != null)
					s2 = arg2.toString();
				// console.log('m1',s2.replace('.',''))
				try {
					m += s1.split('.')[1].length
				} catch (e) {}
				try {
					m += s2.split('.')[1].length
				} catch (e) {}

				return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
			},
		

			toggleList() {
				console.log('点击了购物车')
				if (this.getList.length) {
					this.isShowList = !this.isShowList;
				}
			},
			delShopcart() {
				this.$emit('delAll');
			},
			addCart(item) {
				
				this.$emit('add', item)
			},
			decreaseCart(item) {
				this.$emit('dec', item)
			}

		},
	}
</script>

<style scoped>
	.list-text {
		display: flex;
		flex-direction: row;
	}

	.shopcart .cartBottom {
border-radius: 50upx;
background-color: rgba(112, 112, 112,0.50);
width: 85%;
margin: 0 auto;
		position: fixed;
		top:84%;
		bottom: 0;
		left: 0;
		right: 0;
		height: 54px;
		z-index: 2008;
		display: flex;
	}

	.carIcon {
		flex: 1;
	}

	.iconBox {
		position: absolute;
		bottom: 22px;
		left: 18px;
		z-index: 101;
		background-color: rgb(186, 194, 199);
		border-radius: 50%;
		height: 48px;
		width: 48px;
		line-height: 55px;
		/* border: 6px solid #141d27; */
	}

	.iconBox .allcount {
		position: absolute;
		right: -6px;
		top: 0;
		display: inline-block;
		padding: 0 6px;
		font-size: 9px;
		line-height: 16px;
		font-weight: 400;
		border-radius: 10px;
		background-color: #f01414;
		color: #ffffff;
	}

	.img {
		font-size: 24px;
		line-height: 24px;
		width: 30px;
		height: 30px;
		padding-left: 6px;
		padding-top: 6px;
		color: #cccccc;
		border-radius: 50%;
	}

	.carIcon .active {
		background-color: #e8e8e8;
	}

	.middle {
		display: flex;
		flex-direction: column;
		flex: 2;
		color: #ffffff;
	}

	.BtnRight {
		color: white;
		flex: 1;
		background-color: #ff5555d6;
		border-radius: 0 50upx 50upx 0;
	}

	.cartList {
		position: fixed;
		bottom: 54px;
		left: 0;
		right: 0;
		z-index: 2007;
		background-color: #e7e7e7;
		padding-bottom: 140upx;
		}

	.cartList .title,
	.cartList .list-text {
		display: flex;
		flex-direction: row;
	}

	.cartList .title {
		background: #F3F5F7;
		justify-content: space-between;
		padding: 4px 8px;
	}

	.cartList .list-text {
		padding: 10px 6px 10px 8px;
		text-align: center;
	}

	.list {
		background: #F8F8F8;
		padding-bottom: 10px;
		
	}


	/* 遮布 */
	.listMask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 89;
		opacity: 0.5;
		background: #6a7076;
	}
</style>
