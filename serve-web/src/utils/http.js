import axios from 'axios'
import {ElMessage} from "element-plus";
import router from "@/router";
const token = localStorage.getItem("token")

const instance = axios.create({
    //后端地址
    baseURL:'http://172.17.1.13:3000',
    timeout:6000,
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        'Authorization': `Bearer ${token}`
    }
});
// request interceptor(请求拦截器)
instance.interceptors.request.use(function (config){
    return config;
},function (error){
    return Promise.reject(error);
})
// response interceptor（接收拦截器）
instance.interceptors.response.use(function (response){
    if(response.data.status || response.data.message){
        if(response.data.status == 0){
            if(response.data.status == 0 && response.data.message){
                ElMessage({
                    type: 'success',
                    message:response.data.message,
                })
            }else{
                ElMessage({
                    type: 'success',
                    message:"成功啦~",
                })
            }
        }else{
            if(response.data.status != 3 && response.data.status != 1 && response.data.status != 403){
                ElMessage.error("出现错误啦~")
            }
        }
    }
    return response.data;
},function (error){
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        ElMessage.error('请求超时啦~')
        console.log('请求超时啦~')
        // 超时处理逻辑
    }
    if (error.code === 'ERR_BAD_REQUEST') {
        ElMessage.error("没有权限")
        console.log("没有权限")
        return router.push('/login')
    }
    if(error && error.response){
        switch (error.response.status){
            case 400:
                error.message = "请求异常"
                break
            case 401:
                error.message = "没有权限"
                break
            case 402:
                error.message = "请求异常"
                break
            case 403:
                error.message = "请求异常"
                break
            case 404:
                error.message = "请求异常"
                break
            case 500:
                error.message = "服务器内部错误"
                break
            case 501:
                error.message = "服务器内部错误"
                break
            case 502:
                error.message = "服务器内部错误"
                break
            case 503:
                error.message = "服务器内部错误"
                break
            case 504:
                error.message = "网关超时"
                break
            case 505:
                error.message = "HTTP版本不受支持"
                break
        }
    }
    return Promise.reject(error);
})

export default instance ;