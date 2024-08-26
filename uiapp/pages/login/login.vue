<template>
	<view class="login">
		<u-navbar @rightClick="rightClick" :autoBack="true" leftIcon="close" /></u-navbar>
		<view class="login-mian">
			<view class="login-img">
				<image src="../../static/logo.png" />
				<text>使用邮箱登录</text>
			</view>
			<view class="login-text">首次使用邮箱登录系统在验证后会自动生成账号</view>
			<view class="login-email">
				<u--input placeholder="请输入邮箱" border="bottom" clearable v-model="email"></u--input>
			</view>
			<view class="login-code">
				<button type="primary" @click="gocode">发送邮箱验证码</button>
			</view>
			<view class="login-radio">
				<u-radio-group v-model="radiovalue.value">
					<u-radio @change="radioChange"></u-radio>
					<view class="radio-item">
						我已阅读并同意<a :href='radiovalue.fwtk'>服务条款</a>和<a :href='radiovalue.yszc'>隐私政策</a>
					</view>
				</u-radio-group>
			</view>
			<view class="login-foot-button" @click="gologin">
				<view>使用账号密码登录</view>
			</view>
		</view>
	</view>
</template>

<script>
import {mixin} from "@/mixins/mixin.js"
	export default {
		mixins:[mixin],
		data() {
			return {
				ops: 0,
				email: null,
				radiovalue: {
					value: false,
					fwtk: "https://baidu.com",
					yszc: "https://bilibili.com"
				}
			}
		},
		methods: {
			radioChange(n) {
				this.ops = 1
			},
			gologin(){
				uni.navigateTo({
					url:"/pages/login/logincount"
				})
			},
			gocode() {
				const loginpm = this.loginto(this.ops,this.email)
				if(this.email == null){
					return uni.$u.toast("没有输入邮箱！");
				}else
				if(loginpm == 2){
					return uni.$u.toast('请先查看条款和政策！');
				}else
				if (loginpm == 3) {
					return uni.$u.toast('输入不是邮箱！');
				} else {
					uni.navigateTo({
						url:`/pages/login/code?email=${this.email}`
					})
				}
			}
		}
	}
</script>

<style>
	.login {
		display: flex;
		/* align-items: center; */
		margin-top: 40%;
		width: 100vh;
		height: auto;
		touch-action: none;
		background-color: rgba(245, 245, 245, 0.39);
	}

	.login-mian {
		padding: 0 58rpx;
		background-color: #ffffff;
	}

	.login-img {
		display: flex;
		align-items: center;
	}

	.login-img image {
		width: 83rpx;
		height: 83rpx;
	}

	.login-img text {
		font-size: 22px;
		font-weight: bold;
		padding-left: 22rpx;
		color: #343234;
	}

	.login-text {
		padding-top: 25px;
		font-size: 16px;
		font-weight: 400;
		color: #343234;
	}

	.login-email {
		padding-top: 80rpx;
		padding-bottom: 10px;
		border-bottom: 2px solid #707070;
	}

	.login-code {
		padding-top: 15px;
	}

	.login-radio {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		margin-top: 15px;
	}

	.login-radio a {
		text-decoration: none;
		color: #0077FF;
	}
	.login-foot-button{
		margin-top: 20px;
		display: flex;
		color: #707070;
		justify-content: center;
		align-items: center;
	}

	/deep/ .u-radio-group--row {
		justify-content: center;
	}
</style>