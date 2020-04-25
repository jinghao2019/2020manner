<template>
	<view class="all  animated fadeIn" style="height: 100%;">
		<view class="title">
			<image src="../../static/img/title.png" mode="widthFix"></image>
		</view>
			
		<view class="list u-f">
			<image src="../../static/img/img1.png" mode="widthFix" @tap="toList()"></image>
			<image src="../../static/img/img2.png" mode="widthFix" @tap="toOrder()"></image>
			<image src="../../static/img/img3.png" mode="widthFix" @tap="info()"></image>
		</view>
		
		<!-- <view class="banner">
			<image src="../../static/img/banner.png" mode="widthFix"></image>	
		</view> -->
		
		<view class="element">
			<image src="../../static/img/element.png" mode="widthFix"></image>
		</view>
	
		<scroll-view scroll-y class="shops-wrapper  animated bounceInRight"  style="height: 57%;">
			<view class="near">
				<view>最近店铺</view>
			</view>
					
			<view class="nearshop" @tap="showshop">
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
					<view  @tap="setCurrentShop(index)">去点单</view>
				</view>
			</view>		
			
			 <!-- 店铺详情 -->
			
		</scroll-view>
			<view class="shopdetail animated bounceInRight" v-show="show">
				<view class="u-f around">
					<view class="shopleft">
						<view class="u-f">
							<image src="../../static/icon/zuojian.png" mode="aspectFit" style="width: 40upx;margin-top: 4upx;margin-right: 10upx;height: auto;"  @tap="hidedeatil()"></image>
							<view class="shopname">{{nearshop.shopname}}</view>
						</view>
						
						<view class="shopinfo1">{{nearshop.shopaddress}}</view>
						<view class="shopinfo">联系电话: {{nearshop.tel}}</view>

						<view class="shopinfo1">周一~周五 08:00~18:00</view>
						<view class="shopinfo">周六/周日 08:30~16:30</view>						
					</view>
					<view class="shopright u-f">
						<view>
							<image src="../../static/img/定位.png" mode="widthFix" style="width: 45upx;" @tap="openMap()"></image>
						</view>
						<view>
							<image src="../../static/img/电话.png"  mode="widthFix" style="width: 45upx;" @click="tel()"></image>
						</view>
					</view>
				</view>
				<view class="u-f u-f-jsb">
					<view></view>
					<view class="ok" @tap="setCurrentShop(index)" >去点单</view>
				</view>
			</view>
			<!-- 蒙版1 -->
			<view>
				<view class="shopmask" @tap="hidedeatil()" v-show="shopshow"></view>
			</view>
			
			
			
			<!-- 蒙版2 -->
			<view class="accreditmask"  v-show="accreditshow"></view>
			<!-- 蒙版3 -->
			<view class="phonenummask"  v-show="phonenumshow"></view>
			<!-- 蒙版4 -->
			<view class="templatemsgmask"  v-show="templatemsgshow"></view>
					

			<view class="allbottom" v-show="agreeUserInfo">
				<view class="close" @tap="closeagreeuserinfo()">
					<image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;float:right;padding: 28upx 28upx 0 0;"></image>
				</view>
					<view class="bottom">						
						<view>欢迎来到Manner咖啡</view>
						<view style="font-size: 24upx;color: #9B9B9B;">Manner申请获取您用户信息</view>
						<button class="agree u-f-ajc" open-type="getUserInfo" @tap="wxlogin()">同意授权</button>
					</view>
			</view>
			
			<view class="allbottom" v-show="agreePhoneNum">
				<view class="close" @tap="closeagreephonenum()">
					<image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;float:right;padding: 28upx 28upx 0 0;"></image>
				</view>
					<view class="bottom">						
						<view>欢迎来到Manner咖啡</view>
						<view style="font-size: 24upx;color: #9B9B9B;">Manner申请获取您的手机号码</view>
						<button class="agree u-f-ajc" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">同意授权</button>
					</view>
			</view>
			
			<view class="allbottom" v-show="agreeTemplateMsg">
				<view class="close" @tap="closetemplatemsg()">
					<image src="../../static/icon/叉.png" mode="widthFix" style="width: 30upx;float:right;padding: 28upx 28upx 0 0;"></image>
				</view>
					<view class="bottom">						
						<view>欢迎来到Manner咖啡</view>
						<view style="font-size: 24upx;color: #9B9B9B;">Manner申请您授权模板消息</view>
						<button class="agree u-f-ajc" open-type="getUserInfo" @tap="showTemp()">同意授权</button>
					</view>
			</view>
				
	</view>	
</template>

