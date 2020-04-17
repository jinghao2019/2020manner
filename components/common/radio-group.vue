<template>
	<view class="row">
		<view class="span24-7 px-2 mb-2" :key="index"
		v-for="(item,index) in label.child">
			<view class="rounded-50 px-1 font-sm text-center border1"
			:class="label.selected === index ? 'radio-active':'border1'"
			@click="changeRadio(index)">
				{{item.name}} <span style="padding-left:16upx;font-size:20upx;">{{item.addPrice != 0 ? '+￥'+item.addPrice : ''}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: Object,
		},
		methods: {
			changeRadio(index) {
				this.$emit('update:selected',index)
			}
		},
	}
</script>

<style scoped>
.border1{
	border: 2upx solid #6d0000;
	color: #6d0000;
}
.radio-active{
	border-radius: 50rpx;
	background: #6d0000!important;
	color: #ffffff!important;
	border-color: #6d0000!important;;
}
</style>
