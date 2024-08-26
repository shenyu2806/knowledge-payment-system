<template>
	<view>
		<!-- 轮播图 -->
		<view class="re-swiper">
			<u-swiper :list="swiperList" indicator indicatorMode="line" circular height="308rpx">
			</u-swiper>
		</view>
		<!-- 新上好课 -->
		<view class="re-new">
			<view class="new-title">
				<view class="new-tilile-name">新上好课</view>
				<view class="new-tilile-more" @click="ckgd1">查看更多</view>
			</view>
			<view class="new-list">
				<view class="new-list-item"
				v-for="item in newList" :key="item.id"
				>
					<view class="new-item-img">
						<image :src="item.courseCover">
					</view>
					<view class="new-item-main">
						<view class="new-item-title">
							{{item.courseName}}
						</view>
						<view class="new-item-type">
							{{item.firstCategory}}
						</view>
						<view class="new-item-total">
							<view class="new-item-price" v-if="item.discountPrice != 0">
								<view>限时优惠</view>
								<view class="new-item-discountPrice">￥ {{item.discountPrice}}</view>
							</view>
							<view class="new-item-price" v-else style="color:cornflowerblue;font-size: 28rpx;">免费</view>
							<view class="new-item-number">
								{{courseNumber(item.clicks)}}人学习
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐好课 -->
		<view class="recommend">
			<view class="new-title">
				<view class="new-tilile-name">推荐好课</view>
				<view class="new-tilile-more" @click="ckgd2">查看更多</view>
			</view>
			<view>
				<scroll-view scroll-x="true" class="nav-bar">
					<view class="nav-bar-wrap">
						<block v-for="(item,index) in relist" :key="index">
							<view class="nav-bar-item">
								<view class="nav-bar-item-img">
									<image :src="item.courseCover">
								</view>
								<view class="nav-bar-item-main">
									<view class="nav-bar-item-type">{{ courseType(item.courseLevel)}} · {{courseNumber(item.purchaseCounter)}}人报名</view>
									<view class="nav-bar-item-price">
										<view class="nav-bar-item-oprice" v-if="item.discountPrice != 0">￥{{item.discountPrice}}</view>
										<view class="nav-bar-item-oprice" v-else style="color: cornflowerblue;">￥{{item.discountPrice}}</view>
										<view class="nav-bar-item-pprice"><del>{{item.salePrice}}</del></view>
									</view>
									<view class="nav-bar-item-pricetxt" v-if="item.discountPrice != 0">限时优惠</view>
									<view class="nav-bar-item-pricetxt" v-else style="color: cornflowerblue;">免费</view>
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 大家都在看 -->
		<view class="re-lo">
			<view class="new-title">
				<view class="new-tilile-name">大家都在看</view>
			</view>
			<view class="new-list">
				<view class="new-list-item"
				v-for="(item,index) in rolist" :key="index"
				>
					<view class="new-item-img">
						<image :src="item.courseCover">
					</view>
					<view class="new-item-main">
						<view class="new-item-title">
							{{item.courseName}}
						</view>
						<view class="new-item-type">
							{{item.firstCategory}}
						</view>
						<view class="new-item-total">
							<view class="new-item-price" v-if="item.discountPrice != 0">
								<view>限时优惠</view>
								<view class="new-item-discountPrice">￥ {{item.discountPrice}}</view>
							</view>
							<view class="new-item-price" v-else style="color:cornflowerblue;font-size: 28rpx;">免费</view>
							<view class="new-item-number">
								{{courseNumber(item.clicks)}}人学习
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getSliders
	} from '@/api/home.js'
	import { getmostNew,getmostHeat } from "@/api/course.js"
	import { mixin } from "@/mixins/mixin.js"
	export default {
		mixins:[mixin],
		props:{
			rolist:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				swiperList: [],
				newList:[],
				relist:[]
			}
		},
		methods:{
			ckgd1(){
				uni.navigateTo({
					url:"/pages/search/search-list?key=最新"
				})
			},
			ckgd2(){
				uni.navigateTo({
					url:"/pages/search/search-list?key=推荐"
				})
			}
		},
		mounted() {
			//查询轮播图
			getSliders().then(res => {
				this.swiperList = res.list.map(v => v.imageUrl)
			})
			//查询新上好课
			getmostNew({
				pageNum:1,
				pageSize:3
			}).then(res => {
				this.newList = res.pageInfo.list;
			})
			//查询推荐课程
			getmostHeat({
				pageNum:1,
				pageSize:6
			}).then(res => {
				this.relist = res.pageInfo.list;
			})
		}
	}
