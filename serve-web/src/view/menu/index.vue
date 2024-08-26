<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" router>
          <div class="title">爱学习网管理系统</div>
          <el-menu-item index="/home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/overs" v-if="userStore.identity=='0'">
            <el-icon><Document /></el-icon>
            <span>系统情况</span>
          </el-menu-item>
          <el-sub-menu index="3" v-if="userStore.identity=='0'">
            <template #title>
              <el-icon><Notebook /></el-icon>
              <span>课程管理</span>
            </template>
            <el-menu-item-group title="基础课程">
              <el-menu-item index="/courses/courses_list">课程信息</el-menu-item>
              <el-menu-item index="/courses/courses_classification">课程分类</el-menu-item>
              <el-menu-item index="/courses/courses_level">课程等级</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4" v-if="userStore.identity=='0'">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="基础用户">
              <el-menu-item index="/users/users_teacher">课程讲师</el-menu-item>
              <el-menu-item index="/users/users_list">学生列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="12" v-if="userStore.identity=='0'">
            <template #title>
              <el-icon><Warning /></el-icon>
              <span>日志管理</span>
            </template>
            <el-menu-item-group title="常规日志">
              <el-menu-item index="/logs/logs_login">登录日志</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="13" v-if="userStore.identity=='0'">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item-group title="常规设置">
              <el-menu-item index="/settings/general">常规设置</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content">尊敬的 {{ userStore.name }} 欢迎您登录本系统</span>
          <div class="header-right-content">
            <el-icon :size="20"><Message/></el-icon>
            <el-avatar :size="34" :src="userStore.imageUrl" />
            <el-dropdown>
            <span class="el-dropdown-link">
            设置
            </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="gologin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import {
  House,
  Document,
  User,
  ChatLineRound,
  Notebook,
  Warning,
  TakeawayBox,
  Folder,
  DocumentCopy,
  Memo,
  Setting, Message,
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
const router = useRouter()
import { userinfor } from '@/store/userinfor';
const userStore = userinfor()
import {logs} from "@/api/logs"
//退出登录
const gologin = async () =>{
  await logs(0,userStore.account,userStore.name+"注销后台啦！")
  localStorage.clear()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.el-aside {
  width: 210px;
  height: 100vh;
  background: #2b303b;
  overflow-X: hidden;
  .el-menu{
    background: #2b303b;
    width: 210px;
    height: 100vh;
    border-right: 0;
  }
  .title{
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #fff;
    background: #2b303b;
  }
  .el-menu-item{
    color: #fff;
  }
}
.el-header{
  display: flex;
  height: 55px;
  background: #262f3e;
  color: #c1c6c8;
  align-items: center;
  justify-content: space-between;
  .header-left-content{
    font-size: 14px;
  }
  .header-right-content{
    width: 160px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.el-main{
  --el-main-padding: 0;
  background: #f3f4fa;
}
.el-menu-item:hover{
  background: #006eff;
}
:deep(.el-sub-menu__title){
  color: #fff;
}
:deep(.el-sub-menu__title:hover){
  background: #006eff;
}
:deep(.el-menu--inline){
  background: #2b303b;
}
:deep(.el-main){
  max-height: 90vh;
}
</style>