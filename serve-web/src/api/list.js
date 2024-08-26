import instance from "@/utils/http";
//查询用户数据 搜索
export const getserteList = (identity,name) => {
    return instance({
        url: '/admin_list/getserteList',
        method: 'post',
        data: {
            identity,
            name
        }
    })
}
//封号功能
export const getsteruo = (id,time) => {
    return instance({
        url: '/admin_list/getsteruo',
        method: 'post',
        data: {
            id,
            time
        }
    })
}
//解除封号
export const posteruo = id => {
    return instance({
        url: '/admin_list/posteruo',
        method: 'post',
        data: {
            id
        }
    })
}
//删除用户
export const deleteuser = id => {
    return instance({
        url: '/admin_list/deleteuser',
        method: 'post',
        data: {
            id
        }
    })
}
//获取用户表数据
export const getAdmingListLength = (identity,LIMIT,id) => {
    return instance({
        url: '/admin_list/getAdmingListLength',
        method: 'post',
        data: {
            identity,
            LIMIT,
            id
        }
    })
}
//获取会员等级
export const modexve = () => {
    return instance({
        url: '/admin_list/modexve',
        method: 'get',
    })
}
//用户信息更新
export const updeuser = data => {
    return instance({
        url: '/admin_list/updeuser',
        method: 'post',
        data
    })
}
//添加用户
export const intouser = data => {
    return instance({
        url: '/admin_list/intouser',
        method: 'post',
        data
    })
}
//查询课程数据
export const getcoursesList = (LIMIT,id) => {
    return instance({
        url: '/admin_list/getcoursesList',
        method: 'post',
        data:{
            LIMIT,
            id
        }
    })
}
//查询课程数量
export const getcourseslegth = () => {
    return instance({
        url: '/admin_list/getcourseslegth',
        method: 'get',
    })
}