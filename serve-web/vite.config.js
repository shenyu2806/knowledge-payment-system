import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import{ resolve } from 'path'
import{createSvgIconsPlugin} from 'vite-plugin-svg-icons'
const pathResolve = dir => resolve(__dirname,dir)

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
      vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  server:{
    host:"0.0.0.0",
    port:8080,//项目端口
    open:false,//启动浏览器
    cors:true,//允许跨域
    proxy: {
      // 在此处编写代理规则
    },
  },
  resolve:{
    dedupe:['vue'],//解决引入外部库vue版本不一致的问题
    alias:{
      '@': pathResolve('./src')
    }
  }
})
