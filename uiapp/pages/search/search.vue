<template>
	<view>
		<u-navbar @rightClick="rightClick" :autoBack="true" rightText="搜索">
			<view slot="center" class="search">
				<u-search placeholder="请输入课程名称" v-model="keyword" :focus="true" :showAction="false" :clearabled="false"
					height="0" @search="rightClick"></u-search>
			</view>
		</u-navbar>
		<view class="line"></view>
		<view class="search-history" v-if="historyList.length > 0">
			<view class="history-title">
				<view class="history-text">历史搜索</view>
				<view @click="removeHistory">
					<u-icon name="trash"></u-icon>
				</view>
			</view>
			<view class="history-list">
				<view v-for="(item,index) in historyList" :key="index" @click="historyitem(index)">{{item}}</view>
			</view>
		</view>
		<view class="search-hot">
			<view class="hot-title">
				<u-icon name="search" size="20"></u-icon>
				<view class="history-text">热门搜索</view>
			</view>
			<view class="hot-list">
				<view v-for="item in hotList" :key="item.id" @click="gethotList(item.keywords)">{{item.keywords}}<i
						class="fa-user"></i></view>
			</view>
		</view>
		<Foot/>
	</view>
</template>

<script>
	import {
		getHotKeywords,
		HotKeywords
	} from "@/api/home.js"
	import Foot from "@/components/common/foot.vue"
	export default {
		components: {
			Foot
		},
		data() {
			return {
				keyword: '',
				historyList: JSON.parse(uni.getStorageSync('historySearch')),
				hotList: []
			}
		},
		onLoad() {
			getHotKeywords().then(res => {
				this.hotList = res.list
			})
		},
		methods: {
			//搜索历史
			rightClick() {
				if (this.keyword.length > 20) {
					return
				}
				if (!this.keyword) {
					return;
				}
				let index = this.historyList.indexOf(this.keyword);
				const res = JSON.parse(uni.getStorageSync('historySearch'))
				if (res != null) {
					if (res.length > 20) {
						return alert("已达最大存储量！")
					} else {
						//判断重复
						if (index < 0) {
							this.historyList.unshift(this.keyword)
							uni.setStorageSync('historySearch', JSON.stringify(this.historyList))
							HotKeywords({
								keywords: this.historyList
							}).then(res => {
								console.log("计入+1")
							})
						} else {
							this.historyList.unshift(this.historyList.splice(index, 1)[0])
							uni.setStorageSync('historySearch', JSON.stringify(this.historyList))
						}
						//执行跳转
						uni.navigateTo({
							url:`/pages/search/search-list?key=${this.keyword}`
						})
					}
				}
			},
			//点击历史
			historyitem(index) {
				this.keyword = this.historyList[index];
			},
			//删除搜索历史
			removeHistory() {
				let that = this;
				uni.showModal({
					title: '你确定要删除历史记录吗？',
					success: function(e) {
						if (e.confirm == true) {
							that.historyList = []
							uni.setStorageSync('historySearch', JSON.stringify([]))
						}
					}
				})
			},
			//点击热门
			gethotList(val) {
				this.keyword = val
			}
		}
	}
</script>

<style>
	.line {
		width: 100%;
		height: 1rpx;
		background: rgba(241, 241, 241, 0.8);
		opacity: 1;
		margin-top: 120rpx;
	}

	.search {
		width: 527rpx;
	}

	/deep/.u-search__content {
		padding: 6rpx 20rpx;
	}

	.search-history {
		padding: 33rpx;
	}

	.history-title {
		display: flex;
		justify-content: space-between;
	}

	.history-text {
		font-size: 28rpx;
		font-weight: bold;
		color: #636363;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;
		padding-top: 33rpx;
	}

	.history-list view {
		padding: 5px 10px;
		margin: 10rpx;
		font-size: 20rpx;
		background-color: #e6e6e6;
		border-radius: 5px;
	}

	.history-list>view:nth-child(2n) {
		margin-left: 0 30rpx;
	}

	.search-hot {
		padding: 33rpx;
	}

	.hot-title {
		display: flex;
		padding-bottom: 33rpx;
		border-bottom: 1px solid #ccc;
	}

	.hot-list {
		display: flex;
		flex-wrap: wrap;
		padding-top: 33rpx;
	}

	.hot-list>view {
		display: flex;
		align-items: center;
		justify-content: center;
		justify-items: center;
		width: 33%;
		font-size: 29rpx;
		font-weight: 400;
		color: #333333;
		padding-top: 5px;
	}

	.hot-list>view:nth-child(1) .fa-user {
		width: 16px;
		height: 16px;
		background-image: url('@/static/icon/popular.png');
		background-size: cover;
	}

	.hot-list>view:nth-child(2) .fa-user {
		width: 16px;
		height: 16px;
		background-image: url('@/static/icon/popular.png');
		background-size: cover;
	}
</style>