<script>
	import {mapMutations} from 'vuex';
	export default{
		components: {
			// popupLayer
			},
		data(){
			return {
				agreeUserInfo:false,
				agreePhoneNum:false,
				agreeTemplateMsg:false,
				// 最近的店铺信息
				nearshop:{ 
					"shopname":"" ,
					"shopaddress":"" ,
					},
					
				// 其他店铺信息
				list:[],
				// boolShow:false 
				// 点击店铺的遮罩
				shopshow:false,
				accreditshow:false,
				phonenumshow:false,
				templatemsgshow:false,
				show:false,
				height:0,
				currentShop:{}
			}
		},
		methods:{
			tel(){
			 	uni.makePhoneCall({			 	
			 	// 手机号
			    phoneNumber: '15515772417', 			
				// 成功回调
				success: (res) => {
					console.log('调用成功!')	
				},			
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
				}
				
			  });
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
			//vuex 方法载入
			...mapMutations(['login']), 
			wxlogin(){
				var that = this;
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					  console.log("loginRes--"+loginRes)
				    //获取code
				    let code = loginRes.code;
					uni.getUserInfo({
						provider: "weixin",
						success:function(infoRes){
							console.log("infoRes--"+infoRes)
							//拼接往后台发送的数据
							var data = {
								code: code,
								user_info: infoRes.rawData,
								encrypted_data:infoRes.encryptedData,
								iv: infoRes.iv,
								signature: infoRes.signature
							}
							 console.log(infoRes.rawData)
							//发起登录请求
							that.$H.post('/mannerdish/user/login',data,{
								// 这里登录是没有token的情况不进行token检测
								token:false,
							}).then((res)=>{
								//vuex登录方法 进行登录状态存储
								that.login(res)
								//跳转操作跳转到登录前的页面
								//拿手机号授权
								//关闭弹窗
								uni.showLoading({
									title:"loading",
									mask:true
								})
								that.agreeUserInfo = false;
								that.accreditshow = false;
								
								setTimeout(function(){
									uni.hideLoading()
									//打开消息模板授权
									that.agreeTemplateMsg = true;
									that.templatemsgshow = true;
								},1000)
								
								// that.showTemp()
							})
							
						}
					})
					return				 
				  }
				});
			},
			//进行手机授权
			//进行模板消息授权
			showTemp: function() {
				var that = this;
				wx.requestSubscribeMessage({  
				  tmplIds: ['nxyyDOAqE29fWEbvEM96ic-lv7W3LRuTJtO34zihDBk','FwqdpQ5V9rqfOM8vanxGHoxnaMHeyciPDenZssgwj7c'],  
				  success (res) {  //获取成功以后 取消遮罩层和弹窗
					  that.agreeTemplateMsg = false;
					  that.templatemsgshow = false;
					  console.log("success:"+res.errMsg + "---" + res.errCode);  
				  },  
				  fail (res) {  
					  console.log("fail:"+res.errMsg + "---" + res.errCode);  
				  },  
				  complete (res) {  
					  console.log("complete:"+res.errMsg + "---" + res.errCode);  
				  }  
				})  
			},
			onReachBottom:function(){
				 // 这里向后台请求触底刷新数据
				 console.log('触底了，触发触底事件')
			 },
			getPhoneNumber:function(e){
				var that = this;
			 	if (e.detail.errMsg != 'getPhoneNumber:ok') {  
			 
			 	} else {  
			 		//如果成功的话 先如数据库 然后更新本地缓存
			 		
			 		//然后激活模板消息授权
			 		
			 		//先关再开
			 		that.agreePhoneNum = false;
			 		that.phonenumshow = false;
			 		
			 		that.agreeTemplateMsg = true;
			 		that.templatemsgshow = true;
			 	}  
			 },
			//点击显示店铺的事件
			showshop(){
				this.show=true;		
				this.shopshow=true;
			},
			//点击隐藏店铺的事件
			hidedeatil(){
				this.show=false;
				this.shopshow=false;
			},
			//点击授权弹框
			showAgree(){
				this.agree = true;
				this.accreditshow = true
			},
			//关闭用户信息
			closeagreeuserinfo(){
				this.agreeUserInfo = false;
				this.accreditshow = false;
				
			},
			
	        //关闭模板消息
			closetemplatemsg(){
				this.agreeTemplateMsg = false;
				this.templatemsgshow = false;
			},
			// 跳订单页
			toList(){
				uni.switchTab({
					url:"../../pages/mannerlist/mannerlist1"
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
			  	url:"../../pages/mannerlist/mannerlist1"
			  })
			},
			
			/**
			 * 请求数据
			 * @param {Object} cb
			 */
			async loadData(lng,lat,cb)
			{
				var that = this;
				this.$H.get('/mannerdish/index/index?lng='+lng+'&lat='+lat,{},{
					// 这里测试先不用token				
					token:true,
					cb:function(){
						that.agreeUserInfo = true;
						that.accreditshow = true;
					}
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
				//取出已经选择的店铺
				this.currentShop = this.$Util.getCache('current_shop');	
				// this.height = Number(uni.getSystemInfoSync().windowHeight) - 310;
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
		/* height: 540upx; */
		position: absolute;
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
		z-index: 9000;
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
		z-index: 9001;
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
	.shopmask,.accreditmask,.phonenummask,.templatemsgmask{
		position: fixed;
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
		z-index: 8998;
	}
	.bottom{
		padding: 20upx 76upx 30upx 76upx;		
		z-index: 8996;		
		
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
		z-index: 8997;
	}
</style>