</script>
<style>
	/deep/.u-swiper__indicator {
		right: 20rpx !important;
	}

	.new-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0;
	}
	.new-tilile-name {
		font-size: 40rpx;
		font-weight: 400;
		color: #333333;
	}
	.new-tilile-more {
		font-size: 26rpx;
		font-weight: 400;
		color: #A0A0A0;
	}

	.new-list-item {
		flex: 1;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 40rpx;
	}
	.new-list-item::after{
		content: "";
		position: absolute;
		bottom: -20rpx;
		margin-top: 40rpx;
		width: 100%;
		border-bottom: 1rpx solid #000000;
		opacity: 0.25;
	}
	.new-list-item:first-child {
	  margin-top: 0px;
	}

	.new-item-img {
		width: 237rpx;
		height: 186rpx;
		border-radius: 12rpx;
		background: #ccc;
	}
	.new-item-img image{
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}
	.new-item-main{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 186rpx;
		padding-left: 23rpx;
	}
	.new-item-title{
		font-size: 29rpx;
		font-weight: 400;
		color: #191919;
	}
	.new-item-type{
		font-size: 24rpx;
		font-weight: 400;
		color: #c5c5c5;
	}
	.new-item-total{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.new-item-price{
		display: flex;
		font-size: 21rpx;
		color: #FF4B5C;
		font-weight: 600;
	}
	.new-item-discountPrice{
		padding-left: 21rpx;
	}
	.new-item-number{
		font-size: 21rpx;
		font-weight: 400;
		color: #A0A4AD;
	}
	/* 隐藏滚动条 */
	/deep/::-webkit-scrollbar{
		display: none !important;
		width: 0 !important;
		height: 0 !important;
		color: transparent;
	}
	.nav-bar-wrap{
		display: flex;
		flex-flow: column wrap;
		height: 638rpx;
	}
	.nav-bar-wrap[data-v-2881aad2][data-v-2881aad2] {
	    display: flex;
	    margin-left: -14px;
	    flex-flow: column wrap;
	    height: 180px;
	}
	.nav-bar-item{
		width: 265rpx;
		height: 286rpx;
		margin-top: 28rpx;
		margin-left: 28rpx;
		background: rgba(255,255,255,0.39);
		box-shadow: 1px 3px 3px rgb(27,39,94,0.1);
		border-radius: 12rpx;
	}
	.nav-bar-item-img{
		width: 265rpx;
		height: 160rpx;
		border-radius: 12rpx;
		background: #A0A4AD;
	}
	.nav-bar-item-img image{
		border-top-left-radius: 15rpx;
		border-top-right-radius: 15rpx;
		width: 100%;
		height: 100%;
	}
	.nav-bar-item-main{
		padding: 12rpx;
	}
	.nav-bar-item-price{
		display: flex;
		padding: 4rpx 0;
	}
	.nav-bar-item-oprice{
		font-size: 22rpx;
		font-weight: 500;
		color: #FF0018;
	}
	.nav-bar-item-pprice{
		font-size: 18rpx;
		font-weight: 500;
		color: #7B7B7B;
		margin-left: 25rpx;
	}
	.nav-bar-item-type{
		font-size: 21rpx;
		color: #7B7B7B;
	}
	.nav-bar-item-pricetxt{
		font-size: 19rpx;
		color: #FF6464;
	}
	.nav-bar-wrap[data-v-2881aad2] {
	    display: flex;
	    margin-left: -14px;
	    flex-flow: column wrap;
	    height: 320px;
	}
	.re-lo{
		padding: 14rpx;
	}
</style>