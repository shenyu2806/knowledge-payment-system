<template>
	<view class="study">
		<view class="study-main">
			<view class="study-top">
				<view class="top-text">学习情况</view>
				<view class="study-top-item">
				<view class="top-item" v-for="(item,index) in topmopData" :key="index">
					<u-icon :name='item.icon' size="40"></u-icon>
					<view>{{item.num}}</view>
				</view>	
				</view>
			</view>
		</view>
		<Foot :childData="parentData"/>
	</view>
</template>

<script>
	import Foot from "@/components/common/foot.vue"
	export default{
		data(){
			return{
				parentData:2,
				topmopData:[
					{
						icon:"file-text",
						num:10
					},
					{
						icon:"eye",
						num:10
					},
					{
						icon:"edit-pen",
						num:10
					},
					{
						icon:"checkmark",
						num:10
					},
					{
						icon:"clock",
						num:10
					}
				]
			}
		},
		components:{
		Foot
		},
	}
</script>

<style>
	.study{
		height: 100vh;
		width: 100%;
	}
	.study-main{
		padding: 15px 26px;
	}
	.study-top{
		display: flex;
		flex-direction: column;
		height: 120px;
		width: 100%;
		border-radius: 15px;
		background-color: #d8d8d8;
	}
	.study-top-item{
		display: flex;
		justify-items: center;
	}
	.top-text{
		margin: 10px;
		font-size: 18px;
	}
	.top-item{
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		width: 20%;
		height: 100%;
	}
</style>