<template>
    <el-config-provider :message="config">
      <router-view></router-view>
    </el-config-provider>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const config = reactive({
  max:1
})
</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
}
</style>
