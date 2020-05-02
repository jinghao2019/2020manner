export default {
	//获取手机号的正则
	checkMobile(mobile){
		return RegExp(/^1[34578]\d{9}$/).test(mobile);
	},
	
	// 更新tabbar角标
	updateCartBadge(count){
		if(count > 0){
			return uni.setTabBarBadge({
				index:2,
				text:count.toString()
			})
		}
		uni.removeTabBarBadge({
			index:2
		})
	},
	// 判断订单状态
	formatStatus(order){
		if(!order){
			return ''
		}
		// 未支付
		if(!order.paid_time){
			return "待支付"
		}
		// 退款情况
		if(order.refund_status !== 'pending'){
			switch (order.refund_status){
				case 'applied':
				return '退款中'
					break;
				case 'success':
				return '退款成功'
					break;
				case 'failed':
				return '退款失败'
					break;
			} 
		}
		switch (order.ship_status){
			case 'pending':
			return '待发货'
				break;
			case 'delivered':
			return '待收货'
				break;
			case 'received':
			return '已签收'
				break;
		}
	},
	
	setCache(e, t, a) {
			// e下标
			// t值
			// a传过来的过期时间
			// i当前时间 
			// expire是过期时间点
			var i = +new Date() / 1e3, n = !0, o = {
			   expire: a ? parseInt(i + parseInt(a)) : 0,
			   value: t
			};
			try {
			// 设置缓存
			    wx.setStorageSync(e, o);
			} catch (e) {
				// n=!1  意思是false
			    n = !1;
			}
			return n;
	},
	
	//获取缓存
	// parseInt存整形
	getCache(e,t)
	{
		var i = +new Date() / 1e3, n = "";
		i = parseInt(i);
		
		//去处缓存
		// n = wx.getStorageSync(e);
	
		try{
			(n = wx.getStorageSync(e)).expire > i || n.expire == 0 ? n = n.value : (n = "", this.removeCache(e))
		}catch(e){
			n = void 0 === t ? "" : t;
		}	
		return n || t;
	},
	
	
	//删除缓存
	removeCache(e){
		var t = !0;		
		try{
			wx.removeStorageSync(e);
		}catch(e){
			t = !1;
		}
		return t;
	},
	
	//删除数组里面的undefined元素
	removeEmptyArrayEle(arr){    
	  for(var i = 0; i < arr.length; i++) {
	   if(arr[i] == undefined || arr[i] == 'undefined' || arr[i] == false) {
	      arr.splice(i,1);
	      i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
	                       // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
	    }
	   }
	   
	   // console.log(arr)
	   return arr;
	},
	
	//深拷贝方法
    deepClone(obj){
	    let _obj = JSON.stringify(obj),
	        objClone = JSON.parse(_obj);
	    return objClone
	}  
}