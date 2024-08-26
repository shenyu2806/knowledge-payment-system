<template>
	<div class="common-layout">
	<el-container>
	<el-header class="header-wrapper">
    <div class="header-content">
      <h3>爱学习网管理系统</h3>
      <span>当前时间：{{currentTime}}</span>
      <span class="welcome">欢迎登录</span>
    </div>
  </el-header>
	<el-main>
    <div class="login-wrapper">
      <el-card class="box-card">
        <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
          <el-tab-pane label="登录" name="first">
            <el-form class="login-form">
              <el-form-item label="账号">
                <el-input v-model="loginDate.account" placeholder="请输入账号"/>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="loginDate.password" placeholder="请输入密码"/>
              </el-form-item>
              <div class="footer-wrapped">
                <div class="forget-password">
                  <span class="forget-password-button" @click="openForget">忘记密码</span>
                </div>
                <div class="footer-button">
                  <el-button type="primary" @click="getlogin">登录</el-button>
                </div>
                <div class="footer-go-register">
                  还没有账号?<span class="go-register" @click="xzregister">马上注册</span>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second" :rules="rules" :disabled="stopse" style="margin-top: -10px">
            <el-form class="login-form">
              <el-form-item label="账号">
                <el-input v-model="registerDate.account" placeholder="账号长度6~12位"/>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="registerDate.password" placeholder="密码长度6~12位包含字母"/>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="registerDate.repassword" placeholder="请再次输入密码"/>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="registerDate.email" placeholder="用于忘记密码的邮箱"/>
              </el-form-item>
              <div class="footer-wrapped">
                <div class="footer-button">
                  <el-button type="primary" @click="getregister">注册</el-button>
                </div>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </el-main>
	<el-footer>
    <div class="footer-wrapper">
      <div class="footer-content">
        <div class="title">
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span> |
          <span>团星网</span><br>
          <span style="margin-left:85px">Copyright @ 团星网版仅所有</span>
        </div>
      </div>
    </div>
  </el-footer>
	</el-container>
	</div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter()
import { ref,reactive,onMounted, onUnmounted } from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {register,login} from '@/api/admin'
import { resetpassword,countemail } from '@/api/email'
import {logs} from "@/api/logs"
//存储用户信息
import { userinfor } from "@/store/userinfor";
const activeName = ref('first')
const stopse = ref(false)//注册
const xzregister = () =>{
  if(stopse.value === true){
   ElMessage.error('注册不可用')
  }else{
    activeName.value='second'
  }
}
//存储
const store = userinfor()
//获取当前时间
const currentTime = ref('');
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString();
};

onMounted(() => {
  updateTime(); // 初始化时间
  const intervalId = setInterval(() => {
    updateTime();
  }, 1000); // 每秒更新一次时间

  // 清理定时器
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
//忘记密码
const openForget = () =>{
  ElMessageBox.prompt('请输入你账号的邮箱', '重置密码', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern:
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '输入邮箱',
  })
      .then(async ({ value }) => {
        if(value == null){
            ElMessage({
              type: 'success',
              message: "你怎么不输入呢！",
            })
          return
        }
        const res = await resetpassword(value)
        if(res.code == 200){
          ElMessage({
            type: 'success',
            message: res.msg,
          })
        }else{
          ElMessage({
            type: 'warning',
            message: res.msg,
          })
        }
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作',
        })
      })
}
// 表单接口
interface formDate {
  account: string;
  password: string;
  repassword ?: string;
  email ?:string;
}
//登录数据
const loginDate : formDate = reactive({
  account:"",
  password:''
})
//注册数据
const registerDate : formDate = reactive({
  account:"",
  password:'',
  repassword:'',
  email:''
})

const rules = reactive({
  account:[
    {required:true,message:'请输入您的注册账号',trigger:'blur'},
],
password:[
    {required:true,message:'请输入您的密码',trigger:'blur'},
],
repassword:[
  {required:true,message:'请再次确认您的密码',trigger:'blur'},
],
})

