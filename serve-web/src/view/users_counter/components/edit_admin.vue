<template>
<el-dialog v-model="dialogVisible" :title="title" width="600px" align-center draggable>
<div class="dialog-content">
  <el-form ref="ruleForDataRef" style="max-width: 600px" :model="ruleForData" :rules="rules" label-width="100px">
    <el-form-item label="头像" prop="image_url">
      <el-input v-model="ruleForData.image_url" />
    </el-form-item>
    <el-form-item label="账号" prop="account" >
      <el-input v-model="ruleForData.account" disabled/>
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
      <el-button type="primary" @click="editadmin" >
      确认
      </el-button>
      </span>
</template>
</el-dialog>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import { bus } from '@/utils/mitt'
import { getuserInfor,editAdmin } from '@/api/userinfor'
import { getDepartment } from '@/api/stting'
import {ElMessage} from "element-plus";

interface ruleForData{
  id ?: number,
  account:string,
  name:string,
  sex:string,
  email:string,
  department:string,
  image_url:string,
}

const ruleForData = reactive({
  id:'',
  account:'',
  name:'',
  sex:'',
  email:'',
  department:'',
  image_url:'',
})

const title = ref()
bus.on('editId',async (id:number)=>{
  const res = await getuserInfor(id)
  ruleForData.id = res.id
  ruleForData.image_url = res.image_url
  ruleForData.account = res.account
  ruleForData.name = res.name
  ruleForData.sex = res.sex
  ruleForData.email = res.email
  ruleForData.department = res.department
})

const rules = reactive({
  account:[
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

//部门数据
const departmentData = ref([])
//获取部门数据
const getdepartment = async () =>{
  departmentData.value = await getDepartment()

}
getdepartment()

const emit = defineEmits(['success'])
const editadmin = async ()=>{
  const res = await editAdmin(ruleForData)
  if(res.status==0){
    ElMessage({
      message: res.message,
      type: 'success',
    })
    emit('success')
    bus.emit('FghjUser','1')//关闭用户列表弹窗
  }else{
    ElMessage.error('保存失败啦~')
  }
  bus.emit('offDialog','1')//刷新列表
  dialogVisible.value=false
}

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

</style>