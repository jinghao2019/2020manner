<template>
	<view class="all" style="height: 100%;box-sizing: border-box;position: absolute;">			
				<image src="../../static/img/列表title1.png" 
				mode="widthFix" 
				style="width: 100%;"
				@tap="showCart()"
				>
				</image>
				<view class="card1  animated bounceInRight">
					<view class="u-f cardname u-f-jsb">
						<view>{{currentShop.name}}</view>
						<view>当前店铺</view>
					</view>
					<view class="u-f u-f-jsb cardaddress">
						<view class="u-f">
							<view style="font-size: 24upx;">{{currentShop.address}}</view>
							<image @tap="openMap()" src="../../static/img/地图.png" 
							mode="widthFix" 
							style="width: 50upx;margin-left: 10upx;">
							</image>
						</view>
						<view style="font-size: 20upx;" @tap="selectShop()">更换地址</view>
					</view>
				</view>				
				<view style="padding: 40upx 40upx 20upx 45upx;background-color: #F7F7F7;">
					<view class="u-f">
						<view style="width: 6upx;height: 30upx;background-color: #B0B0BD;border-radius: 10upx;margin: 12upx 8upx;"></view>
						<view style="font-size: 32upx;font-weight: 600;">Manner咖啡厅</view>
					</view>
					
					<view style="font-size: 20upx;color: #4A4A4A;">根据所选门店库存状况,菜单可能不同,你可以多走两步,换一家门店试试。</view>
				</view>
			
			<!-- 列表部分 -->
			<view class="content"  :style="{height:height+'px'}" >						
				<scroll-view id="leftScroll" scroll-y 
				style="flex: 1;height: 100%;background-color: #F7F7F7;" 
				class="border-right border-light-secondary" 
				:scroll-top="leftScrollTop">
					<view :class="activeIndex === index ? 'class-active':''"
					hover-class="bg-light-secondary"
					v-for="(item,index) in cate" :key = "index"
					@tap="changeCate(index)"
					style="height: 88upx;align-items: center;">
						<view class="py-1 font-md left-text text-center "
						:class="activeIndex === index ? 'class-active':''">
						{{item.name}}	
						</view>
					</view>
				</scroll-view> 						
				<scroll-view scroll-y style="flex: 3.5;height: 100%;"
				:scroll-top="rightScrollTop"
				:scroll-with-animation="true"
				@scroll="onRightScroll" >					
					<view class="row right-scroll-item" v-for="(item,index) in list" :key="index">
						<view class="u-f span24-24  py-2  animated bounceInRight" v-for="(item2,index2) in item.goods" :key="index2" @click="show(index,index2)">
							
							<view class="px-2">
								<image wx:if="url + item2.thumb"  :src="url + item2.thumb" 
								style="width: 120upx;height: 120upx;border-radius: 10upx;">
								</image>
							</view>
							
							<view class="" >
								<view style="font-size: 28upx;font-weight: 600;color: #4A4A4A;">{{item2.title}}</view>
								<view style="font-size: 24upx;color: #4A4A4A;">默认:大杯/加冰</view>
							</view>
							
							<view class="u-f" >
								<view class="font-md" style="margin: 36upx 40upx;">￥{{item2.market_price}}</view>
								<image src="../../static/icon/加号.png" 
								mode="widthFix" 
								style="width: 44upx;margin-top: 42upx;margin-right: 60upx;">
								</image>
							</view>						
						</view>
					</view>
					<view style="height: 55upx;"></view>
				</scroll-view>				
			</view>			
			<!-- 属性筛选框 -->
					
			<!-- 新购物车筛选框 -->
			<view class="goodscard" v-show="showattr">
			<view class="banner animated fadeInUp">
				<!-- <image src=""></image> -->
			</view>
				<view  :class="specialcard? 'specialcardtop  animated fadeInUp':'attr  animated fadeInUp'" >
					<!-- <view v-show="specialcard" style="height: 130upx;"><image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;margin: 70upx 70upx;" @click="attrOff"></view> -->
					<view v-show="showattr" style="height: 100upx;"><image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;margin: 40upx 70upx;" @click="attrOff"></view>

						<view class="'attrtop" >
							<view :class="specialcard? 'goodstitle':'attrtop1'">{{currentGoods.title}}</view>
							<view v-show="!specialcard">丰富奶泡与浓缩结合，牛奶咖啡经典之作</view>
						</view>
					
					
					<scroll-view scroll-y style="height: 300upx;"  :class="specialcard? 'specialcardtop1':''">
						<view class="check">
							<!-- 遍历杯型 -->
							<block v-for="(item,index) in newoptions" :key="index">			
								<view class="size u-f" style="flex-wrap:wrap" v-if="item.isnum == 0 && item.isspecial == 0 && item.ismulti == 0">
									<view>{{item.name}}</view>
									<view class="u-f" style="flex-wrap:wrap;width: 500upx;">
										<!-- 遍历子规格 -->
										<block v-for="(item2,index2) in item.child" :key="index2">
											<view @click="selectSimple(index,index2)" :class="item.selected == index2 ? 'ischecked' : 'checked'" style="margin:0 30upx 10upx 0;">{{item2.name}} {{ item2.addPrice == 0 ? '' : '+￥' + item2.addPrice }}</view>
										</block>
									</view>							
								</view>
							</block>
							<!-- 遍历浓缩分数 -->
							<block v-for="(item,index) in newoptions" :key="index">
								<view class="size u-f" style="flex-wrap:wrap" v-if="item.isnum != 0 && item.isspecial == 0 && item.ismulti == 0">
									<view>{{item.name}}</view>
									<view style="margin: 16upx 0 0 40upx;">
										<uni-number-box :min="1" :max="9" :value="1" @change="coffeePiecesNumber($event,item,index)"></uni-number-box>		
									</view>
									<view>份{{item.name}}</view>
									<view style="color: #9B9B9B;font-size: 20upx;width:100%;text-align: center;margin: 10upx 0 20upx 0;">推荐咖啡浓度，MANNER咖啡师的灵魂配比</view>
								</view>
							</block>
							
						</view>
						</scroll-view>
						<view v-if="specialexist">
							<!-- 打开特调详情的按钮 -->
							<view class="u-f u-f-ajc button" @click="special()" v-show="!specialcard">
								<view>Manner 特调选项</view>
								<view><image src="../../static/icon/下箭头.png" mode="widthFix" style="width: 30upx;margin: 16upx 0 0 10upx;"></image></view>
							</view>
							<view class="u-f u-f-ajc button1" @click="special()" v-show="specialcard">
								<view>Manner 特调选项</view>
								<view><image src="../../static/icon/上箭头.png" mode="widthFix" style="width: 30upx;margin: 16upx 0 0 10upx;"></image></view>
							</view>
							
							<!--特调规格详情 -->
							<view v-show="specialcard" style="margin:30upx;" class="animated fadeInUp">
								
								<block v-for="(item,index) in newoptions" :key="index">
									<view class="u-f taste" v-if="item.ismulti == 1 && item.isnum == 0 && item.isspecial == 1">
										<view>{{item.name}}</view>
										<view class="u-f" style="flex-wrap: wrap;width:550upx;"> 
											<view v-for="(item2,index2) in item.child" :key="index2" class="u-f" @click="selectMulti(index,index2)">
												<view :class="item2.selected == 1  ? 'iscircle' : 'circle'"></view>
												<view :class="item2.selected == 1  ? 'isselect' : 'select'">{{item2.name}} {{ item2.addPrice == 0 ? '' : '+￥' + item2.addPrice }}</view>
											</view>
										</view>
									</view>
								
								
								</block>
								<!-- <block v-for="(item,index) in newoptions" :key="index">
									<view class="u-f taste" v-if="item.ismulti !== 1 && item.isnum !== 0 && item.isspecial !== 1">
										没有
									</view>
								</block> -->
								
							
							</view>
						</view>
					
						<view style="height: 170upx;"></view>
					
					<!-- 规格的底部信息模块 -->
					<view class="foot" style="margin-top:30upx;">
						<view style="font-size: 24upx;flex-wrap:wrap;width: 74%;padding: 0 40upx;">{{checkedSkus}}</view> 
						<view class="u-f">						
							<view style="flex: 1;" class="u-f">
								<uni-number-box :min="1" :max="9" :value="1" @change="changeGoodsNumber($event,item,index)"></uni-number-box>
								<view style="margin:10upx 0 0 4upx;color: #9B9B9B;">杯</view>
							</view>
							<view style="flex: 1.5;text-align: center;" class="u-f">
								<view style="margin:10upx 0 0 16upx;color: #9B9B9B;">总计:</view>
								<view style="font-size: 35upx;margin-top: 5upx;">￥{{showPrice*goodsNum}}</view> 
							</view>
							<view class="ok u-f-ajc" @tap="addCart()">确认</view>
						</view>
					</view>				
				</view>			
			</view>
			
			<!-- 底部小购物车 -->
			<view class="u-f cart" v-show="showcart" @tap="cart()">
				<view class="cartone">
					<image src="../../static/img/logo.png" mode="widthFix" style="width: 160upx;"></image>
					<view class="cartnum u-f-ajc">{{totalNum}}</view>
				</view>
				<view class="carttwo u-f-ajc">
					<view style="font-size: 24upx;color: #9B9B9B;">总价:</view>
					<view style="font-size: 38upx;color: #4A4A4A;font-weight: 600;">￥{{totalPrice}}</view>
				</view>
				<view style="flex:1;">
					<view class="cartthree u-f-ajc" @tap="submitOrder()">付款</view>
				</view>				
			</view>
			
			<!-- 全屏大购物车 -->
			<view class="allcart" v-show="shopping">
				<view style="height: 130upx;"><image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;margin: 70upx 70upx;" @tap="off"></image></view>
				<view style="padding: 0upx 72upx 10upx 72upx;box-shadow: 0 2upx 0 0 #cccccc;">
					<view style="font-size: 36upx;color: #131313;font-weight: 600;">购物车</view>
					<view class="u-f u-f-jsb">
						<view style="font-size: 26upx;color: #4A4A4A;">{{currentShop.name}}</view>
						<view style="font-size: 24upx;color: #4A4A4A;">门店自提</view>
					</view>
				</view>
				
				<!-- 这里循环数据 -->
				<scroll-view scroll-y  :style="{height:height+'px'}">
					<block v-for="(item,index) in cartlist" :key="index">
						<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
							<view style="flex: 3;">
								<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">{{item.title}}</view>
								<view style="font-size: 20upx;color: #4A4A4A;">{{item.checkedSku}}</view>
							</view>
							<view class="u-f" style="flex: 2;">
								<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥{{item.showPrice}}</view>
								<view style="margin: 28upx 0 0 0;">
									<uni-number-box :value="item.num" @change="changeCartNum($event,item,index)" @fun="clickBtn" :disabled="changenumBtn"></uni-number-box>
								</view>
							</view>
						</view>
					</block>
				</scroll-view>
				
				<!-- 底部付款模块 -->
				<view class="u-f pay" style="width: 100%;" >
					<view style="flex: 2;">						
					</view>					
					<view class="carttwo u-f-ajc" style="flex: 3;">
						<view style="font-size: 24upx;color: #9B9B9B;">总价:</view>
						<view style="font-size: 38upx;color: #4A4A4A;font-weight: 600;">￥{{totalPrice}}</view>
					</view>					
					<view style="flex:1;">
						<view class="cartthree u-f-ajc" @tap="submitOrder()">付款</view>
					</view>	
				</view>
			</view>
			<!-- 弹框地图 -->
			<view class="map" v-show="mask">
				<view class="u-f u-f-jsb">
					<view style="font-size: 35upx;">{{currentShop.name}}</view>
					<view class="u-f" style="margin-right: 50upx;">
						<view><image src="../../static/img/地图.png" 
							mode="widthFix" 
							style="width: 50upx;margin-right: 10upx;"></image></view>
						<view>5km</view>
					</view>
				</view>
				<view class="u-f u-f-jsb" style="margin: 20upx 0;">
					<view style="font-size: 25upx;">{{currentShop.address}}</view>
					<view style="font-size: 25upx;color: #ff0000;margin-right: 50upx;">当前店铺</view>
				</view>
				<view>
					<template>
					    <view>
					        <view class="page-body">
					            <view class="page-section page-section-gap">
					                <map style="width: 92%; height: 360upx;" :latitude="latitude" :longitude="longitude" :markers="covers">
					                </map>
					            </view>
					        </view>
					    </view>
					</template>
				</view>
				<view class="u-f u-f-jsb" style="margin: 20upx 0;">
					<view class="switch" @tap="selectShop()">切换店铺</view>
					<view class="sure" @tap="iAmSure()">确认</view>
				</view>
			</view>
			<!-- 弹框地图的蒙版 -->
			<view class="mapmask" v-show="mask"></view>
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
	
	// import uniNumberBoxx from "@/components/uni-number-boxx.vue"
	import {mapState,mapGetters,mapActions,mapMutations} from "vuex"

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
			uniNumberBox,
			// uniNumberBoxx
		},
		computed: {
			...mapState({
				cartlist:state=>state.cart.list,
				// popupShow:state=>state.cart.popupShow,
				changenumBtn:state=>state.cart.changenumBtn,
			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				'totalNum',
				'disableSelectAll',
				'popupData'
			]),
			//显示价格
			showPrice(){
				let attrPrice = 0;
				//遍历
				for(let i = 0;i<this.newoptions.length;i++)
				{
					// //先遍历普通规格
					if(this.newoptions[i].isnum == 0)
					{
						//普通规格加钱
						attrPrice += parseFloat(this.newoptions[i].child[this.newoptions[i].selected].addPrice)
					}
				} 
				return attrPrice + this.multiPrice + this.changePrice;
			},
			// 选中的sku
			checkedSkus(){
				//用lamda写法进行遍历
				let checkedSkus = this.newoptions.map(v=>{
				     if(v.isnum != 0 && v.isspecial == 0 && v.ismulti == 0){  //如果是数量选项
						if(v.isnum != 0)
						{
						   return this.coffeePieces + "份" + v.name
						}
					    
					}else if(v.isnum == 0 && v.isspecial == 0 && v.ismulti == 0){ //普通规格
						 return v.child[v.selected]['name'];
					}
				})
				
				checkedSkus = this.$Util.removeEmptyArrayEle(checkedSkus);
				//加上特调规格
				return (checkedSkus.join('/') + '/' + this.multiAttrStr.join('/')).trim('/')
			},
			
			
		},
		data () {
			return{
				// 弹框地图start
				id:0, 
				 // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/img/坐标.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/img/坐标.png'
				}],
				// 弹框地图end
				
				//弹框地图的蒙版
				mask:true,												
				//有和没有这个特调选项
				specialexist:false,
				//咖啡浓缩数量
				coffeePieces:1,
				//咖啡浓度的数量变化造成的价格变化
				changePrice:0,
				//多选的价格浮动数据 这个是曲线救国的策略
				multiPrice:0,
				//多选选项的规格
				multiAttrStr:[],
				//全屏大购物车
				shopping:false,
				//商品规格
				showattr:false,
				//底部小购物车
				showcart:false,
				//可视高度
				height:0,
				//商品规格的特殊选项
				specialcard:false,				
				//当前商品数量
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
				list:[],
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
			iAmSure(){
				this.mask = false
			},
			...mapMutations([
				'addGoodsToCart',
			]),
			
			...mapActions([
				'doSelectAll',
				'doDelGoods',
				'doShowPopup',
				'doHidePopup',
				'updateCartList',
				'addCartList'
			]),
			changeCartNum(e,item,index){
				var that = this;
				// 然后往后台发信息 对购物车数量进行相应的改变
				this.addCartList({
					'index':index,
					'num':e,
					'hashKey':item.hashKey,
				}).then(res => {  //请求完以后的操作
					this.updateCartList();  //更新购物车
				})
				//如果购物车清空 所有商品都减为0 那么就进行下面的操作
				if(this.cartlist.length == 0)
				{
					//关闭底部小购物车
					this.showcart = false;
					//打开全屏购物车
					this.shopping = false;
					
					this.specialcard = false;
				}
			},
			clickBtn(){
				//按钮
				this.changenumBtn = !this.changenumBtn
			},
			//咖啡浓缩数量的变化
			coffeePiecesNumber(value,index1,index2)
			{
				//改变浓缩数量
				this.coffeePieces = value
				this.newoptions[index2].isnum = value;
				this.changePrice = 5 * ( Math.ceil(value / 2) - 1);
				
			},
			
			changeGoodsNumber(value)
			{
				//改变商品数量
				this.goodsNum = value
			},
			// 点击弹出规格按钮
			showAttr(){
				this.showattr = !this.showattr
			},
			//点击关闭所有商品规格
			attrOff(){
				//清空当前商品和当前商品数量
				this.coffeePieces = 1;
				this.changePrice = 0;
				this.multiPrice = 0;
				//当前点击的商品
				this.currentGoods = [];
				this.newoptions = [];
				this.goodsNum = 1;
				
				//关闭选项卡
				this.showattr = false;
				this.specialcard = false;
			},
			// 点击弹出购物车按钮,测试用
			showCart(){
				this.showcart = !this.showcart
			},
			//点击购物车，隐藏小购物车，打开全屏购物车
			cart(){
				//关闭底部小购物车
				this.showcart = false
				//打开全屏购物车
				this.shopping = true
			},
			//点击关闭全屏购物车
			off(){
				this.shopping = false
				this.showcart = true
			},
			// 点击规格特调按钮,打开特调规格
			special(){
				this.specialcard = !this.specialcard;
				//特调是否展示判断
			},		
			onShow(){
				var that = this;
				//取出已经选择的店铺
				this.currentShop = this.$Util.getCache('current_shop');		
				// console.log(this.currentShop)
				//更新购物车
				this.updateCartList(res => {
					if(res.length > 0 )
					{
						that.showcart = true;
					}	
				});
			},
			onLoad(){
				var that = this;
				// this.__init()
				this.height = Number(uni.getSystemInfoSync().windowHeight) - 206;
				//可使用窗口高度减少55,可使用窗口高度是642
				//后面加一个店铺商品判断
				this.$H.post('/mannerdish/goods/goodslist',{},{
					token:false,
				}).then((res)=>{
					//商品种类
					this.cate = res
					this.list = res
					this.url = this.$H.common.ul
				});
				// 加载动画
				this.$nextTick(()=>{
					this.showLoading = false
				});
				
				// //更新购物车
				// this.updateCartList(res => {
				// 	if(res.length > 0 )
				// 	{
				// 		that.showcart = true;
				// 	}	
				// });
				
			},
			
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
				//当前商品数量
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
					this.coffeePieces = 1;
					this.changePrice = 0;
					this.multiPrice = 0;
					this.currentGoods = [];
					this.newoptions = [];
					this.goodsNum = 1;
					
					//关闭选项卡
					this.showattr = false;
					this.specialcard = false;
					//更新购物车
					this.updateCartList();
					this.off();
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
			show(index,index2){
				
				//确认当前商品下标
				this.goodsIndex = index2
				//当前点击的商品信息，把点击的信息传递到currentGoods{}内
				var currentGoods = this.$Util.deepClone(this.list[index]['goods'][this.goodsIndex]);
				this.currentGoods = currentGoods
			
				this.currentGoods.num = 1;
				//设置当前的规格
			    var newoptions =  this.$Util.deepClone(this.list[index]['goods'][this.goodsIndex]['option']['options']);
				
				this.specialexist = false
				//看是否有特调
				for(let i = 0;i<newoptions.length;i++){
					console.log('进来了')
					if(newoptions[i].isspecial == 1){
						this.specialexist = true
					}
				}
				
				this.newoptions = newoptions;
				console.log(this.newoptions)
				//显示规格
				this.showattr = true;
				//关闭底部购物车的按钮
				this.showcart = false;
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
				let obj = {
					latitude: parseFloat(this.currentShop.lat),
					longitude: parseFloat(this.currentShop.lng),
					name:  this.currentShop.address + this.currentShop.name
				}
				uni.openLocation(obj)
			},
			
			//单选项选择事件
			selectSimple(index,index2){
				this.newoptions[index].selected = index2;
			},
			//多选选择时间
			selectMulti(index,index2){
				let addPrice = 0;
				let attrStr = [];
				//取反操作
				this.$data.newoptions[index].child[index2].selected = !this.$data.newoptions[index].child[index2].selected ? 1 : 0 
				
				this.$forceUpdate()
				
				for(let i = 0;i<this.newoptions.length;i++)
				{
					//遍历加价钱的多选项
					if( this.newoptions[i].isnum == 0 && this.newoptions[i].isspecial == 1 && this.newoptions[i].ismulti == 1 ){ //多选加规格
						for(let j = 0;j<this.newoptions[i].child.length;j++)
						{
							if(this.newoptions[i].child[j].selected)
							{
								//多选规格加价钱
								addPrice += parseFloat(this.newoptions[i].child[j].addPrice)
								//规格内容
								attrStr.push(this.newoptions[i].child[j].name)
							}
							
						}
					}
				}
				//当前多选选项的规格
				this.multiAttrStr = attrStr
				//总价增加
				this.multiPrice = addPrice
				
			},
			/**
			 * 提交订单
			 */
			submitOrder()
			{
				//1 购物车订单数据入缓存
				this.$Util.setCache("current_order_info",this.cartlist,0);
				//2 跳转到订单结算页面 ordersubmit
				uni.navigateTo({
					url:"../../pages/mannerorder/ordersubmit"
				})
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
	.left-text{
		font-size: 28upx;
		color: #4A4A4A;
		height: 88upx;
		background-color: #F7F7F7;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.class-active{
		color: #000000!important;
		font-weight: 600;
		font-size: 32upx;
		margin-right: 2upx;
		background-color: white;
		
	}
	.all{
		position: relative;
		width: 100%;
	}
	.card1{	
		position: absolute;
		background-color: #ffffff;
		box-shadow: 0 1upx 10upx 5upx #cccccc;
		padding: 10upx 30upx 0 30upx;
		border-radius: 10upx;
		width: 80%;
		margin-left: 6%;
		top: 294upx;
		z-index: 1999;		
	}
	.cardname>view:first-child{
		font-size: 32upx;
	}
	.cardname>view:last-child{
		width: 80upx;
		font-size: 20upx;
		color: #B51C21;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40upx;
		margin: 6upx 0 0 8upx;
	}
	.cardaddress{
		margin-top: 5upx;
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
	/* 
	 新版规格
	 */
	.goodscard{
		box-shadow: 5upx 0 0 0 #cccccc;
		height: 100%;
	}
	.specialcardtop{
		width: 100%;
		height: 100%;
		background-color: #ffffff;
		position: fixed;
		z-index: 2002;		
		top: 0;			
	}
	.banner{
		height: 100%;
		width: 100%;
		background-color: rgba(90, 90, 90, 0.8);;
		position: fixed;
		z-index: 2000;
		top: 0;
		
			  -webkit-filter: blur(5px); /* Chrome, Opera */
		       -moz-filter: blur(5px);
		        -ms-filter: blur(5px);    
		            filter: blur(5px);
		
		
	}
	.attr{
		width: 100%;
		background-color: #ffffff;
		border-radius: 25upx 25upx 0 0;
		box-shadow: 10upx 0 0 0 #cccccc;
		position: fixed;
		z-index: 2001;		
		bottom: 0;	
	}
	.specialcardtop1{
		background-color: #F7F7F7;
	}
	.attrtop{
		text-align: center;
	}	
	.goodstitle{
		border: 1upx solid #f7f7f7;
		width: 100%;
		text-align: center;
		/* box-shadow: 2upx 10upx 10upx 10upx #efefef; */
		font-size: 36upx;
		z-index: 2020;
	}
	.attrtop1{
		font-size: 36upx;
		color: #131313;
	}
	.attrtop>view:last-child{
		font-size: 24upx;
		color: #4A4A4A;
	}
	.size>view:first-child
	,.ice>view:first-child
	,.milk>view:first-child
	,.espresso>view:first-child{
		font-size: 28upx;
		color: #4A4A4A;
	}
	.size>view
	,.ice>view
	,.milk>view
	,.espresso>view{
		margin-left: 40upx;
		margin-top: 20upx;
	}
	.check{
		margin: 20upx 40upx 20upx 40upx;
	}
	.checked{
		text-align: center;
		padding: 6upx 40upx;
		border-radius: 10upx;
		background-color: #EFF2F3;
	}
	.ischecked{
		text-align: center;
		padding: 6upx 40upx;
		border-radius: 10upx;
		background-color: #fffaea;
		color: #960F1E;
		border: 1upx solid #960F1E;
	}
	.ice1{
		border-radius: 50%;
		width: 28upx;
		height: 28upx;
		background-color: #EFF2F3;
		margin: 10upx 10upx 0 20upx;
	}
	.ice2{
		border-radius: 50%;
		width: 16upx;
		height: 16upx;
		background-color: #9C121E;
		margin: 20upx 10upx 0 20upx;
	}
	.circle{
		width: 28upx;
		height: 28upx;
		background-color: #EFF2F3;
		border-radius: 50%;
		margin: 11upx 2upx  0 40upx;
	}
	.iscircle{
		border-radius: 50%;
		width: 16upx;
		height: 16upx;
		background-color: #9C121E;
		margin: 19upx 10upx 0 46upx;
	}
	.isselect{
	  color: #9C121E;
	  width: 131upx;
	 }
	 .select{
	  width: 131upx;
	 }
	.button{
		height: 90upx;
		background-color: #FAF9F4;
	}
	.button1{
		
		color: #9D121E;
		height: 90upx;
		background-color: #FAF9F4;
	}
	.foot{
		padding: 0 0 10upx 0;
		position: fixed;
		bottom: 0;
		z-index:2021;		
		box-shadow: 0upx -1upx 0upx 0upx #0f0f0f,
	}
	.foot>view:first-child{
		color: #4A4A4A;
		font-size: 24upx;
		margin:20upx 0 0 38upx;
		padding-top: 10upx;
	}
	.taste>view:first-child{
		margin-left: 80upx;
	}
	.taste{
		margin-top: 20upx;
	}
	.foot>view:last-child{
		margin-top: 30upx;
	}
	.foot>view>view:first-child{
		margin-left: 20upx;
	}
	.ok{
		flex: 1.5;
		text-align: center;
		color: white;
		background: -webkit-linear-gradient(left,#DB2C24,#79041C);
		width: 266upx;
		height: 80upx;
		border-radius: 10upx;
	}
	
	/* 
	 购物车
	 */
	.cart{
		bottom: 0;
		width: 100%;
		z-index:2090;
		position: fixed;
		height: 100upx;
		background-color: white;
		box-shadow: 2rpx 0rpx 8rpx 2rpx #d4d4d4;
	}
	/* 购物车logo子绝父相	 */
	.cartone{
		flex:1;
		position: relative;
	}
	.cartone>image{				
		left: 38upx;
		bottom: 24upx;
		position: absolute;
		border-radius: 50%;
	}
	.cartnum{
		bottom: 108upx;
		left: 150upx;
		color: white;		
		width: 50upx;
		height: 50upx;
		z-index: 2091;
		border-radius: 50%;
		position: absolute;
		background-color: #DB2C24;
	}
	.carttwo{
		flex:1;
		
	}
	.cartthree{
	
		color: white;
		height: 80upx;
		width: 200upx;		
		font-size: 36upx;
		text-align: center;
		border-radius: 10upx;
		margin: 14upx 32upx;
		background: -webkit-linear-gradient(left,#DB3B33,#B1353E);		
	}
	.allcart{
		position: fixed;
		top: 0;
		height: 100%;
		width: 100%;
		z-index: 9000;
		background-color: #FFFFFF;
	}
	.pay{		
		bottom: 0;
		z-index: 9001;
		position: fixed;
		border-top: 1upx solid #e8e8e8;
	}
	/* 加载地图弹框 */
	.map{
		bottom: 0;
		height: 600upx;
		width: 90%;
		z-index: 9009;
		position: fixed;
		padding: 20upx 60upx 20upx 60upx;
		background-color: #ffffff;		
	}
	.switch{
		display: flex;
		width: 190upx;
		height: 66upx;
		background-color: #ffffff;
		color: #960F1E;
		border-radius: 50upx;
		border: 1upx solid #960F1E;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
	}
	.sure{
		display: flex;
		width: 190upx;
		height: 66upx;
		background-color: #960F1E;
		color: #ffffff;
		border-radius: 50upx;
		border: 1upx solid #ffffff;
		align-items: center;
		justify-content: center;
		font-size: 26upx;
		margin-right: 50upx;
	}
	.mapmask{
		top: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(90, 90, 90, 0.8);;
		z-index: 9008;
		position: fixed;
	}
</style>
