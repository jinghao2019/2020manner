<template>
	<view class="all">
		<view class="title">
			<image src="../../static/img/title.png" mode="widthFix"></image>
		</view>
			
		<view class="list u-f">
			<image src="../../static/img/img1.png" mode="widthFix" @click="toList()"></image>
			<image src="../../static/img/img2.png" mode="widthFix" @click="toOrder()"></image>
			<image src="../../static/img/img3.png" mode="widthFix" @click="info()"></image>
		</view>
		
		<view class="banner" @click="showAgree()">
			<image src="../../static/img/banner.png" mode="widthFix"></image>
			
		</view>
		
		<view class="element">
			<image src="../../static/img/element.png" mode="widthFix"></image>
		</view>
		
		<scroll-view scroll-y class="shops-wrapper">
			<view class="near">
				<view>最近店铺</view>
			</view>
					
			<view class="nearshop" @click="showshop">
				<view>{{nearshop.shopname}}</view>
				<view class="u-f u-f-jsb">
					<view>{{nearshop.shopaddress}}</view>
					<view @click.stop="toList()">去点单</view>
				</view>
			</view>
					
			<view class="other">
				<view>其他店铺</view>
			</view>
					
			<view class="othershop" v-for="(item,index) in list" :key="index">
				<view>{{item.name}}</view>
				<view class="u-f u-f-jsb">
					<view>{{item.address}}</view>
					<view  @click="setCurrentShop(index)">去点单</view>
				</view>
			</view>		
			 
			 <!-- 店铺详情 -->
			<view class="shopdetail" v-show="show">
				<view class="u-f around">
					<view class="shopleft">
						<view class="u-f">
							<image src="../../static/icon/zuojiantou.png/" mode="widthFix" style="width: 40upx;margin-top: 12upx;margin-right: 10upx;"></image>
							<view class="shopname">{{nearshop.shopname}}</view>
						</view>
						
						<view class="shopinfo1">{{nearshop.shopaddress}}</view>
						<view class="shopinfo">联系电话: {{nearshop.tel}}</view>
						<view class="shopinfo1">周一~周五 08:00~18:00</view>
						<view class="shopinfo">周六/周日 08:30~16:30</view>						
					</view>
					<view class="shopright u-f">
						<view>
							<image src="../../static/img/定位.png" mode="widthFix" style="width: 45upx;"></image>
						</view>
						<view>
							<image src="../../static/img/电话.png"  mode="widthFix" style="width: 45upx;"></image>
						</view>
					</view>
				</view>
				<view class="u-f u-f-jsb">
					<view></view>
					<view class="ok" @click="go()">去点单</view>
				</view>
			</view>
		</scroll-view>
			
			<!-- 蒙版1 -->
			<view class="mask" @click="hidedeatil()" v-show="show"></view>
			<!-- 蒙版2 -->
			<view class="mask2"  v-show="show2"></view>
					
			
			<view class="allbottom" v-show="agree">
				<view class="close" @click="closeagree()">
					<image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;float:right;padding: 28upx 28upx 0 0;"></image>
				</view>
					<view class="bottom">						
						<view>欢迎来到Manner咖啡</view>
						<view style="font-size: 24upx;color: #9B9B9B;">Manner申请获取您的地址与微信账号信息</view>
						<view class="agree u-f-ajc">同意授权</view>
					</view>
			</view>
				
	</view>	
</template>

