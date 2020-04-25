<template>
	<view>
		<!-- 地图 -->
			<view class="uni-common-mt">
				<view>
					<map :latitude="latitude" :longitude="longitude" :markers="covers">
					</map>
				</view>
			</view>
		<!-- 标题 -->
		<view class="title u-f-ajc">门店选择</view>
		<view class="shopLists">
			<!-- 单独模块 -->
			<scroll-view scroll-y class="shops-wrapper">
				<view class="shopList" v-for="(item,index) in List" :key="index">
					<view class="name u-f">
						<view>{{item.name}}</view>
						<view class="u-f-ajc">当前店铺</view>
					</view>
					<view class="u-f u-f-jsb">
						<view class="u-f-ajc">
							<image class="" src="../../static/时间.png" mode="widthFix" style="width: 30upx;"></image>
							<view style="margin-left: 10upx;">{{item.time}}</view>
						</view>					
						<view>距您{{item.kg}}km</view>
					</view>
					<view class="u-f u-f-jsb">
						<view class="u-f-ajc">
							<image class="" src="../../static/定位.png" mode="widthFix" style="width: 30upx;"></image>
							<view style="margin-left: 10upx;">{{item.address}}</view>
						</view>
						<view class="u-f-ajc">						
							<view style="color: #ff557f;">查看详情</view>
							<image class="" src="../../static/letright.png" mode="widthFix" style="width: 35upx;margin-left: 6upx;"></image>
						</view>					
					</view>
					<view class="state u-f u-f-jsb">
						<view class="u-f-ajc">
							<view>营业状态:</view>
							<view>{{item.state}}</view>
						</view>				
						<view class="contact u-f">
							<view class="u-f-ajc">电话</view>
							<view class="u-f-ajc">导航</view>
						</view>
					</view>				
				</view>	
			</scroll-view>
			
				
				
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'map',
				latitude:  31.23916,
				longitude: 121.47918,
				covers: [{
					latitude: 39.9085,
					longitude: 116.39747,
					// #ifdef APP-PLUS
					iconPath: '../../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../../static/location.png',
					// #endif
				}, {
					latitude: 39.90,
					longitude: 116.39,
					// #ifdef APP-PLUS
					iconPath: '../../../static/app-plus/location@3x.png',
					// #endif
					// #ifndef APP-PLUS
					iconPath: '../../../static/location.png',
					// #endif
				}],
				List:[{ 
					"name":"商城路店",
					"time":"10:00-11:00",
					"kg":"24.5",
					"address":"上海市静安区",
					"state":"营业中",					
					 },
					{
					"name":"铜仁路店",
					"time":"10:00-11:00",
					"kg":"24.5",
					"address":"上海市静安区",
					"state":"营业中",					
					 },
					 {
					"name":"商城路店",
					"time":"10:00-11:00",
					"kg":"24.5",
					"address":"上海市静安区",
					"state":"营业中",					
					 },
					{
					"name":"铜仁路店",
					"time":"10:00-11:00",
					"kg":"24.5",
					"address":"上海市静安区",
					"state":"营业中",					
					 },
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
map {
		width: 100%;
		height: 500upx;
	}
	.shops-wrapper{
		height: 750upx;
	}
	.title{
		font-weight: 600;
		font-size: 35upx;
		height: 100upx;
		width: 100%;
	}
	.shopLists{
		height: 100%;
		background-color: #eaeaea;
		padding-bottom: 20upx;
		padding-left: 6%;
		padding-top: 2%;
		}
	.shopList{
		width: 85%;
		background-color: white;
		border-radius: 20upx;
		padding: 30upx;
		margin-top: 20upx;

	}
	.name>view:first-child{
		font-size: 35upx;
		font-weight: 600;
	}
	.name>view:last-child{
		background-color: #ff557f;
		color: white;
		font-size: 25upx;
		border-radius: 20upx;
		width: 150upx;
		margin-left: 30upx;
		height: 50upx;
	}
	.state{
		margin-top: 20upx;
		border-top:1upx solid #e6e1e7;
		padding-top: 20upx;
	}
	.state>view:first-child>view:first-child{
		font-size: 30upx;
	}
	.state>view:first-child>view:last-child{
		color: #ff557f;
		margin-left: 20upx;
		font-size: 28upx;
		font-weight: 600;
	}
	.contact>view{
		border:1upx solid #dddddd;
		border-radius: 20upx;
		width: 100upx;
	}
	.contact>view:first-child{
		margin-right:20upx;
	}
</style>
