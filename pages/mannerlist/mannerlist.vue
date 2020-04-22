<template>
	<view class="all" style="height: 100%;box-sizing: border-box;">
			<view>
				<view>
					<image src="../../static/img/列表title1.png" 
					mode="widthFix" 
					style="width: 100%;">
					</image>
				</view>
				<!-- 最近店铺 -->
				<view class="card1">
					<view class="u-f cardname">
						<view>{{currentShop.name}}</view>
						<view>最近</view>
					</view>
					<view class="u-f u-f-jsb cardaddress">
						<view class="u-f">
							<view>{{currentShop.address}}</view>
							<image @tap="openMap()" src="../../static/img/地图.png" 
							mode="widthFix" 
							style="width: 50upx;margin-left: 10upx;">
							</image>
						</view>
						<view @tap="selectShop()">更换地址</view>
					</view>
				</view>				
				<view>
					<image src="../../static/img/咖啡大厅.png" mode="widthFix" style="width: 100%;"></image>
				</view>
			</view>
			<!-- 列表部分 -->
			<view class="content"  style="height: 100%;box-sizing: border-box;">						
			<!-- 左侧类别列表 -->
				<scroll-view id="leftScroll" scroll-y 
				style="flex: 1;height: 100%;" 
				class="border-right border-light-secondary" 
				:scroll-top="leftScrollTop">
					<view class="border-bottom border-light-secondary py-1 left-scroll-item"
					hover-class="bg-light-secondary"
					v-for="(item,index) in cate" :key = "index"
					@tap="changeCate(index)">
						<view class="py-1 font-md text-muted text-center "
						:class="activeIndex === index ? 'class-active':''">
						{{item.name}}	
						</view>
					</view>
				</scroll-view> 						
				<!-- 右侧商品列表 -->
				<scroll-view scroll-y style="flex: 3.5;height: 100%;"
				:scroll-top="rightScrollTop"
				:scroll-with-animation="true"
				@scroll="onRightScroll">					
					<view class="row right-scroll-item" v-for="(item,index) in list" :key="index">
						<view class="span24-24  py-2 u-f" v-for="(item2,index2) in item.goods" :key="index2" @click="show('attr',index,index2)">
							<view class="px-2">
								<image wx:if="url + item2.thumb"  :src="url + item2.thumb" 
								style="width: 120upx;height: 120upx;border-radius: 10upx;flex:4;">
								</image>
							</view>
							<view class="" style="flex:4">
								<view>{{item2.title}}</view>
								<view class="font-sm" style="color: #c3c3c3;">默认:大杯/加冰</view>
								<view class="font-md">￥{{item2.market_price}}</view>
							</view>
							<view class="" style="flex:1">
								<image src="../../static/icon/加号.png" 
								mode="widthFix" 
								style="width: 50upx;margin-top: 60upx;">
								</image>
							</view>
						</view>						
					</view>
				</scroll-view>				
			</view>			
			<!-- 属性筛选框 -->
			<common-popup :popupClass="popup.attr" @hide="hide('attr')">
				<view class="d-flex a-center" style="height: 275rpx;">
					<image v-if="url + currentGoods.thumb"  :src="url + currentGoods.thumb" mode="widthFix"
					style="height: 180rpx;width: 180rpx;" class="border rounded"></image>
					<view class="pl-2">
						<price priceSize="font-lg" unitSize="font">{{showPrice}}</price>
						<text class="d-block">
							{{currentGoods.title}}
						</text>
						<text class="d-block" style="font-size:18upx;font-weight: 200;">
							{{checkedSkus}}
						</text>
					</view>
				</view>
									
				<scroll-view scroll-y class="w-100" style="height: 660rpx;">
					<card :headTitle="item.name" :headTitleWeight="false" 
					:headBorderBottom="false" :key="index"
					v-for="(item,index) in newoptions">
						<zcm-radio-group :label="item" 
						:selected.sync="item.selected"></zcm-radio-group>
					</card>
					<view class="d-flex j-sb a-center p-1 border-top border-light-secondary">
						<text>购买数量</text>
						<uni-number-box :min="1" :value="goodsNum" @change="goodsNum = $event"></uni-number-box>
					</view>
				</scroll-view>
			
				 <view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color" style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" 
				 @tap.stop="addCart">
				 	加入购物车
				 </view>
			</common-popup>		
	</view>
</template>

