<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 初始化登录状态
			this.$store.commit('initUser');
			// 更新购物车数据
			// this.$store.dispatch('updateCartList')
			// 监听购物车更新
			uni.$on('updateCart',(res)=>{
				this.$store.dispatch('updateCartList')
			})
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		} 
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入官方css库 */
	@import './common/uni.css';
	/* 引入自定义图标库 */
	@import './common/icon.css';
	/* 引入公共样式*/
	@import './common/common.css';	
	@import './common/common1.css';
	/* 第三方动画库 */
	@import "/common/animate.css";
	/* UI基础库 */
	@import "/common/zcm-main.css";
</style>
