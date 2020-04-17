<template>
	<view>
		<image src="../../static/首页临时.jpg" mode="widthFix" style="width: 100%;"></image>
		<view class="uni-tab-bar">
			<scroll-view scroll-x="true" class="uni-swiper-tab">
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
				<swiper-item v-for="(items,index) in goodslist" :key="index">
					 <scroll-view scroll-y="true" class="list">
						 <block v-for="(item,index1) in items.list" :key="index1">
							 
							<view class="goods u-f">
								<view class="goodsimg">
									<image src="../../static/icon/咖啡.png" mode="widthFix"></image>
								</view>
								<view class="goodsname">
									<view class="name">{{item.name}}</view>
									<view class="describe">{{item.describe}}</view>
									<view class="price">￥15</view>
								</view>
								<view class="goodsadd">
									<image src="../../static/icon/加号.png" mode="widthFix" @click="showdeatil"></image>
								</view>
							</view>
						
						 </block>					 
					 </scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
		<view class="detail" v-show="show">
			我在哪里？？？？？？
		</view>
		<view class="mask"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				swiperheight: 500,
				tabIndex: 0,
				tabBars: [
					{ name:"推荐",id:"tuijian" 	 },
					{ name:"咖啡",id:"kafei" 	 },
					{ name:"手冲",id:"shouchong"  },					
					{ name:"饮品",id:"yinpin" 	 },
				],
				
				goodslist: [
					{
						
						list: [
							{
								name: "美式",
								describe:"口感香醇浓欧"
							},
							{
								name: "美式",
								describe:"口感香醇浓欧"
							},
							{
								name: "美式",
								describe:"口感香醇浓欧"
							},
							{
								name: "美式",
								describe:"口感香醇浓欧"
							}
						]
					},
					{
						list: [
							{
								name: "拿铁",
								describe:"更多人的选择"
							}
						]
					},
					{
						list: [
							{
								name: "澳白",
								describe:"奶泡更薄，口感更顺滑",
							}
						]
					},
					{
						list: [
							{
								name: "拿铁",
								describe:"更多人的选择"
							}
						]
					}
				]
			}
		},
		methods: {
			//点击显示详情的事件
			showdeatil(){
				this.show=true;
			},
			tabtap(index){
				this.tabIndex=index;
			},
			tabChange(e){
				this.tabIndex=e.detail.current;
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight-uni.upx2px(524)
					this.swiperheight=height;
				}
			})
		}
	}
</script>

<style>
/* 顶部导航样式 */
.active .swiper-tab-line{
		width: 70upx;
		margin: auto;
		border-bottom: 6upx solid #6c0000;
		border-radius: 50upx;
	}
/* 菜单样式 */
.goods{
	margin-top: 25upx;
}
.goodsimg{
	flex: 1;
	padding-left: 35upx;
}
.goodsimg>image{
	width: 135upx;
}
.goodsname{
	flex: 2;
	color:#ffffff;
}
.name{
	font-size: 35upx;
	font-weight: 600;
}
.describe{
	font-size: 25upx;
}
.goodsadd{
	flex: 1;
}
.goodsadd>image{
	width: 55upx;	
	float: right;
	top: 80upx;
	margin-right: 35upx;
}

/* 详情及购物车 */

.detail{
	width: 100%;
	height: 500upx;
	z-index: 1000;
	background-color: #09BB07;
	position: fixed;
	bottom: 0;
}
</style>
