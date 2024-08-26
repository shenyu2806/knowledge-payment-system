<template>
  <div>
    <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
    <div class="st-mian">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="H5首页公告：">
          <el-input class="w-5" v-model="formInline.title" placeholder="系统公告" clearable/>
          <el-button type="primary" @click="getformtitle">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
//头部
import bread_Crumb from '@/components/bread_crumb.vue'
import {getset,setwei} from "@/api/set"
const breadcrumb =ref()
const item = ref({
  first:'系统信息',
  second:'常规设置'
})
//表单数据
const formInline = reactive({
  title: '',
  region: '',
  date: '',
})
//获取全部数据
const getform = async () =>{
  const res = await setwei("uiapp首页公告")
  if(res.status == 0){
    formInline.title = res.results.value
  }
}
getform()
//标题修改
const getformtitle = () =>{

}
</script>

<style scoped lang="scss">
.st-mian{
  margin: 15px;
}
.el-form-item .w-5{
  width: 50%;
}
.el-form-item{
  display: flex;
  justify-content: left;
}
.el-button{
  margin-left: 10px;
}
</style>