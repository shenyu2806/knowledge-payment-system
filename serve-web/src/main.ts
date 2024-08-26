import { createApp } from 'vue'
import App from './App.vue'
//router
import router from "@/router";
//pimia
import pinia from "@/store";
//axios
import instance from "@/http";
//element
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
//svg
import 'virtual:svg-icons-register'
//全局css
import "@/assets/css/index.css"
const app = createApp(App)
//eLement·pLus国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

app.use(ElementPlus, {
    locale: zhCn,
})
for (const [key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}
app.use(pinia)
app.use(router)
app.mount('#app')
//配置运行输出
console.log('欢迎使用团星网管理系统！');