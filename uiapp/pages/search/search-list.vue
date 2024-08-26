<template>
	<view class="search-main">
		<u-navbar @rightClick="rightClick" :autoBack="true" :is-fixed="false">
			<view slot="center" class="nav-center">
				{{title}}
			</view>
			<view slot="right" class="nav-right">
				<u-icon name="search" size="24"></u-icon>
				<u-icon name="shopping-cart" size="24"></u-icon>
			</view>
		</u-navbar>
		<!-- 课程筛选 -->
		<view class="filter">
			<view v-for="item in filterList" :key="item.id">
				<view class="filter-item" :class='item.id == current ? "active":""' @click="changeTabs(item.id)">{{item.name}}</view>
			</view>
		</view>
		<!-- 课程列表 -->
		<view class="course-list">
			<view class="new-list" :current="current"  :style="'height:'+Height+'px;'">
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
		<Foot :childData="parentData"></Foot>
	</view>
</template>

<script>
	import { mixin } from "@/mixins/mixin.js"
	import { getmostHeat } from "@/api/course.js"
	import Foot from "@/components/common/foot.vue"
	export default {
		mixins:[mixin],
		data() {
			return {
				parentData:1,
				title: '',
				Height:'',
				current:0,
				rolist:[],
				filterList: [{
					id: 0,
					name: "综合"
				}, {
					id: 1,
					name: "最新课程"
				}, {
					id: 2,
					name: "最多"
				}]
			}
		},
		onReady(){
			this.Height = this.getHeight(".u-navbar__content",".filter");
		},
		onLoad(e) {
			this.title = e.key
			//查询推荐课程
			getmostHeat({
				pageNum:1,
				pageSize:10
			}).then(res => {
				this.rolist = res.pageInfo.list;
			})
		},
		methods:{
			changeTabs(id){
				this.current = id
			}
		},
		components: {
			Foot
		}
	}
</script>

<style>
	.search-main{
		height: 100vh;
	}
	.nav-center{
		font-size: 38rpx;
	}
	.nav-right {
		display: flex;
	}
	.filter {
		display: flex;
		justify-content: space-between;
		margin-top: 108rpx;
	}
	.filter-item{
		padding: 0 33rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #a0a4ad;
	}
	.filter-item.active{
		color: #0648FF;
	}
	.course-list{
		padding: 15px;
	}
	.new-list {
	  overflow-y: auto; /* 或者使用 auto，根据需要 */
	  -ms-overflow-style: none; /* IE 和 Edge */
	  scrollbar-width: none; /* Firefox */
	}
	
	/* 对于Chrome, Safari, 和 Opera */
	.no-scrollbar::-webkit-scrollbar {
	  display: none;
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
</style>