<script>
	import baseInfo from "@/components/detail/base-info.vue"
	import scrollAttrs from "@/components/detail/scroll-attrs.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import scrollComments from "@/components/detail/scroll-comments.vue"
	import uParse from "@/components/uni-ui/uParse/src/wxParse.vue"
	import card from "@/components/common/card.vue"
	import commonList from "@/components/common/common-list.vue"
	import bottomBtn from "@/components/detail/bottom-btn.vue"
	import commonPopup from "@/components/common/common-popup.vue"
	import price from "@/components/common/price.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import {mapMutations} from "vuex"
	
	export default {
		components: {
			baseInfo,
			scrollAttrs,
			uniListItem,
			scrollComments,
			uParse,
			card,
			commonList,
			bottomBtn,
			commonPopup,
			price,
			zcmRadioGroup,
			uniNumberBox
		},
		computed: {
			// 显示价格
			showPrice(){
				let attrPrice = 0;
				//currentGoods newoptions
				for(let i = 0;i<this.newoptions.length;i++)
				{
				    attrPrice += parseFloat(this.newoptions[i].child[this.newoptions[i].selected].addPrice)
				}
				
				//规格价格
				return (parseFloat(this.currentGoods.market_price) + attrPrice)*this.goodsNum;
				//下面可能会加上浓缩份数的价格
			},
			// 选中的sku
			checkedSkus(){
				//用lamda写法进行遍历
				let checkedSkus = this.newoptions.map(v=>{
					return v.child[v.selected].name
				})
			
				return checkedSkus.join(',')
			},
		},
		data () {
			return{
				// 当前商品数量
				goodsNum:1,
				detail:{
					num:1
				},
				url:'',
				//动画弹出与否的标识为
				newoptions:[],
				popup:{
					attr:"none",
					express:"none",
					service:"none"
				},
				currentShop:{},
				// 当前点击的商品数据
				currentGoods:{},
				goodsIndex:"",
				height:50,
				showLoading:true,
				//当前选中分类
				activeIndex:0,
				// 左侧种类节点高度
				leftDomsTop:[],
				// 右侧商品节点高度
				rightDomsTop:[], 
				// 左侧种类显示的高度
				leftScrollTop:[],
				// 右侧商品种类显示的高度
				rightScrollTop:0,
				//类别的数据(左侧)
				cate:[],
				//商品的数据(右侧)
				list:[]
			}
		},		
		watch:{
			async activeIndex(newValue,oldValue){
				// 获取scroll-view高度
				let data = await this.getElInfo({
					size:true,
					scrollOffset:true,					
				})
				let H = data.height
				let ST = data.scrollTop 	
				//下边
				if ((this.leftDomsTop[newValue]+this.cateItemHeight) > (H+ST) ) {
					return this.leftScrollTop = this.leftDomsTop[newValue]+this.cateItemHeight - H
					}
				//上边
				if (ST > this.cateItemHeight) {
					this.leftScrollTop = this.leftDomsTop[newValue]
				}
			}
		},
		onLoad () {
			// this.__init()
			this.height = Number(uni.getSystemInfoSync().windowHeight) - 55;
			//可使用窗口高度减少55,可使用窗口高度是642
			this.getData()
		},
		onReady() {
			// 获取左侧节点
			this.getElInfo({
				all:'left',
				size:true,
				rect:true
			}).then(data=>{
				this.leftDomsTop = data.map(v=>{
					this.cateItemHeight = v.height
					return v.top
				})
			})		
			// 获取右侧节点
			this.getElInfo({
				all:'right',
				size:false,
				rect:true
			}).then(data=>{
				this.rightDomsTop = data.map(v=> v.top)
			})
		},
		
		methods: {
			onShow(){
				//取出已经选择的店铺
				this.currentShop = this.$Util.getCache('current_shop');
				
			},
			onLoad(){
				//后面加一个店铺商品判断
				this.$H.post('/mannerdish/goods/goodslist',{},{
					token:false,
				}).then((res)=>{
					//商品种类
					this.cate = res
					this.list = res
					this.url = this.$H.common.ul
				}),
				// 加载动画
				this.$nextTick(()=>{
					this.showLoading = false
				})
			},
			...mapMutations([
				'addGoodsToCart'
			]),
			
			changeNum(e,item){
			    this.currentGoods.num = e
			},
			// 加入购物车
			addCart(){
				// 组织数据,点击当前商品，获取当前商品
				let goods = this.currentGoods;
				//当前选中的
				goods['option']['options'] = this.newoptions
				//当前规格str
				goods['checkedSku'] = this.checkedSkus
				//当前商品总价
				goods['showPrice'] = this.showPrice
				//选中状态
				goods['checked'] = true
				//当前商品
				goods['num'] = this.goodsNum
				// 加入购物车 本地添加
				//this.addGoodsToCart(goods)
				//加入购物车 直接线上加入redis缓存
				this.$H.post('/mannerdish/cart/updateCart',{
					goods_info:JSON.stringify(this.currentGoods)
				},{
					token:true
				}).then(res=>{
					// 隐藏筛选框
					this.hide('attr')
					// 成功提示
					uni.showToast({
						title: '加入成功'
					});
					//清空当前商品和当前商品数量
					this.currentGoods = [];
					this.goodsNum = 1;
					// 加入后跳转购物车
					uni.navigateTo({
						url:"../../pages/mannercart/mannercart"
					})
				})
			},
			
			/**
			 * 隐藏商品规格
			 * @param {Object} key
			 */
			hide(key){
				this.popup[key] = 'hide'
				setTimeout(()=>{
					this.popup[key] = 'none'
				}, 200);
			},
			
			/**
			 * 商品点击后显示规格弹窗
			 * @param {Object} key
			 * @param {Object} index2
			 */
			show(key,index,index2){
				console.log(index,index2)
				//确认当前商品下标
				this.goodsIndex = index2
				//当前商品信息，把点击的信息传递到currentGoods{}内
				this.currentGoods = this.list[index]['goods'][this.goodsIndex];
				this.currentGoods.num = 1;
				//设置当前的规格
				this.newoptions =  this.list[index]['goods'][this.goodsIndex]['option']['options'];
				//显示规格
				this.popup[key] = 'show';
			},
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
			},
			//获取节点信息
			getElInfo(obj = {}){
				return new Promise((res,rej)=>{
					let option = {
						size:obj.size ? true : false,
						rect:obj.rect ? true : false,
						scrollOffset:obj.scrollOffset ? true : false,
					}
					const query = uni.createSelectorQuery().in(this);
					let q = obj.all ? query.selectAll(`.${obj.all}-scroll-item`):query.select('#leftScroll')
					q.fields(option,data => {
						res(data)
					}).exec();
				})
			},
			getData(){
				
			},
			//点击左边当前分类，传值index
			changeCate(index){
				// 如果此时点击的index等于循环到的那个商品index
				this.activeIndex = index
				//右侧scroll-view滚动到制定区块,点击左侧，此时右侧对应商品联动成功
				this.rightScrollTop = this.rightDomsTop[index]
			},
			/**
			 * 选择店铺
			 */
			selectShop()
			{
				//跳转导选择店铺的页面
				uni.navigateTo({
					url:"../../pages/mannershop/listshop"
				})
			},
			
			//打开地图
			openMap()
			{
// 				latitude	Float	是	纬度，范围为-90~90，负数表示南纬
// longitude	Float	是	经度，范围为-180~180，负数表示西经
// scale	INT	否	缩放比例，范围5~18，默认为18
// name
				let obj = {
					latitude: parseFloat(this.currentShop.lat),
					longitude: parseFloat(this.currentShop.lng),
					name:  this.currentShop.address + this.currentShop.name
				}
				uni.openLocation(obj)
			},
			// 监听右边滚动事件
			async onRightScroll(e){
				// 匹配当前scrollTop所处的索引
				this.rightDomsTop.forEach((v,k)=>{
					if (v < e.detail.scrollTop + 3) {
						this.activeIndex = k
						return false
					}
				})
			},
		}	
	}
