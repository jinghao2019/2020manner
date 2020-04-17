<template>
	<view>
		<view class="title">
			<image src="../../static/img/title.png" mode="widthFix"></image>
		</view>
		
		
		<!-- 1.离我最近店铺 -->
		<view class="nearshop">
			<view class="u-f u-f-ac">
				<view>{{nearshop.name}}</view>
				<view>最近</view>
			</view>
			<view class="u-f u-f-jsb">
				<view>{{nearshop.address}}</view>
				<view>去点单</view>
			</view>
		</view>
		
		<!-- 2.循环出其他店铺 -->
		<scroll-view scroll-y="true" style="height: 750upx;">
		<block v-for="(item,index) in list" :key="index">
			<view class="othershop headtitle" v-show="item.status == 0">
				<view class="u-f u-f-jsb">
					<view>{{item.name}}</view>
					<view>距离{{item.distance}}km</view>
				</view>
				<view class="u-f u-f-jsb">
					<view>{{item.address}}</view>
					<view style="background-color: #dadada;">未开业</view>
				</view>
			</view>
			
			<view class="othershop" v-show="item.status == 1">
				<view class="u-f u-f-jsb">
					<view>{{item.name}}</view>
					<view>距离{{item.distance}}km</view>
				</view>
				<view class="u-f u-f-jsb">
					<view>{{item.address}}</view>
					<view @click="setCurrentShop(index)">去点单</view>
				</view>
			</view>
			
		</block>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		components:{
		},
		data() {
			return {
				page:1, //默认第一页
				refresh_tag:1, //开始加载数据的时候是0 加载完改为1  枷锁操作 
				list:[],	
				nearshop:{},
			}
		},
		computed:{
			
		},
		mounted() {
			
		},
		methods: {
			
			async loadData(lng,lat,cb)
			{
				this.$H.get('/mannerdish/index/index?lng='+lng+'&lat='+lat,{},{
					// 这里测试先不用token				
					token:false,
				}).then((res)=>{
					// 最近店铺
					this.data = res
					//最近店铺
					this.nearshop = this.data[0]
					//删除下标为0，长度为1的一个数据
					let current_shop = this.data.splice(0,1)
					//其他店铺
					this.list = this.data
					//关闭加载框
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
					//执行回调 如果有的话
					cb && cb(res)
				})				
			},	
				
		    /**
			 * 去店铺下单
			 */
			setCurrentShop(index){
			  //1 设置当前店铺到缓存
			  this.$Util.setCache("current_shop",this.list[index]);
			  //2 跳转到菜单页面
			  //跳转导选择店铺的页面
			  uni.switchTab({
			  	url:"../../pages/mannerlist/mannerlist"
			  })
			},
			onLoad(){		
					//这时候that指的是全局，在内部函数想用全局的时候就得用that
					var that = this;
					// 获取当前坐标
					wx.getLocation({
					    type:'wgs84',
					    success: function (res) {
							// 打印一下获取的经纬度
							uni.showLoading({
							    title: '加载中'
							});
							// 请求后台数据
							that.loadData( res.longitude, res.latitude,(res)=>{
							    // 将获取的data数据存入上边的List[]中
							    // that.List = res
							});
					    }
					});
					
				
			},
	
			//下拉刷新
			onPullDownRefresh:function(){
				console.log('刷新了')
			 },
			//触底事件
			onReachBottom:function(){
				 // 这里向后台请求触底刷新数据
				 console.log('触底了')
			 },
			
		},
		
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
	.tab{
		font-size: 28upx;
		background-color: #f5f5f5;
		height: 90upx;
		padding-left: 20upx;
		display: flex;
		align-items: center;
	}
	.tab.active{
		
		color:#f00;
	}
	.result{
		font-size: 25upx;
	}
	

	.nearshop,.othershop{
		width: 80%;
		background-color: #ffffff;
		border-radius: 10upx;
		padding: 25upx;	
		margin: 40upx auto;
		box-shadow: 0 1upx 10upx 5upx #cccccc;
	}
	.nearshop>view:last-child>view:first-child,
	.othershop>view:last-child>view:first-child{
		font-size: 25upx;
	}
	.nearshop>view:first-child,
	.othershop>view:first-child{
		font-size: 30upx;
		font-weight: 600;
	}
	.nearshop>view:first-child>view:last-child{
		font-size: 20upx;
		width: 80upx;
		height: 30upx;
		margin-left: 20upx;
		background-color: #710000;
	}
	.othershop>view:first-child>view:last-child{
		margin: auto 20upx ;
		font-size: 20upx;
		color: #ff6769;
	}
	.nearshop>view:last-child,
	.othershop>view:last-child{
		font-size: 10upx;
		color: #a6a6a6;
	}
	.nearshop>view>view:last-child,
	.othershop>view:last-child>view:last-child{
		color: #ffffff;
		background-color: #e82125;
		width: 100upx;
		border-radius: 50upx;
		font-size: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20upx;
	}
	.headtitle{
		color: #d5d5d5;
	}
</style>
