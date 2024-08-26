<template>
	<u-tabbar
		:value="value6"
		@change="name => navbor(name)"
		:fixed="true"
		:placeholder="true"
		:safeAreaInsetBottom="true"
	>
		<u-tabbar-item text="首页" icon="home" ></u-tabbar-item>
		<u-tabbar-item text="分类" icon="grid" ></u-tabbar-item>
		<u-tabbar-item text="学习" icon="clock" ></u-tabbar-item>
		<u-tabbar-item text="我的" icon="account" ></u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default{
		 props: ['childData'],
		data(){
			return{
				value6:this.childData,
			}
		},
		methods:{
			navbor(index){
				if(index == 0){
					uni.navigateTo({
						url:'/pages/index/index'
					})
				}
				if(index == 1){
					uni.navigateTo({
						url:'/pages/tabs/list'
					})
				}
				if(index == 2){
					uni.navigateTo({
						url:'/pages/tabs/study'
					})
				}
				if(index == 3){
					uni.navigateTo({
						url:'/pages/tabs/me'
					})
				}
			}
		}
	}
</script>
