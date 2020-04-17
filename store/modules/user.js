import Util from "@/common/lib/util.js"
export default {
	
	state:{
		// 登录状态
		loginStatus:false,
		// token
		token:null,
		// 用户信息
		userInfo:{}
	},
	Util,
	mutations:{
		// 初始化登录状态
		initUser(state){
			let userInfo = Util.getCache('userInfo','')
			if (userInfo) {
				state.userInfo = userInfo
				state.token = userInfo.token
				state.loginStatus = true
			}
		},
		// 登录
		login(state,userinfo){
			state.userInfo = userinfo
			state.loginStatus = true
			state.token = userinfo.token
			Util.setCache("userInfo",userinfo,7200);
			// // 持久化存储
			// uni.setStorageSync('userInfo',JSON.stringify(userinfo))
		},
		// 退出登录
		logout(state){
			state.userInfo = {}
			state.loginStatus = false
			state.token = null
			Util.removeCache('userInfo')
		}
	}
}