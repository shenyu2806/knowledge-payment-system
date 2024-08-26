<template>
  <el-dialog v-model="dialogVisible" :title="title" width="600px" align-center draggable>
    <div class="dialog-content">
    <el-form ref="ruleForDataRef" style="max-width: 600px" :model="ruleForData" :rules="rules" label-width="100px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="ruleForData.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForData.password" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForData.name" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="ruleForData.sex" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForData.email" />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="ruleForData.department" placeholder="请选择部门">
          <el-option :label="item" :value="item" v-for="item in departmentData" />
        </el-select>
      </el-form-item>
    </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addAdmin" >
      确认
      </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { bus } from '@/utils/mitt'
import { createAdmin } from '@/api/userinfor'
import { getDepartment } from '@/api/stting'
import {ElMessage} from "element-plus";

interface ruleForData{
  account:string,
  password:string,
  name:string,
  sex:string,
  email:string,
  department:string,
}

const ruleForData = reactive({
  account:'',
  password:'',
  name:'',
  sex:'',
  email:'',
  department:'',
  identity:'',
})

const title = ref()
bus.on('createId',(id:number)=>{
  if(id==1){
    title.value="新增产品管理员"
    ruleForData.identity="产品管理员"
  }
  if(id==2){
    title.value="新增信息管理员"
    ruleForData.identity="信息管理员"
  }
  if(id==3){
    title.value="新增用户管理员"
    ruleForData.identity="用户管理员"
  }
})

const rules = reactive({
  account:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  password:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  name:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  sex:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  email:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
  department:[
    {required:true,message:'请不要留空',trigger:'blur'},
  ],
})
const emit = defineEmits(['success'])
//创建管理员
const addAdmin = async () =>{
  const res = await createAdmin(ruleForData)
  if(res.status==0){
    ElMessage({
      message: res.massage,
      type: 'success',
    })
    emit('success')
  }else{
    ElMessage.error('新增失败啦~')
  }
  bus.emit('offDialog','1')//刷新列表
  dialogVisible.value=false
}

//部门数据
const departmentData = ref([])
//获取部门数据
const getdepartment = async () =>{
  departmentData.value = await getDepartment()

}
getdepartment()

//控制弹窗
const dialogVisible = ref(false)

//打开创建管理员弹窗
const open = () =>{
  dialogVisible.value = true
}
defineExpose({
  open
})
</script>
<style scoped lang="scss">
  .dialog-content{
    display: flex;
    padding: 20px 30px;
  }
  :deep(.el-form-item){
    margin: 30px;
  }
</style>