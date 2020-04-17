<template>
	<view class="all" style="height: 100%;box-sizing: border-box;">			
				<image src="../../static/img/列表title1.png" 
				mode="widthFix" 
				style="width: 100%;"
				@click="showCart()"
				>
				</image>
				<view class="card1 animated flipInX">
					<view class="u-f cardname u-f-jsb">
						<view>{{currentShop.name}}</view>
						<view>离我最近</view>
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
						<view style="font-size: 32upx;font-weight: 600;" @click="showAttr()">Manner咖啡厅</view>
					</view>
					
					<view style="font-size: 20upx;color: #4A4A4A;">根据所选门店库存状况,菜单可能不同,你可以多走两步,换一家门店试试。</view>
				</view>
			
			<!-- 列表部分 -->
			<view class="content"  :style="{height:height+'px'}" >						
				<scroll-view id="leftScroll" scroll-y 
				style="flex: 1;height: 100%;background-color: #F7F7F7;" 
				class="border-right border-light-secondary " 
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
				<scroll-view scroll-y style="flex: 3.5;height: 100%;;"
				:scroll-top="rightScrollTop"
				:scroll-with-animation="true"
				@scroll="onRightScroll">					
					<view class="row right-scroll-item " v-for="(item,index) in list" :key="index">
						<view class="u-f span24-24  py-2 animated bounceInRight" v-for="(item2,index2) in item.goods" :key="index2" @click="show('attr',index,index2)">
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
				<view class="banner  animated fadeInDown"></view>
				<view  :class="specialcard? 'specialcardtop animated fadeInUp':'attr animated fadeInUp'">
					<!-- <view v-show="specialcard" style="height: 130upx;"><image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;margin: 70upx 70upx;" @click="attrOff"></view> -->
					<view v-show="showattr" style="height: 130upx;"><image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;margin: 70upx 70upx;" @click="attrOff"></view>
					<view class="'attrtop">
						<view :class="specialcard? 'goodstitle':'attrtop1'">冰拿铁咖啡</view>
						<view v-show="!specialcard">丰富奶泡与浓缩结合，牛奶咖啡经典之作</view>
					</view>
					<scroll-view scroll-y style="height: 500upx;"  :class="specialcard? 'specialcardtop1':''">
						<view class="check">
							<!-- 杯型 -->	
													
							<view class="size u-f" style="flex-wrap:wrap">
								<view>杯型</view>
								<view class="u-f" style="flex-wrap:wrap;width: 500upx;">
									<view class="ischecked" style="margin:0 30upx 10upx 0;">大杯</view>
									<view class="checked" style="margin:0 30upx 10upx 0;">小杯</view>
								</view>							
							</view>
							<view class="size u-f" style="flex-wrap:wrap">
								<view>加冰</view>
								<view class="u-f" style="flex-wrap:wrap;width: 500upx;">
									<view class="ischecked" style="margin:0 30upx 10upx 0;">少冰</view>
									<view class="checked" style="margin:0 30upx 10upx 0;">正常</view>
									<view class="checked" style="margin:0 30upx 10upx 0;">多冰</view>
								</view>							
							</view>
							<!-- 温度 -->
							<view>
								<view class="size u-f">
									<view>温度</view>
									<view class="checked">热</view>
									<view class="ischecked">冷</view>
								</view>
								<view class=" u-f" style="margin:40upx 0 0 120upx;">
									<view class="u-f">
										<view class="iscircle"></view>
										<view>标准</view>
									</view>
									<view class="u-f">
										<view class="circle"></view>
										<view>去冰</view>
									</view>
									<view class="u-f">
										<view class="circle"></view>
										<view>少冰</view>
									</view>
									<view class="u-f">
										<view class="circle"></view>
										<view>加冰</view>
									</view>
							</view>					
							</view>
							<!-- 奶品 -->
							<view class="size u-f" style="flex-wrap:wrap">
								<view>奶品</view>
								<view class="u-f" style="flex-wrap:wrap;width: 500upx;">
									<view class="checked" style="margin:0 30upx 10upx 0;">鲜牛奶</view>
									<view class="ischecked" style="margin:0 30upx 10upx 0;">燕麦奶+￥5</view>
									<view class="checked" style="margin:0 30upx 10upx 0;">豆奶</view>
									<view class="checked" style="margin:0 30upx 10upx 0;">鲜牛奶</view>
									<view class="ischecked" style="margin:0 30upx 10upx 0;">燕麦奶+￥5</view>
									<view class="checked" style="margin:0 30upx 10upx 0;">豆奶</view>
								</view>								
							</view>
							<!-- 浓缩 -->
							<view class="size u-f">
								<view>浓缩</view>	
								<view style="margin: 16upx 0 0 40upx;">					
									<uni-number-box :min="1" :max="9"></uni-number-box>					
								</view>
								<view>份浓度</view>
							</view>
							<view style="color: #9B9B9B;font-size: 20upx;text-align: center;margin: 10upx 0 20upx 0;">推荐咖啡浓度，MANNER咖啡师的灵魂配比</view>
							
						</view>
						</scroll-view>
						<!-- 打开特调详情的按钮 -->
						<view class="u-f u-f-ajc button" @click="special()" v-show="!specialcard">
							<view>Manner 特调选项</view>
							<view><image src="../../static/icon/下箭头.png" mode="widthFix" style="width: 30upx;margin: 16upx 0 0 10upx;"></image></view>
						</view>
						<view class="u-f u-f-ajc button1" @click="special()" v-show="specialcard">
							<view>Manner 特调选项</view>
							<view><image src="../../static/icon/上箭头.png" mode="widthFix" style="width: 30upx;margin: 16upx 0 0 10upx;"></image></view>
						</view>
						<!-- 特调规格详情 -->
						<view v-show="specialcard"class="animated fadeInUp" >
							<view class="u-f taste">
								<view>风味</view>
								<view class="u-f">
									<view class="iscircle"></view>
									<view class="isselect">肉桂粉</view>
								</view>
							</view>
							<view class="u-f taste">
								<view>豆子</view>
								<view class="u-f">
									<view class="circle"></view>
									<view>花魁浅烘 +￥5</view>
								</view>
							</view>
							<view class="u-f taste">
								<view>糖浆</view>
								<view class="u-f" style="flex-wrap:wrap;width: 450upx;">
									<view  class="u-f">
										<view class="circle"></view>
										<view class="select">原味糖浆</view>
									</view>
									<view  class="u-f">
										<view class="iscircle"></view>
										<view class="isselect">榛果糖浆</view>
									</view>
									<view  class="u-f">
										<view class="circle"></view>
										<view class="select">香草糖浆</view>
									</view>
									<view  class="u-f">
										<view class="circle"></view>
										<view class="select">桂花糖浆</view>
									</view>	
								</view>
							</view>						
						</view>
						<view style="height: 170upx;"></view>
					
					<!-- 规格的底部信息模块 -->
					<view class="foot">
						<view style="font-size: 24upx;">小杯/去冰/鲜牛奶/4份浓缩</view>
						<view class="u-f">						
							<view style="flex: 1;" class="u-f">
								<uni-number-box :min="1" :max="9"></uni-number-box>
								<view style="margin:10upx 0 0 4upx;color: #9B9B9B;">杯</view>
							</view>
							<view style="flex: 1.5;text-align: center;" class="u-f">
								<view style="margin:10upx 0 0 16upx;color: #9B9B9B;">总计:</view>
								<view style="font-size: 35upx;margin-top: 5upx;">￥20</view>
							</view>
							<view class="ok u-f-ajc">确认</view>
						</view>
					</view>				
				</view>			
			</view>
			
			<!-- 底部小购物车 -->
			<view class="u-f cart  animated slideInUp" v-show="showcart" @click="cart()">
				<view class="cartone">
					<image src="../../static/img/logo.png" mode="widthFix" style="width: 160upx;"></image>
					<view class="cartnum u-f-ajc">3</view>
				</view>
				<view class="carttwo u-f-ajc">
					<view style="font-size: 24upx;color: #9B9B9B;">总价:</view>
					<view style="font-size: 38upx;color: #4A4A4A;font-weight: 600;">￥65</view>
				</view>
				<view style="flex:1;">
					<view class="cartthree u-f-ajc">付款</view>
				</view>				
			</view>
			
			<!-- 全屏大购物车 -->
			<view class="allcart  animated slideInUp" v-show="shopping">
				<view style="height: 130upx;"><image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;margin: 70upx 70upx;" @click="off"></image></view>
				<view style="padding: 0upx 72upx 10upx 72upx;box-shadow: 0 2upx 0 0 #cccccc;">
					<view style="font-size: 36upx;color: #131313;font-weight: 600;">购物车</view>
					<view class="u-f u-f-jsb">
						<view style="font-size: 26upx;color: #4A4A4A;">南阳店</view>
						<view style="font-size: 24upx;color: #4A4A4A;">门店自提</view>
					</view>
				</view>
				
				<!-- 这里循环数据 -->
				<scroll-view scroll-y  :style="{height:height+'px'}">
					<view class="u-f animated bounceInRight" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
					<view class="u-f" style="padding: 10upx 54upx;border-bottom: 1upx solid #efefef;">
						<view style="flex: 3;">
							<view style="font-size: 28upx;color: #4A4A4A;font-weight: 600;margin: 16upx 0 0 0;">冰甜拿铁</view>
							<view style="font-size: 20upx;color: #4A4A4A;">小杯/加冰/桂花糖浆/肉桂粉/4份浓缩</view>
						</view>
						<view class="u-f" style="flex: 2;">
							<view style="font-size: 28upx;color: #4A4A4A;margin: 44upx 10upx 0 0;">￥20</view>
							<view style="margin: 28upx 0 0 0;"><uni-number-box :min="1" :max="9"></uni-number-box></view>
						</view>
					</view>
				</scroll-view>
				
				<!-- 底部付款模块 -->
				<view class="u-f pay" style="width: 100%;">
					<view style="flex: 2;">						
					</view>					
					<view class="carttwo u-f-ajc" style="flex: 2;">
						<view style="font-size: 24upx;color: #9B9B9B;">总价:</view>
						<view style="font-size: 38upx;color: #4A4A4A;font-weight: 600;">￥65</view>
					</view>					
					<view style="flex:1;">
						<view class="cartthree u-f-ajc">付款</view>
					</view>	
				</view>
			</view>
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
			uniNumberBox,
			// uniNumberBoxx
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
		onLoad(){	
			//没用
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
			// 点击弹出规格按钮,测试用
			showAttr(){
				this.showattr = !this.showattr
			},
			//点击关闭所有商品规格
			attrOff(){
				this.showattr = false
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
			},
			// 点击规格特调按钮,打开特调规格
			special(){
				this.specialcard = !this.specialcard;
			},		
			onShow(){
				//取出已经选择的店铺
				this.currentShop = this.$Util.getCache('current_shop');				
			},
			onLoad(){
				// this.__init()
				this.height = Number(uni.getSystemInfoSync().windowHeight) - 206;
				console.log(this.height)
				//可使用窗口高度减少55,可使用窗口高度是642
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
		height: 40%;
		width: 100%;
		background-color: #E5E5E5;
		position: fixed;
		z-index: 2000;
		top: 0;
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
		margin: -30upx 0 0 50upx;
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
</style>
