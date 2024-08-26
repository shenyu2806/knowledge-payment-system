<template>
  <el-dialog v-model="dialogUserVisible" title="讲师信息" width="400px" center draggable>
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        label-width="auto"
        class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="pass">
        <el-input v-model="ruleForm.account" v-if="act != 3" type="account" autocomplete="off" disabled />
        <el-input v-model="ruleForm.account" type="account" autocomplete="off" v-else/>
      </el-form-item>
      <el-form-item label="用户类别" prop="pass">
        <el-select
            v-model="ruleForm.identity"
            placeholder="请选择类别"
        >
          <el-option label="讲师" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户权限" prop="pass">
        <el-select
            v-model="ruleForm.permissions"
            placeholder="请选择权限"
        >
          <el-option label="可读可写" value="1010" />
          <el-option label="只读权限" value="0101" />
        </el-select>
      </el-form-item>
      <el-form-item label="会员等级" prop="pass">
        <el-select
            v-model="ruleForm.member"
            placeholder="请选择会员等级"
        >
          <el-option v-for="(item,index) in ioplist" :key="index" :label='item.name' :value='item.name' />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="pass">
        <el-input v-model="ruleForm.name" type="name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="paw" v-if="act == 3">
        <el-input v-model="paw" type="paw" autocomplete="off" disabled/>
      </el-form-item>
      <el-form-item label="邮箱" prop="pass">
        <el-input v-model="ruleForm.email" type="email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" prop="pass">
        <el-select
            v-model="ruleForm.sex"
            placeholder="请选择性别"
        >
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="pass">
        <el-input v-model="ruleForm.image_url" type="image_url" autocomplete="off" />
      </el-form-item>
      <el-form-item class="foot-main">
        <el-button type="primary" v-if="act != 3" @click="opsds" >确定</el-button>
        <el-button type="primary" v-else @click="getintouser">新增</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { bus } from '@/utils/mitt'
import {ElMessage, ElMessageBox} from "element-plus";
import { modexve,updeuser,intouser } from "@/api/list"

const paw = ref("12345678")
const act = ref(0)
bus.on("opsid",(i)=>{
  if(i == 3){
      ruleForm.id = ""
      ruleForm.account = ""
      ruleForm.identity = ""
      ruleForm.permissions = ""
      ruleForm.member = ""
      ruleForm.name = ""
      ruleForm.email = ""
      ruleForm.sex = ""
      ruleForm.image_url = ""
      act.value = 3
  }else{
    act.value = 0
  }
})
bus.on("opslis",(res)=>{
  ruleForm.id = res.id
  ruleForm.account = res.account
  ruleForm.identity = res.identity
  ruleForm.permissions = res.permissions
  ruleForm.member = res.member
  ruleForm.name = res.name
  ruleForm.email = res.email
  ruleForm.sex = res.sex
  ruleForm.image_url = res.image_url
})
//表单数据
const ruleForm = reactive({
  id:'',
  account:'',
  identity:'',
  permissions:'',
  member:'',
  name:'',
  email:'',
  sex:'',
  image_url:''
})
//确定
const opsds = async () =>{
 const res = await updeuser(ruleForm)
  if(res.status == 0){
    ElMessage({
      message: "操作成功！",
      type: 'success',
    })
    bus.emit("sx","1")
    dialogUserVisible.value = false
  }else{
    ElMessage.error("出现错误！")
  }
}
//新增
const getintouser = async () =>{
  const res = await intouser(ruleForm)
  if(res.status == 0){
    ElMessage({
      message: "操作成功！",
      type: 'success',
    })
    bus.emit("sx","1")
    dialogUserVisible.value = false
  }else{
    ElMessage.error("出现错误！")
  }
}
//会员等级
const  ioplist = ref([])
const getlist = async () =>{
  const res = await modexve()
  ioplist.value = res.data
}
getlist()

//控制弹窗
const dialogUserVisible = ref(false)
//打开创建管理员弹窗
const open = () =>{
  dialogUserVisible.value = true
}
defineExpose({
  open
})
</script>
<style>
.el-dialog{
  border-radius: 10px;
  padding: 15px;
}
.foot-main{
  display: flex;
}
.el-form-item__content{
  justify-content: flex-end;
}
</style>