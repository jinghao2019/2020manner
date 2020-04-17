<template>
	<view style="background-color: #F5F5F5;">
		<uni-nav-bar :right-text="isedit?'完成':'修改'" title="manner购物车" statusBar
		:shadow="false" @click-right="isedit = !isedit" :flex="true"></uni-nav-bar>
		
		<!-- 购物车商品列表 -->
		<view class="bg-white px-2" style="margin-bottom:200upx;">
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item,index) in list" :key="index">
				<label class="radio d-flex a-center j-center flex-shrink" style="width: 80upx;height: 80upx;z-index:999;" @click="selectItem(index)">
					<radio value="item.id" :checked="item.checked" 
					color="#FD6801"/>
				</label>
				
				<!-- 图片 -->
				<image :src="baseUrl+item.thumb" 
				mode="widthFix" style="height: 150upx;width: 150rpx;" 
				class="border border-light-secondary rounded p-2 flex-shrink">
				</image>
								
				<view class="flex-1 text-dark flex-column pl-2">
					<view class="text-dark" style="font-size: 35upx;">
						{{item.title}}
					</view>
					<!-- 规格属性 -->
					<view class="d-flex text-light-muted mb-2"
					:class="isedit ? ' bg-light-secondary mb-2' : ''"
					@tap.stop="doShowPopup(index)">
						<text class="mr-1">{{item.checkedSku}}</text>							
						<view class="iconfont icon-bottom font ml-auto"></view>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price>{{item.showPrice}}</price>
						<view class="a-self-end">
							<uni-number-box 
							:value="item.num" 
							@change="changeNum($event,item,index)" @fun="clickBtn" :disabled="changenumBtn"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 合计 -->
		<view class="d-flex a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary a-stretch" style="height: 100upx;z-index=100">
			<template v-if="!isedit">
				<view class="flex-1 d-flex a-center j-center font-md" style="background-color: #fff;">
					合计<price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md" @tap="submitOrder()" hover-class="main-bg-hover-color" >
					结算
				</view>
			</template>	
			<template v-else>
				<view class="flex-1 d-flex a-center j-center font-md">
					移入收藏<price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center bg-danger text-white font-md" hover-class="main-bg-hover-color" @tap="doDelGoods">删除</view>
			</template>
		</view>		
		<!-- 属性筛选 -->
		<common-popup :popupClass="popupShow" @hide="doHidePopup">
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/list/1.jpg" mode="widthFix"
				style="height: 180rpx;width: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">{{popupData.price}}</price>
					<view class="d-block">
						<text class="mr-1"
						v-for="(attr,attrIndex) in popupData.attrs" 
						:key="attrIndex">{{attr.list[attr.selected].name}}</text>
					</view>					
				</view>
			</view>
			
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card :headTitle="item.title" :headTitleWeight="false" 
				:headBorderBottom="false" :key="index"
				v-for="(item,index) in popupData.attrs">
					<zcm-radio-group :label="item" 
					:selected.sync='item.selected'></zcm-radio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="0" :value="popupData.num" @change="popupData.num = $event"></uni-number-box>
				</view>  
			</scroll-view>
			
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color" style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="doHidePopup">
				确定
			</view>
		</common-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import price from "@/components/common/price.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	//引入弹出框组件
	import commonPopup from "@/components/common/common-popup.vue"
	// 引入卡片组件
	import card from "@/components/common/card.vue"
	// 引入多选组件
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	import {mapState,mapGetters,mapActions,mapMutations} from "vuex"
	export default {
		components: {
			uniNavBar,
			price,
			uniNumberBox,
			card,
			zcmRadioGroup,
			commonPopup
		},
		data() {
			return {
				isedit: false,	
				baseUrl: ''
			}
		},
		computed: {
			...mapState({
				list:state=>state.cart.list,
				popupShow:state=>state.cart.popupShow,
				changenumBtn:state=>state.cart.changenumBtn,
			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				'disableSelectAll',
				'popupData'
			])
		},
		methods:{
			...mapActions([
				'doSelectAll',
				'doDelGoods',
				'doShowPopup',
				'doHidePopup',
				'updateCartList',
				'addCartList'
			]),
			...mapMutations([
				'selectItem',
				'initCartList',
			]),
			onLoad(options) {
				//设置基础的url
				this.baseUrl = this.$H.common.ul
				// 获取购物车数据
				this.updateCartList()
			},
			changeNum(e,item,index){
				//先改变本商品的数量值
				let list = this.list;
				list[index].num = e
			    this.list = list
				// //然后往后台发信息
				this.addCartList({
					'index':index,
					'num':e,
					'hashKey':item.hashKey 
				})
			},
			clickBtn(){
				//按钮
				this.changenumBtn = !this.changenumBtn
			},
			/**
			 * 提交订单
			 */
			submitOrder()
			{
				//1 购物车订单数据入缓存
				this.$Util.setCache("current_order_info",this.list,0);
				//2 跳转到订单结算页面 ordersubmit
				uni.navigateTo({
					url:"../../pages/mannerorder/ordersubmit"
				})
			}
		}
	}
</script>
<style>
</style>
