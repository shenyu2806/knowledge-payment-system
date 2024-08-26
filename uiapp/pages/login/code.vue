<template>
	<view class="code">
		<view>
			<view>
				<u-navbar :autoBack="true" />
				</u-navbar>
			</view>
			<view class="code-main">
				<view class="code-msg">请输入6位验证码</view>
				<view class="code-item">
					<view>验证码已发送至 {{email}}</view>
					<view>请查看邮件</view>
				</view>
				<view class="item-code">
					<u-code-input v-model="value3" :maxlength="6" @finish="finish"></u-code-input>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: null,
				value3: ""
			}
		},
		methods: {
			finish(e) {
				if(e == "123456"){
					uni.navigateTo({
						url:"/pages/tabs/me"
					})
				}else{
					return uni.$u.toast('验证码错误！');
				}
			},
		},
		onLoad(e) {
			this.email = e.email
		}
	}
</script>

<style>
	.code {
		width: 100%;
		height: 100vh;
	}

	.code-main {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-top: 133rpx;
		padding-left: 62rpx;
		padding-right: 62rpx;
	}

	.code-msg {
		font-size: 56rpx;
		font-weight: bold;
		color: #343234;
	}

	.code-item {
		margin: 15px 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #343234;
		opacity: 0.53;
	}

	.item-code {
		margin-top: 25px;
	}
</style>