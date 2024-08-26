<template>
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>

</template>
<script setup lang="ts">
import {ref} from "vue";
//头部
import bread_Crumb from '@/components/bread_crumb.vue'
const breadcrumb =ref()
const item = ref({
  first:'课程管理',
  second:'课程等级'
})
</script>

<style scoped lang="scss">

</style>