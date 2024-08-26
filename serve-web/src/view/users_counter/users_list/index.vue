<template>
  <!--学生列表-->
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="serate-main">
    <div class="seact">
      <el-input v-model="seactVe" placeholder="请输入用户姓名" clearable />
      <el-button type="primary" @click="serte">搜索</el-button>
      <el-button type="success" @click="Retyui">重置</el-button>
      <el-text>查询到：<span>{{pagination.total}}</span> 条数据</el-text>
    </div>
    <div class="button">
      <el-button type="success" @click="openuse(row,'3')">新增</el-button>
    </div>
  </div>
  <div class="table-main">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="120" align="center"/>
      <el-table-column prop="account" label="账号" width="120" align="center"/>
      <el-table-column prop="identity" label="用户类型" align="center">
        <template #default="{row}">
          <el-tag type="success" v-if="row.identity == 2">学生</el-tag>
          <el-tag type="info" v-else>异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="permissions" label="用户权限" width="80" align="center">
        <template #default="{row}">
          <el-tag type="danger" v-if="row.permissions == '1111'">最高权限</el-tag>
          <el-tag type="warning" v-else-if="row.permissions == '1010'">读写权限</el-tag>
          <el-tag type="success" v-else-if="row.permissions == '0101'">只读权限</el-tag>
          <el-tag type="success" v-else>无权限</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="member" label="会员等级" width="80" align="center">
        <template #default="{row}">
          <el-tag type="primary">{{row.member}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"width="180" align="center"/>
      <el-table-column prop="sex" label="性别" align="center"/>
      <el-table-column prop="create_time" label="创建时间" width="120" align="center"/>
      <el-table-column prop="update_time" label="更新时间" width="120" align="center"/>
      <el-table-column prop="status_time" label="封号时间" width="120" align="center"/>
      <el-table-column prop="thawed_time" label="解除时间" width="120" align="center"/>
      <el-table-column prop="status" label="用户状态" align="center">
        <template #default="{row}">
          <el-tag type="danger" v-if="row.status == '0'">封号</el-tag>
          <el-tag type="success" v-else>正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="160" align="center">
        <template #default="{row}">
          <div style="display: flex;margin-left: 5px">
            <el-button type="primary" @click="openuse(row,'1')">编辑</el-button>
            <el-button type="success" @click="openuse(row,'2')">修改</el-button>
          </div>
          <div style="margin: 5px; display: flex;">
            <el-button type="warning" @click="Fhao(row.id)" v-if="row.status == '1'">封号</el-button>
            <el-button type="info" @click="pocu(row.id)" v-else>解封</el-button>
            <el-button type="danger" @click="getdeleteuser(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="foot-main">
    <div class="foot-left"></div>
    <div class="foot-right">
      <el-pagination background layout="prev, pager, next" :total="pagination.total"
                     :default-page-size="pagination.pagesize"  :default-current-page="pagination.num"
      @current-change="currentchange"/>
    </div>
  </div>
  <userinfo ref="Userinfo"></userinfo>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { bus } from '@/utils/mitt'
import bread_Crumb from '@/components/bread_crumb.vue'
import userinfo from '../components/userinfo.vue'
import {getAdmingListLength,getserteList,
  getsteruo,posteruo,deleteuser} from "@/api/list"
import {getuserskl} from "@/api/admin"
import {ElMessage, ElMessageBox} from "element-plus";
const breadcrumb =ref()
const item = ref({
  first:'用户管理',
  second:'学生列表'
})
//表格数据
const tableData = ref([])
//动画
const loading = ref(true)
//搜索框数据
const seactVe = ref()
//获取表格数据
const getList = async () =>{
   const res= await getAdmingListLength("2",pagination.pagesize,pagination.id)
  if(res.status == 0){
    tableData.value = res.result
    const leng = res.length - 1
    if(pagination.num == 0){
      pagination.indexid = res.result[leng].id
    }
    pagination.id = res.result[leng].id
  }
  gettotal("n")
  await new Promise(resolve => setTimeout(resolve, 1000));//等待1秒
  loading.value = false
}
//分页数据
const pagination = reactive({
  total:0,//总数
  pagesize:5,//每页数量
  num:1,//默认页面
  id:0 ,//默认id
  indexid:1 //第一个id
})
//获取总数
const gettotal= async (num) =>{
  if(num == "n"){
    const res = await getuserskl()
    pagination.total = res.data[3].num
  }else{
    pagination.total = num
  }

}
// 当页码改变时调用的方法
const currentchange = (val) =>{
  if(val == 1){
    pagination.id = pagination.indexid
  }
  pagination.num = val
  getList()
}
getList()
//重置
const Retyui = () =>{
  seactVe.value = "";
  currentchange("1")
  getList()
  ElMessage({
    message: "重置成功",
    type: 'success',
  })
}
//搜索
const serte = async () =>{
  if(seactVe.value == null) return console.log("搜索框数据为空！");
  ElMessage({
    message: "搜索中...",
    type: 'success',
  })
  loading.value = true
  const res = await getserteList("2",seactVe.value)
  gettotal(res.length)
  tableData.value = res.result
  await new Promise(resolve => setTimeout(resolve, 1000));//等待1秒
  loading.value = false
}
//封号按钮
const Fhao =  (id) =>{
  ElMessageBox.prompt('请输入几个小时', '封号操作', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
      .then(async ({ value }) => {
        const res = await getsteruo(id,value)
        if(res.status == 0){
          ElMessage({
            message: "成功了！",
            type: 'success',
          })
        }
        Retyui()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作',
        })
        Retyui()
      })
}
//解除封号
const pocu = async (id) =>{
  const res = await posteruo(id)
  if(res.status == 0){
    ElMessage({
      message: "成功了！",
      type: 'success',
    })
    Retyui()
  }
}
//接收传值
bus.on("sx",(a)=>{
  if(a == "1"){
    Retyui()
  }
})
//删除用户
const getdeleteuser = (id) =>{
  ElMessageBox.confirm(
      '你确定删除吗?这个用户会被彻底删除！',
      '确认删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        const res = await deleteuser(id)
        if(res.status == 0){
          ElMessage({
            message: "删除成功了！",
            type: 'success',
          })
          Retyui()
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除操作！',
        })
      })
}
//打开弹窗
const Userinfo = ref()
const openuse = (row : any,ops) =>{
  //传值
  bus.emit("opsid",ops)
  if(ops == 1){
    bus.emit("opslis",row)
  }
  Userinfo.value.open()
}
</script>
<style scoped lang="scss">
.table-main{
  margin: 5px;
  border-radius: 10px;
}
.serate-main{
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  .seact{
    display: flex;
    .el-input{
      width: 180px;
    }
    .el-button{
      margin-left: 15px;
    }
    .el-text{
      margin-left: 15px;
      width: 320px;
      span{
        color: #409eff;
      }
    }
  }
}
.el-table{
  height: 100%;
}
.foot-main{
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 15px;
}
</style>