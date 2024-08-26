import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router";


export const useMenu = defineStore("menuInfo",()=> {

    const meniData = ref([])

    const setrouteriop = (arr) => {
        function compilerMenu(arr) {
            if (!arr) {
                return
            }
            meniData.value = arr
            arr.forEach((item) => {
                let rts = {
                    name: item.name,
                    path: item.path,
                    component: item.component
                }
                if (item.children && item.children.length) {
                    compilerMenu(item.children)
                }
                if(!item.children){
                    let  post = loadComponent(item.component)
                    rts.component = post
                    router.addRoute('menu',rts)
                }
                function loadComponent(url) {
                     const Module = import.meta.glob('../views/**/*.vue')
                     return Module[`../views/${url}.vue`]
                }
            })
        }
        compilerMenu(arr)
    }
    const addRouter = () =>{
        setrouteriop(meniData.value)
    }
    return {
        setrouteriop,
        meniData,
        addRouter
    }
},{
      persist: true
})