//登录
const getlogin = async () =>{
  if (loginDate.account == null | loginDate.password == null) {
    ElMessage.error('输入不要留下空白！')
  }else{
    const res = await login(loginDate)
    if(res.status==0){
      const { token } = res
      const { id,account,name } = res.results
      localStorage.setItem('id',id)
      localStorage.setItem('token',token)
      store.userinfor(id)
      await logs(0,account,name+"登录后台成功！")
      //跳转
      router.push('/home')
    }else if(res.status==1){
      ElMessage.error('账号或者密码错误！')
    }else if(res.status==403){
      const item = res.identity
      if(item == "0"){
        ElMessageBox.alert("尊敬的管理员你的账号被封号呢！", '提示', {
          confirmButtonText: '知道了',
          callback: () => {
            ElMessage({
              type: 'info',
              message: `感谢理解！`,
            })
          },
        })
      }else if(item == "1"){
        const msg = "<p style='margin-left: 65px'>尊敬的<span style='color: #409eff'>"+res.name+"</span>老师,你的账号被封啦！</br> 解封时间: <span style='color: red'>"+res.thawed+"</span></p>"
        ElMessageBox.alert(msg, '提示', {
          confirmButtonText: '知道了',
          dangerouslyUseHTMLString:true,
          callback: () => {
            ElMessage({
              type: 'info',
              message: `感谢理解！`,
            })
          },
        })
      }else if(item == "2"|item == "3"){
        const msg = "<p style='margin-left: 65px'>尊敬的<span style='color: #409eff'>"+res.name+"</span>,你的账号被封啦！</br> 解封时间: <span style='color: red'>"+res.thawed+"</span></p>"
        ElMessageBox.alert(msg, '提示', {
          confirmButtonText: '知道了',
          dangerouslyUseHTMLString:true,
          callback: () => {
            ElMessage({
              type: 'info',
              message: `感谢理解！`,
            })
          },
        })
      }
    }
  }
}
//注册
const getregister = async () =>{
  if(registerDate.account == null|registerDate.password == null|registerDate.repassword == null){
    ElMessage({
      message: '不要留空!',
      type: 'warning',
    })
  }else{
    if(registerDate.password==registerDate.repassword){
      const res = await register(registerDate)
      if(res.status==0){
        ElMessage({
          message: res.message,
          type: 'success',
        })
        await countemail(registerDate.email)
        activeName.value ='first'
      }else{
        ElMessage.error(res.message)
      }
    }else{
      ElMessage.error('密码不一致！')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper{
  margin-bottom: 15px;
  .header-content{
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .welcome{
    font-size: 13px;
  }
}
.el-main{
  width: 100%;
  height: 600px;
  background: url("@/assets/codeuis.jpg") no-repeat center;
  --el-main-padding:0;
  .box-card{
    width: 350px;
    height: 375px;
    float: right;
    position: relative;
    top:14%;
    border-radius: 15px;
    .login-form{
      .footer-wrapper {
        display: flex;
        flex-direction: column;
      }
        .forget-password{
          display: flex;
          justify-content: flex-end;
          margin: 10px 0;
          .forget-password-button{
            font-size: 12px;
            color: #409eff;
            //鼠标效果
            cursor: pointer;
          }
        }
      .footer-button{
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .footer-go-register{
        font-size: 12px;
        margin: 12px 0;
        display: flex;
        justify-content: center;
      }
      .go-register{
        margin-left: 5px;
        font-size: 12px;
        color: #409eff;
        //鼠标效果
        cursor: pointer;
      }
    }
  }
  .login-wrapper{
      width: 1200px;
      height: 600px;
      margin: 0 auto;
  }
}
.footer-wrapper{
  margin-top: 10px;
  .footer-content{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .title{
      color: #666;
    }
    span{
      color: #666;
      font-size: 12px;
    }
  }
}
.login-form{
  margin-top: 10px;
}
:deep(.el-tabs__item){
  color: #333;
  font-size: 18px;
}
:deep(.el-input__inner){
  height: 40px;
}
:deep(.el-form-item-label){
  height: 40px;
  line-height: 40px;
}
:deep(.el-button){
  width: 300px;
  height: 45px;
  font-size: 16px;
}
</style>