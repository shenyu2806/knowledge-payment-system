import instance from "@/utils/http";

//获取系统数据
export const getset = () => {
    return instance({
        url: '/admin_set/all',
        method: 'get',
    })
}
//获取系统name数据
export const setwei = (name) => {
    return instance({
        url: '/admin_set/setwei',
        method: 'post',
        data:{
            name
        }
    })
}