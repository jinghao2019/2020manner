import $H from '@/common/lib/request.js';
import $U from '@/common/lib/util.js';
export default {
	state:{
		list:[],
		//选中列表（存放选中id）
		selectedList:[],
		//popup显示
		popupShow:"none",
		popupIndex:-1,
		changenumBtn:false
		// popupData:{}
	},
	getters:{		
		// 判断是否全选
		checkedAll:(state)=>{
			return state.list.length === state.selectedList.length
		},
		// 合计
		totalPrice:(state)=>{
			var total = 0
			state.list.forEach(v=>{
				if (state.selectedList.indexOf(v.hashKey) > -1) {
					total += v.showPrice*v.num
				}
			})
			return total
		},
		// 禁用全选 /无商品时/
		disableSelectAll:(state)=>{
			return state.list.length === 0
		},
		//拿到当前需要修改属性的商品
		popupData:(state)=>{
			
			return state.popupIndex > -1 ? state.list[state.popupIndex] : {}
		}
	},
	mutations:{
		// 初始化list
		initCartList(state,list){
			state.list = list
			list.forEach(v=>{
				state.selectedList.push(v.hashKey)
			})
		},
		//选中/取消某个商品
		selectItem(state,index){
			let hashKey = state.list[index].hashKey
			let i = state.selectedList.indexOf(hashKey)
			//之前选中,取消选中
			if(i > -1){
				//取消当前商品状态
				state.list[index].checked = false
				//移除选中列表的当前商品
				return state.selectedList.splice(i,1)
			}
			//选中
			state.list[index].checked = true
			state.selectedList.push(hashKey)
		},
		//全选
		selectAll(state){
			state.selectedList = state.list.map(v=>{
				// 设置选中状态
				v.checked = true
				return v.hashKey
			})
		},
		//取消全选
		unSelectAll(state){
			state.list.forEach(v=>{
				//设置选中状态
				v.checked = false
			})
			state.selectedList = []
		},
		//删除选中
		delGoods(state){
			state.list = state.list.filter(v=>{
				return state.selectedList.indexOf(v.hashKey) === -1
			})
		},
		//初始化popupIndex
		initPopupIndex(state,index){
			state.popupIndex = index			
		},
		// 加入购物车
		addGoodsToCart(state,goods){
			state.list.unshift(goods)
		}
	},
	actions:{
		// 更新购物车列表
		updateCartList({state,commit}){
			return new Promise((res,rej)=>{
				uni.showLoading({
				    title: '加载中'
				});
				$H.get('/mannerdish/cart/getCart',{},{
					token:true,
					toast:false
				}).then(result=>{
					// 取消选中状态
					commit('unSelectAll')
					// 赋值
					commit('initCartList',result)
					res(result)
					//隐藏加载框
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
					
				}).catch(err=>{
					rej(err)
					
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
				})
			})
		},
		
		// 增减购物车列表
		addCartList({state,commit},data){
			state.changenumBtn = true
			let flag = 'normal';
			if(data.num === 0) //如果数量减少倒0 说明是删除操作
			{
				//标识标记为删除
				flag = 'delete' 
				//删除对应的数组元素
				state.list.splice(parseInt(data.index),1);
				//重新初始化一下数组
				
			}
			// //promise同步请求
			return new Promise((res,rej)=>{
				uni.showLoading({
				    title: '加载中'
				});
				$H.get('/mannerdish/cart/addCartNum',{flag:flag,num:data.num,hashKey:data.hashKey},{
					token:true,
					toast:false
				}).then(result=>{
					setTimeout(function () {
					    uni.hideLoading();
						state.changenumBtn = false
					}, 1000);
					// 赋值
					res(result)
				}).catch(err=>{
					rej(err)
					
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
				})
			})
		},
		
		// 显示popup!!!
		doShowPopup({state,commit},index){
			commit('initPopupIndex',index)
			state.popupShow = 'show'			
		},
		//隐藏popup  结构赋值不知道啥意思↓({state})
		doHidePopup({state,commit}){
			state.popupShow = 'hide'
			setTimeout(()=>{
				state.popupShow = 'none' 
				commit('initPopupIndex',-1)
			},200) 
		},
		doSelectAll({commit,getters}){
			// true就删除,false就设置
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll')
		},
		doDelGoods({commit}){
			uni.showModal({
				content:'是否删除',
				success:(res)=>{
					if (res.confirm){
						commit('delGoods')
						uni.showToast({
							title:'删除成功'
						});
					}
				}				
			});
		}
	}
}