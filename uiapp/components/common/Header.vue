<template>
	<view class="header-search">
		<view class="header-search-main" @click="search">
			<view class="search-main-text">
				<u-icon name="search" size="21"></u-icon>
				<text>搜索</text>
			</view>
		<view>
			<u-icon name="scan" size="21"></u-icon>
		</view>
		</view>
		
		<view class="rigth">
			<u-icon name="chat" size="21"></u-icon>
		</view>
	</view>
</template>
<script>
	export default{
		methods:{
			search(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			}
		}
	}
</script>
<style>
	.header-search{
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		padding: 29rpx;
	}
	.header-search-main{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 570rpx;
		padding: 0 20rpx;
		height: 61rpx;
		background: rgba(240, 241, 243, 0.39);
		border-radius: 31rpx;
	}
	.search-main-text{
		display: flex;
	}
	.search-main-text text{
		padding-left: 20rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #848E94;
	}
</style>