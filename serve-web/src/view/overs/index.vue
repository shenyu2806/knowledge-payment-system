<template>
<!--  首页-->
  <bread_Crumb ref="breadcrumb" :item="item"></bread_Crumb>
  <div class="home-main">
    <div class="home-div" v-for="(item,index) in titexe" :key="index">
      <div class="home-div-text">{{item.text}}</div>
      <div class="home-div-num">{{item.num}}</div>
    </div>
    <div class="home-div home-coannt">

    </div>
  </div>
</template>
<script lang="ts" setup>
//面包屑
import {ref} from "vue";
import {getuserskl}from"@/api/admin"
import bread_Crumb from '@/components/bread_crumb.vue'
import * as echarts from 'echarts';

const breadcrumb =ref()
const item = ref({
  first:'信息管理'
})
const getusersrte = async () =>{
  const res = await getuserskl();
  titexe.value = res.data
  const acetac = res.ecte
  manageUser(acetac)
}
getusersrte()
const titexe = ref([])
//图标
const manageUser = (acetac) => {
  // 通过类名 初始化
  const mu = echarts.init(document.querySelector('.home-coannt'))
  document.querySelector('.home-coannt').setAttribute('_echarts_instance_', '')
  // 设置基本的参数
  mu.setOption({
    title: {
      text: '系统资源对比图',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      padding: [20, 20, 20, 20]
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        data:acetac,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  // 用于echarts响应式
  window.addEventListener('resize', function () {
    mu.resize()
  })
}
</script>

<style lang="scss" scoped>
.home-main{
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
}
.home-div{
  width: 220px;
  height: 150px;
  margin: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px 5px #a5a5a5;
  color: white;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.home-div:nth-child(1n){
  background: cadetblue;
}
.home-div:nth-child(2n){
  background: cornflowerblue;
}
.home-div:last-of-type{
  background: rgba(76, 76, 76, 0.13);
}
.home-div-text{
  font-size: 28px;
  font-weight: 400;
}
.home-div-num{
  margin-top: 20px;
  font-size: 24px;
}
.home-coannt{
  margin-top: 10px;
  width: 100%;
  height:450px;
  padding-top: 15px;
}
</style>