<script>
	 // import popupLayer from '@/components/popup-layer/popup-layer.vue';
	 
	export default{
		components: {
			// popupLayer
			},
		data(){
			return {
				agree:false,
				// 最近的店铺信息
				nearshop:{ 
					"shopname":"" ,
					"shopaddress":"" ,
					},
					
				// 其他店铺信息
				list:[],
				// boolShow:false 
				// 点击店铺的遮罩
				show:false,
				show2:false,
			}
		},				
		methods:{
			onReachBottom:function(){
				 // 这里向后台请求触底刷新数据
				 console.log('触底了，触发触底事件')
			 },
			//点击显示店铺的事件
			showshop(){
				this.show=true;				
			},
			//点击隐藏店铺的事件
			hidedeatil(){
				this.show=false;
			},
			//点击授权弹框
			showAgree(){
				this.agree = true;
				this.show2 = true
			},
			//点击关闭授权弹框
			closeagree(){
				this.agree = false;
				this.show2 = false
			},
			// 跳订单页
			toList(){
				uni.switchTab({
					url:"../../pages/mannerlist/mannerlist"
				})
			},
			// 跳订单页
			go(){
				uni.switchTab({
					url:"../../pages/mannerlist/mannerlist"
				})
			},
			// 跳订单页
			toOrder(){
				uni.switchTab({
					url:"../../pages/mannerorder/ordertoday"
				})
			},
			// 提示消息
			info(){
				uni.showLoading({
				    title: '敬请期待'
				});
				setTimeout(function () {
				    uni.hideLoading();
				}, 1000);
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
			/**
			 * 
			 * 请求数据
			 * @param {Object} cb
			 */
			async loadData(lng,lat,cb)
			{
				this.$H.get('/mannerdish/index/index?lng='+lng+'&lat='+lat,{},{
					// 这里测试先不用token				
					token:false,
				}).then((res)=>{
					// 最近店铺
					this.data = res
					//店铺列表存为缓存
					this.$Util.setCache("shop_list",res,0);
					this.nearshop.shopname = this.data[0].name
					this.nearshop.shopaddress = this.data[0].address
					this.nearshop.tel = this.data[0].tel
					//删除下标为0，长度为1的一个数据
					let current_shop = this.data.splice(0,1)
					//其他店铺
					this.list = this.data
					//设置最近店铺为当前店铺 如果用户选择其他店铺 要做店铺改变
					this.$Util.setCache("current_shop",current_shop[0],0);
					// console.log(this.list)
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
					//执行回调 如果有的话
					cb && cb(res)
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
				        // console.log('当前位置的经度：' + res.longitude);
				        // console.log('当前位置的纬度：' + res.latitude);
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
	
		}
	}
</script>

<style>
	.shops-wrapper{
		height: 380rpx;
	}
	.all{
		background-color: #f2f2f2;
	}
	.title>image{
		width: 100%;
	}
	.list{
		width: 90%;
		margin: auto;		
	}
	.list>image{
		width: 25%;
		margin: auto;
	}
	.banner{
		width: 85%;
		margin: 20upx auto;		
	}
	.banner>image{
		width: 100%;
		border-radius: 20upx;
		box-shadow: 0 1upx 10upx 5upx #cccccc;
	}
	.element{
		width: 85%;
		margin: 0 auto;
	}
	.near,.other{
		width: 85%;
		margin: auto ;
	}
	.near>view:first-child,
	.other>view:first-child{
		font-size: 30upx;
		font-weight: 600;
	}
	.nearshop,.othershop{
		width: 80%;
		background-color: #ffffff;
		border-radius: 10upx;
		padding: 25upx;	
		margin: 20upx auto;
		box-shadow: 0 1upx 10upx 5upx #cccccc;
	}
	.nearshop>view>view:first-child,
	.othershop>view>view:first-child{
		font-size: 25upx;
	}
	.nearshop>view:first-child,
	.othershop>view:first-child{
		font-size: 30upx;
		font-weight: 600;
	}
	.nearshop>view:last-child,
	.othershop>view:last-child{
		font-size: 10upx;
		color: #a6a6a6;
	}
	.nearshop>view>view:last-child,
	.othershop>view>view:last-child{
		color: #ffffff;
		background-color: #e80000;
		width: 100upx;
		border-radius: 50upx;
		font-size: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 20upx;
	}
	.shopdetail{	
		position: fixed;
		width: 100%;
		bottom: 0;
		background-color: #F8F8F8;
		box-shadow: 0 0 20upx 1upx;
		z-index: 8888;
	}
	.around{
		padding: 40upx;
		display: flex;
		justify-content: space-around;
	}
	.shopleft{
		flex: 4;
	}
	.shopright{
		flex: 1;
	}
	.shopright>view{
		margin-left: 25upx;
	}
	.ok{
		width: 200upx;
		height: 80upx;
		border-radius: 50upx;
		background-color: #d10003;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 30upx 60upx 0;
		font-weight: 600;
	}
	.shopname{
		font-size: 35upx;
		font-weight: 600;
		color: #5b5b5b;
	}
	.shopinfo1,.shopinfo{
		font-size: 25upx;
		color: #888888;
		margin-left: 50upx;
	}
	/* 蒙版 */
	.mask,.mask2{
		position: fixed;
		z-index: 2000;
		right: 0;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 2021;
		background-color:  #00000082;
	}
	.allbottom{
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 9998;
	}
	.bottom{
		padding: 20upx 76upx 30upx 76upx;		
		z-index: 9996;		
		
	}
	.agree{
		width: 610upx;
		height: 88upx;
		color: #FFFFFF;
		font-size: 36upx;
		font-weight: 600;
		border-radius: 10upx;
		margin-top: 40upx;
		background: -webkit-linear-gradient(left,#DB2C24,#79041C);
	}
	.close{
		z-index: 9997;
	}
</style>
