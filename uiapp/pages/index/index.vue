<template>
	<view class="content">
		<Header></Header>
		 <view class="toptext" v-if="toptext">
		 	<u-notice-bar :text="toptext" mode="closable"></u-notice-bar>
		 </view>
		<view v-else></view>
		<view class="home-mian">
			<view class="home-tabs">
				<u-tabs :lineWidth="50" :list="topBar" @change="changeTabs" :current="current" :inactiveStyle="{
					color:'#AAAAAA'
				}" :activeStyle="{
				    color: '#333333',
				    fontWeight: 'bold',
				    fonSize:'29rpx'
				}"></u-tabs>
			</view>
			<view class="home-swiper">
				<swiper :duration="500" :current="current" @change="changeswiper" :style="'height:'+swiperHeight+'px;'">
					<swiper-item v-for="(item,index) in topBar" :key="index">
						<scroll-view scroll-y="true" :style="'height:'+swiperHeight+'px;'" @scrolltolower="lower">
							<keep-alive>
								<view class="swiper-item" :is="activeCom" v-if="index===current" :rolist="rolist"></view>
							</keep-alive>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<Foot :childData="parentData"></Foot>
	</view>
</template>

<script>
	import Header from "@/components/common/Header.vue"
	import Foot from "@/components/common/foot.vue"
	import Free from "@/components/hoem/free.vue"
	import Recommend from "@/components/hoem/recommend.vue"
	import ActualCombat from "@/components/hoem/actualCombat.vue"
	import {
		search,
		setnum
	} from "@/api/course.js"
	import { getannouncement } from "@/api/home.js"
	import {mixin} from "@/mixins/mixin.js"
	export default {
		mixins:[mixin],
		data() {
			return {
				parentData:0,
				toptext:"",
				swiperHeight: 0,
				current: 0,
				topBar: [{
					name: '今日推荐',
				}, {
					name: '免费课程',
				}, {
					name: '实战课程'
				}],
				activeCom: Recommend,
				rolist: [],
				courseParams: {
					pageNum: 1,
					pageSize: 3,
					entity_sortBy: 'clicks'
				},
				setnums: 0
			}
		},
		onLoad() {
			this.getsetnum();
			this.getsearch(this.courseParams);
		},
		onReady() {
			this.swiperHeight = this.getHeight(".header-search",".home-tabs");
			uni.setStorageSync('historySearch', JSON.stringify([]))
			//首页公告
			getannouncement().then(res => {
				this.toptext = res.list[0].value
			})
		},
		methods: {
			// 切换tabs
			changeTabs({
				index
			}) {
				this.current = index;
				this.tabsCom(index)
			},
			//切换swiper
			changeswiper(e) {
				this.current = e.detail.current;
				this.tabsCom(e.detail.current)
			},
			//判断动态组件显示
			tabsCom(index) {
				switch (index) {
					case 0:
						this.activeCom = Recommend;
						break;
					case 1:
						this.activeCom = Free;
						break;
					case 2:
						this.activeCom = ActualCombat;
						break;
				}
			},
			//大家都在看数据
			getsearch(params) {
				search(params).then(res => {
					this.rolist = [...this.rolist, ...res.pageInfo.list];
				})
			},
			getsetnum() {
				setnum().then(res => {
					this.setnums = (res.count / this.courseParams.pageSize) - 1;
				})
			},
			lower() {
				// 滚动到底部
					if (this.setnums >= this.courseParams.pageNum) {
						this.courseParams.pageNum++;
						this.getsearch(this.courseParams)
					}
			}
		},
		components: {
			Header,
			Free,
			Foot,
			Recommend,
			ActualCombat
		}
	}
</script>
<style>
	/deep/.u-tabs__wrapper__nav__item__text {
		font-size: 29rpx;
	}

	/* 隐藏滚动条 */
	/deep/::-webkit-scrollbar {
		display: none !important;
		width: 0 !important;
		height: 0 !important;
		color: transparent;
	}

	.content {
		padding: 0 15px;
	}

	.home-mian {
		padding-left: 15px;
	}

	.home-tabs {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.home-swiper {
		padding-top: 15px;
		margin-left: -15px;
	}
</style>