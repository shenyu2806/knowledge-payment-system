<template>
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="serate-main">
    <div class="seact">
      <el-input v-model="seactVe" placeholder="请输入课程名称" clearable />
      <el-button type="primary" @click="">搜索</el-button>
      <el-button type="success" @click="">重置</el-button>
      <el-text>查询到：<span>{{pagination.total}}</span> 条数据</el-text>
    </div>
    <div class="button">
      <el-button type="success" @click="">新增</el-button>
    </div>
  </div>
  <div class="table-main">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="courseName" label="课程名称" width="140" align="center"/>
      <el-table-column prop="firstCategoryName" label="一级分类" width="140" align="center"/>
      <el-table-column prop="secondCategory" label="二级分类" width="140" align="center">
        <template #default="{row}">
          <el-tag type="success" v-if="row.secondCategory == null">暂无</el-tag>
          <el-text v-else>{{row.secondCategory}}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="创建人" width="120" align="center"/>
      <el-table-column prop="lecturerName" label="课程讲师" width="120" align="center">
        <template #default="{row}">
          <el-text v-if="row.secondCategory">{{row.lecturerName}}</el-text>
          <el-tag type="danger" v-else>待定</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="salePrice" label="标价" width="80" align="center"/>
      <el-table-column prop="discountPrice" label="优惠价格" width="80" align="center">
        <template #default="{row}">
          <el-tag type="success" v-if="row.discountPrice == 0">免费</el-tag>
          <el-text v-else>{{row.discountPrice}}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="isIntegral" label="使用积分" width="80" align="center">
        <template #default="{row}">
          <el-tag type="success" v-if="row.isIntegral == 1">使用</el-tag>
          <el-tag type="danger" v-else>不使用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="teachingType" label="授课类型" width="80" align="center">
        <template #default="{row}">
          <el-text v-if="row.teachingType == 1">录播</el-text>
          <el-text v-else>直播</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="clicks" label="观看数" width="80" align="center">
        <template #default="{row}">
          <el-text v-if="row.clicks > 100">{{(row.clicks / 10000).toFixed(2)}}w</el-text>
          <el-text v-else>{{row.clicks}}</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="isRecommend" label="推荐" width="90" align="center">
        <template #default="{row}">
          <el-text v-if="row.isRecommend == 1">推荐</el-text>
          <el-text v-else>不推荐</el-text>
        </template>
      </el-table-column>
      <el-table-column prop="isMember" label="会员课程" width="80" align="center">
        <template #default="{row}">
          <el-tag type="primary" v-if="row.isMember == 1">是</el-tag>
          <el-tag type="success" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="saleType" label="售卖类型"width="92" align="center">
        <template #default="{row}">
          <el-text v-if="row.saleType == 1">普通售卖</el-text>
          <el-tag type="success" v-else>不对外售卖</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="tags" label="标签" align="center" width="160">
        <template #default="{row}">
          <el-tag type="success" style="margin-left: 5px" v-for="(item,index) in row.tags" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120" align="center"/>
      <el-table-column prop="updateTime" label="更新时间" width="120" align="center"/>
      <el-table-column prop="status" label="状态" align="center">
        <template #default="{row}">
          <el-tag type="danger" v-if="row.status == '0'">下架</el-tag>
          <el-tag type="success" v-else>上架</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="160" align="center">
        <template #default="{row}">
          <div style="display: flex;margin-left: 5px">
            <el-button type="primary">编辑</el-button>
            <el-button type="success">修改</el-button>
          </div>
          <div style="margin: 5px; display: flex;">
            <el-button type="warning"  v-if="row.status == '1'">封号</el-button>
            <el-button type="info"  v-else>解封</el-button>
            <el-button type="danger" >删除</el-button>
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
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
//头部
import bread_Crumb from '@/components/bread_crumb.vue'
import {getcoursesList,getcourseslegth} from "@/api/list"
const breadcrumb =ref()
const item = ref({
  first:'课程管理',
  second:'课程信息'
})
//表格数据
const tableData = ref([])
//动画
const loading = ref(true)
//搜索框数据
const seactVe = ref()
//分页数据
const pagination = reactive({
  total:5,//总数
  pagesize:5,//每页数量
  num:1,//默认页面
  id:0 ,//默认id
  indexid:1 //第一个id
})
//获取表格数据
const getList = async () =>{
  const res = await getcoursesList(pagination.pagesize,pagination.id)
  tableData.value = res.result
  const leng = res.length - 1
  if(pagination.num == 0){
    pagination.indexid = res.result[leng].id
  }
  pagination.id = res.result[leng].id
  gettotal("n")
  await new Promise(resolve => setTimeout(resolve, 1000));//等待1秒
  loading.value = false
}
getList()
//获取总数
const gettotal= async (num) =>{
  if(num == "n"){
  const res = await getcourseslegth()
    pagination.total = res.length
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