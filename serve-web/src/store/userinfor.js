import { defineStore } from "pinia";
import { getuserInfor} from "@/api/user";

export const userinfor = defineStore('userinfor',{
    state:()=>{
        return{
            id:'',
            imageUrl:'',
            name:'',
            sex:'',
            permissions:'',
            identity:'',
            account:'',
            email:'',
        }
    },
    actions:{
        async userinfor (id){
            const res = await getuserInfor(id)
            this.id = res.id
            this.imageUrl = res.image_url
            this.name = res.name
            this.sex = res.sex
            this.permissions = res.permissions
            this.identity = res.identity
            this.account = res.account
            this.email = res.email
        }
    }
},{
    persist:{
        //存储用户
        enabled:true,
        // 关键字
        key:'userinfor',
        storage:localStorage,
    }
})