</script>
<style>
	.uparse .p{ padding: 0!important; }
	.uparse view,.uparse uni-view{ line-height: 0!important; }
	.class-active{
		border-left: 8upx solid #FD6801;color: #FD6801!important;
	}
	.all{
		position: relative;
		width: 100%;
	}
	.card1{
		position: absolute;
		background-color: #ffffff;
		box-shadow: 0 1upx 10upx 5upx #cccccc;
		padding: 30upx;
		border-radius: 10upx;
		width: 80%;
		margin-left: 6%;
		top: 220upx;
		z-index: 1999;
		
	}
	.cardname>view:last-child{
		width: 80upx;
		font-size: 25upx;
		background-color: #6b0000;
		border-radius: 50upx;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40upx;
		margin: 6upx 0 0 8upx;
	}
	.cardaddress{
		margin-top: 20upx;
		color: #c7c7c7;
	}
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
		/* display: flex;	 */
		/* position: absolute; */
		/* width: 100%; */
		/* overflow: hidden; */
	}
	.start{
		color: #9e9e9e;
	}
	.current {
		position: relative;
		z-index: 0;
		background-color: #fff;
		color: #000000;
		border-left: 8upx solid #6d0000;
	}

	.menu-wrapper {
		text-align: center;
		width: 15%;
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
		
	}


	.food,.content {
		/* margin-top: 20upx; */
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

	}
	.food>view:last-child{
		margin: 40upx 40upx 0 0;
	}
	
	.coffee{
		margin-left: 20upx;
	}
	.coffee>view:first-child{
		font-size: 30upx;
		font-weight: 600;
	}
	.coffee>view:last-child{
		font-size: 25upx;
		color: #9a9a9a;
	}
	/* /////////////////////// */
	
	/* 商品详情 */


		
	/* 复选框样式修改(原生基础上修改) */
	
		
	/* 冰量样式 */
	
</style>
