import $store from '@/store/index.js'
export default {
	// 全局配置
	common:{
		ul:"https://tpp.lymmsf.com/",
		baseUrl:"https://tpp.lymmsf.com/addons",
		header:{
			'Content-Type':'application/json;charset=UTF-8',
			'Content-Type':'application/x-www-form-urlencoded'
		},
		data:{},
		method:'GET',
		dataType:'json'
	},
	// 请求 返回promise
	request(options = {}){
		// 组织参数
		options.url = this.common.baseUrl + options.url
		options.header = options.header || this.common.header
		options.data = options.data || this.common.data
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType
		
		// token
		if (options.token) {
			options.header.token = $store.state.user.token
			// console.log('登录验证')
			// 二次验证
			if (!options.header.token) {
				console.log('二次登录验证')
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				
				// //获取当前页面
				let pages = getCurrentPages();
				let curPage = pages[pages.length-1];
				
				// return uni.navigateTo({
				// 	url: '/pages/mannerlogin/login?referer=/'+curPage.__route__,
				// });
				
				//这里进行页面 数据绑定改变
				// console.log(curPage.data)
				// curPage.data.agree = true;
				// curPage.data.accreditshow = true;
				
				// curPage.setData({
				// 	agree:true,
				// 	accreditshow:true
				// })
				
				//如果有回调就执行回调 这个回调主要是 改变上一个页面 授权窗口
				options.cb && options.cb()
			}
		}
		
		// 请求
		return new Promise((res,rej)=>{
			// 请求之前... todo
			// 请求中...
			uni.request({
				...options,
				success: (result) => {
					// 返回原始数据
					if(options.native){
						return res(result)
					}
					// 服务端失败
					if(result.statusCode !== 200){
						if (options.toast !== false) {
							uni.showToast({
								title: result.data.msg || '服务端失败',
								icon: 'none'
							});
						}
						return rej(result.data) 
					}
					//如果服务器没错那么就判断后台逻辑是否有错误
					if(result.data.code != 1){
						//不论如何在这里都要强制关闭loading
						uni.hideLoading()
						//对错误进行showtoast操作
						uni.showToast({
							title: result.data.msg || '服务端失败',
							icon: 'none'
						});
						//登录失败怎么办
						if(result.data.code == 200002 || result.data.code == 200003 || result.data.code == 200004 || result.data.code== 100001){
							//获取当前页面
							let pages = getCurrentPages();
							let curPage = pages[pages.length-1];
							console.log("direct to login page\n")
							return uni.navigateTo({
								url: '/pages/mannerlogin/login?referer=/'+curPage.__route__,
							});
						}
						//返回错误信息
						return rej(result.data);
					};
					// 成功
					let data = result.data.data
					res(data)
				},
				fail: (error) => {
					uni.showToast({
						title: error.errMsg || '请求失败',
						icon: 'none'
					});
					return rej()
				}
			});
		})
	},
	// get请求
	get(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	// post请求
	post(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	// delete请求
	del(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	},
}