<template>
  <el-dialog v-model="dialogUserVisible" title="用户信息" width="500px" center draggable>
    <el-container>
         <span>权限：</span>
        <el-select v-model="identity" placeholder="请选择权限" style="width: 150px">
          <el-option :label="item" :value="item" v-for="item in departmentData" />
        </el-select>
    </el-container>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="dialogUserVisible = false">取消</el-button>
      <el-button type="primary" @click="seteadepartment" >
      确认
      </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
//控制弹窗
import {ref} from "vue";
import { bus } from '@/utils/mitt'
import {changeIdentityToAdmin} from '@/api/userinfor'
import {ElMessage} from "element-plus";

const identity = ref("用户")
const cosid = ref()
const dialogUserVisible = ref(false)
//类型数据
const departmentData = ref(["用户","产品管理员","用户管理员","信息管理员"])

bus.on("Promote",(user)=>{
  identity.value = user.identity
  cosid.value = user.id
})

const seteadepartment = async () =>{
  const res = await changeIdentityToAdmin(cosid.value,identity.value)
  if(res.status==0){
    ElMessage({
      type: 'success',
      message:res.message+"！请刷新页面"
    })
  }else{
    ElMessage.error('赋权异常~')
  }
  bus.emit('offDialog','1')//刷新列表
  bus.emit('dialogUser','1')//关闭
  dialogUserVisible.value = false

}

//打开弹窗
const open = () =>{
  dialogUserVisible.value = true
}
defineExpose({
  open
})
</script>
<style scoped lang="scss">
.el-container{
  display: flex;
  justify-content: center;
  justify-items: flex-end;
  span{
    margin-top: 4px;
    font-size: 16px;
  }
}
</style>