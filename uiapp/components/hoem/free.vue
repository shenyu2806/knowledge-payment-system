<template>
	<view>
		<view class="free-filter">
			<view class="free-filter-title" v-for="item in filterList" :key="item.id" :class='item.id==curent ? "active" : ""'
			@click="changeFilter(item.id)">
				{{item.name}}
			</view>
		</view>
		<view class="free-list">
			<view class="new-list">
				<view class="new-list-item" v-for="(item,index) in rolist" :key="rolist.id">
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
	import { mixin } from "@/mixins/mixin.js"
	import {search} from "@/api/course.js"
	export default {
		mixins:[mixin],
		data() {
			return {
				curent:1,
				filterList: [{id: 1,name: "综合推荐"},{id: 2,name: "最新"},{id: 3,name: "浏览更多"}],
				rolist:[],
				couresParams:{
					pageNum:1,
					pageSize:10,
					entity_isFree:1,
				}
			}
		},
		mounted() {
			this.getCourse(this.couresParams)
		},
		methods:{
			//查询课程
			getCourse(params){
				search(params).then(res => {
					this.rolist = res.pageInfo.list;
				})
			},
			//切换filter
			changeFilter(id){
				this.curent = id;
				if(id == 1){//综合
					this.couresParams.entity_sortBy="firstCategory";
				}else if(id == 2){//最新
					this.couresParams.entity_sortBy="createTime";
					this.couresParams.entity_isFree=2
					this.getCourse(this.couresParams)
				}else if( id == 3){//浏览最多
					this.couresParams.entity_sortBy="clicks";
					this.couresParams.entity_isFree=2
					this.getCourse(this.couresParams)
				}
			}
		}
	}
</script>
<style>
	.free-filter {
		display: flex;
		align-items: center;
		padding: 14rpx 0;
	}

	.free-filter-title {
		padding-left: 44rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #A0A4AD;
	}

	.free-list {
		padding: 14rpx;
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
	.active{
		color: #000000;
		font-weight: 400;
	}
</style>