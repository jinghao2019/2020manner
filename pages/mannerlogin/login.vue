<template>
    <view class="pop">
            <button open-type="getUserInfo" @click="wxlogin">微信一键登录</button>
			<button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber" @tap="login">手机号登录</button>
    </view>
</template>

<script>
	import {mapMutations} from 'vuex';

    export default {
        data() {
            return {
                referer:null
            };
        },
		onLoad(option) {
			this.referer = option.referer ? option.referer : null
		},
        methods: {
			...mapMutations(['login']), 
			wxlogin(n){
				var that = this;
				
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    //获取code
				    let code = loginRes.code;
					uni.getUserInfo({
						provider: "weixin",
						success:function(infoRes){
							//拼接往后台发送的数据
							var data = {
								code: code,
								user_info: infoRes.rawData,
								encrypted_data:infoRes.encryptedData,
								iv: infoRes.iv,
								signature: infoRes.signature
							}
							 // console.log(infoRes.rawData)
							//发起登录请求
							that.$H.post('/mannerdish/user/login',data,{
								// 这里登录是没有token的情况不进行token检测
								token:false,
							}).then((res)=>{
								//vuex登录方法 进行登录状态存储
								that.login(res)
								//跳转操作跳转到登录前的页面
	                            if (that.referer) {
									console.log("nav1")
	                            	uni.switchTab({
	                            		url: that.referer,
	                            		// fail: that.toCenter(),
	                            	})
									
									uni.navigateTo({
										url: that.referer,
										// fail: that.toCenter(),
									})
	                            } else {
									console.log("nav2")
	                            	// this.toCenter()
									console.log("不知道要跳转到哪里")
	                            }
							})
							
						}
					})
					return				 
				  }
				});
			}
        }
    }
</script>

<style scoped>

</style>