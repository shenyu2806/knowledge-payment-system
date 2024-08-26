<template>
	<view class="list">
		<Header></Header>
		<view class="list-main">
			<view class="list-l">
				<view v-for="(item,index) in firstList" :key="item.id" :class='item.id == current ? "active":""'
					@click="tabsFirst(item.id)">
					{{ item.categoryName }}
				</view>
			</view>
			<view class="list-r">
				<scroll-view scroll-y="true" :style="'height: '+swiperHeight+'px;'">
					<view>
						<view class="r-img">
							<image src="http://172.17.1.13:3000/images/navds.png"></image>
						</view>
						<view class="r-main">
							<view class="r-list-item" v-for="(item,index) in escondList" :key="index" @click="search(item.categoryName)">
								<image :src="item.thumbnail"></image>
								<text>{{item.categoryName}}</text>
								<view v-if="item.categoryName == null">
									<h1>还没有数据！</h1>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<Foot :childData="parentData" />
	</view>
</template>

<script>
	import {
		getFirstCategorys,
		getSecondCategorys
	} from "@/api/course.js"
	import Header from "@/components/common/Header.vue"
	import Foot from "@/components/common/foot.vue"
	import {mixin} from "@/mixins/mixin.js"
	export default {
		mixins:[mixin],
		components: {
			Header,
			Foot
		},
		data() {
			return {
				parentData:1,
				current: 0,
				firstList: [{
					id: 0,
					categoryName: "全部"
				}],
				escondList: [],
				past: {
					categoryId: 0
				},
				swiperHeight:0
			}
		},
		onReady(){
			this.swiperHeight = this.getHeight(".header-search");
		},
		onLoad() {
			//获取一级数据
			getFirstCategorys().then(res => {
				this.firstList = [...this.firstList, ...res.list]
			});
			this.getCategorys(this.past);
		},
		methods: {
			//获取二级数据
			getCategorys(past) {
				getSecondCategorys(past).then(res => {
					this.escondList = res.list
				})
			},
			//切换一级条目
			tabsFirst(index) {
				this.current = index
				this.past.categoryId = index
				this.getCategorys(this.past);
			},
			//跳到搜索页面
			search(name){
				uni.navigateTo({
					url:`/pages/search/search-list?key=${name}`
				})
			}
		},
	}
</script>

<style>
	.list {
		padding-right: 14px;
	}

	.list-main {
		display: flex;
		justify-content: space-between;
	}

	.list-l {
		width: 217rpx;
		line-height: 77rpx;
		font-size: 28rpx;
		color: #777777;
		text-align: center;
		background: rgba(247, 249, 255, 0.39);
	}
	
	.list-l > view{
		padding: 18rpx 0;
	}

	.list-r {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 20rpx;
	}

	.r-img {
		width: 469rpx;
		height: 192rpx;
		border-radius: 17rpx;
		background: #777777;
		border-radius: 5px;
	}

	.r-img image {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}

	.r-main {
		display: flex;
		flex-wrap: wrap;
	}

	.r-list-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 33%;
		margin-top: 44rpx;
	}

	.r-list-item image {
		width: 80rpx;
		height: 80rpx;
	}

	.r-list-item text {
		padding: 18rpx 0;
		font-size: 24rpx;
		color: #a9a9a9;
	}

	.active {
		position: relative;
		color: #3780EF;
		font-weight: 400;
	}

	.active:before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		width: 2rpx;
		height: 30%;
		transform: translateY(-50%);
		background: rgba(55, 128, 239, 0.27);
		border: 1rpx solid #0065FF;
		border-radius: 5rpx;
	}
	/* 隐藏滚动条 */
	/deep/::-webkit-scrollbar{
		display: none !important;
		width: 0 !important;
		height: 0 !important;
		color: transparent;
	}
</style>