<template>
	<view style="display: flex;flex-direction: row;height: 27px;">
		<view class="food-control">
			<!-- 减号 -->
			<view class="cont" style="margin-top: 2px;z-index: 2004;" @click.stop="decreaseCart(food)" v-show="food.count>0">
				<image src="/static/减号.png" mode="" style="width: 20px;height: 20px;"></image>
			</view>		
			<!-- 中间的数字 -->
			<text style="padding: 0 4px;" v-show="food.count>0">{{food.count}}</text>
			<!-- 加号 -->
			<view style="flex: 1;margin-top: 2px;z-index: 2004; " class="cont" @click.stop="addCart(food)">
				<image src="/static/加号.png" style="width: 20px;height: 20px;color: #CCCCCC;" mode=""></image>
			</view>
		</view>					
	</view>
</template>

<script>
	// import Vue from 'vue'
	export default {
		components: {		
		},
		props: {
			food: {
				type: Object,
			}
		},
		data() {
			return {
				num:1,
				element: [],
			};
		},
		methods: {

			addCart(item) {
				this.$emit('add',item);
	   
				
			},
			decreaseCart(item) {
				this.$emit('dec',item)
			},
			
// anima(){
// 	this.element = ['.add','.cart'];
// 	this.num ++; 
// },
// jbMsg(res){
// 	//执行加入购物车的逻辑
// 	console.log("执行回调",res.code);
// }
		}
	}
</script>

<style scoped>
	.food-control {
		display: flex;
		flex: 1;
		justify-content: space-around;

	}

	.cont {
		width: 22px;
		height: 22px;
		box-sizing: border-box;
		border-radius: 50%;
		text-align: center;
	}
	
	
	
	.add{
	        position: fixed;
	        right:30px;
	        top: 150px;
	    }
	    .add2{
	        position: fixed;
	        right:30px;
	        top: 250px;
	    }
	    .foot{
	        position: fixed;
	        bottom: 0;
	        height: 90upx;
	        background: #e1e1e1;
	        width: 100%;
	    }
	    .foot .cart{
	        width: 180upx;
	        margin-left: 60upx;
	        height: 90upx;
	        background: #999999;
	        line-height: 90upx;
	        text-align: center;
	    }
	
	
</style>
