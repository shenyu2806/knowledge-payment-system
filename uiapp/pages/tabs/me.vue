<template>
	<view class="me-mian">
		<view class="me-header">
			<view class="me-header-config">
				<u-icon name="scan" size="28"></u-icon>
				<u-icon name="setting" size="28"></u-icon>
			</view>
			<view class="me-header-nick" @click="getlogo">
				<view class="me-image">
					<image :src='loginDate.image_url' load="图片加载异常"></image>
				</view>
				<view class="me-login">
					<view class="me-login-text">{{loginDate.name}}</view>
					<view class="me-login-msg">{{loginDate.text}}</view>
				</view>
			</view>
			<view class="me-header-vip">
				<view class="me-vip">
					<image src="http://172.17.1.13:3000/images/home/vipcdo.jpg" load="图片加载异常"></image>
					<view>{{VIPData.name}}</view>
				</view>
				<view class="me-vip-text">
					<view>{{VIPData.text1}}</view>
					<view>{{VIPData.text2}}</view>
				</view>
				<view class="me-vip-button">
					<view>{{VIPData.button}}</view>
				</view>
			</view>
		</view>
		<view class="me-container">
			<view class="me-list-item">
				<view class="list-item" v-for="(item,index) in listhseData" :key="index" @click="getlist(index)">
					<view class="list-l">
						<u-icon :name="item.icon" size="24"></u-icon>
						<text class="list-l-text">{{item.name}}</text>
					</view>
					<view class="list-r">
						<u-icon name="arrow-right" size="16"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="me-list-about" @click="restlogin" v-if="loginset == 1">
			<view class="me-list-out">
				<view>退出登录</view>
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
				parentData:3,
				loginset:0,//退出登录按钮 0是不显示
				loginDate:{
					name:"点击登录",
					text:"登录学习，学习更安心",
					image_url:"http://172.17.1.13:3000/images/tx/mrtx.webp"
				},
				VIPData:{
					name:"VIP会员",
					text1:"开通爱学习线上平台",
					text2:"VIP会员尽享优质课程",
					button:"立即开通"
				},
				listhseData:[{
						id:1,
						name:"购物车",
						icon:"shopping-cart"
						
					},
					{
						id:2,
						name:"我的订单",
						icon:"file-text"
						
					},
					{
						id:3,
						name:"我的余额",
						icon:"rmb-circle"
					},
					{
						id:4,
						name:"电子兑换码",
						icon:"coupon"
					},
					{
						id:5,
						name:"关于我们",
						icon:"error-circle"
					}]
			}
		},
		components:{
			Foot
		},
		onReady() {
			//初始化用户数据
			uni.setStorageSync('userIofP', JSON.stringify([]))
		},
		methods:{
			getlist(index){
				if(index == 0){
					console.log("购物车")
				}
				if(index == 1){
					console.log("我的订单")
				}
				if(index == 2){
					console.log("我的余额")
				}
				if(index == 3){
					console.log("电子兑换码")
				}
				if(index == 4){
					console.log("关于我们")
				}
			},
			getlogo(){
				this.loginset == 1
				uni.navigateTo({
					url:"/pages/login/login"
				})
				console.log("点击登录")
			},
			restlogin(){
				this.loginset == 0
				console.log("退出登录")
			}
		}
	}
</script>

<style lang="scss">
	.me-mian{
		height: 100vh;
		background-color: rgba(220, 220, 220, 0.4);
	}
	.me-header-config{
		padding-top:20px;
		display: flex;
		flex-direction: row-reverse
	}
	.me-header-config .u-icon:first-child{
		margin-left: 24rpx;
		margin-right: 20rpx;
	}
	.me-header-nick{
		display: flex;
		padding: 0 37rpx;
	}
	.me-image image{
		width: 180rpx;
		height: 180rpx;
		background:rgba(238,238,238,0.39);
		border-radius: 50%;
	}
	.me-login{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: -15px;
		margin-left: 35px;
	}
	.me-login-text{
		font-size: 38rpx;
		font-weight: bold;
		color: #343234;
	}
	.me-login-msg{
		margin-top: 5px;
		font-size: 26rpx;
		font-weight: 400;
		color: #919294;
	}
	.me-header-vip{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 10px 19px;
		background: #130F03;
		width: 90%;
		height: 100px;
		border-radius: 15px;
		color: #fff;
		font-size: 24rpx;
	}
	.me-vip{
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		color: #fff;
	}
	.me-vip image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.me-vip:after{
		content:'';
		position: absolute;
		right: -25rpx;
		top: 50%;
		margin-top: -29rpx;
		width: 4rpx;
		height: 58rpx;
		background-color: #fff;
	}
	.me-vip-text view:first-child{
		font-size: 24rpx;
		font-weight: 400;
	}
	.me-vip-text view:last-child{
		margin-top: 5px;
		font-size: 28rpx;
		font-weight: 400;
	}
	.me-vip-button{
		display: flex;
		justify-content: center;
		justify-items: center;
		align-items: center;
		width: 163rpx;
		height: 53rpx;
		font-size: 28rpx;
		font-weight: 400;
		background-color: #FDECC2;
		color: #130F03;
		border-radius: 15px;
	}
	.me-container{
		margin: 0 19px;
		margin-top: 9rpx;
		border-radius: 14rpx;
		background-color: #fff;
	}
	.me-list-item > view{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.me-list-item > view + view{
		border-top: 1rpx solid #ccc;
	}
	.list-l{
		display: flex;
		padding: 28rpx 35rpx;
	}
	.list-l > .u-icon{
		margin-right: 24rpx;
	}
	.list-r{
		padding: 37rpx 20rpx;
	}
	.me-list-about{
		margin: 0 19px;
		margin-top: 15px;
		background: #fff;
		border-radius: 14rpx;
	}
	.me-list-out view{
		display: flex;
		justify-content: center;
		font-size: 28rpx;
		align-items: center;
		padding: 28rpx 35rpx;
	}
</style>