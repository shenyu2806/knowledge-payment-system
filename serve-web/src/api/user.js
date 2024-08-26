import instance from "@/utils/http";

//获取用户数据
export const getuserInfor = id => {
    return instance({
        url: '/admin/getuserInfo',
        method: 'post',
        data: {
            id
        }
    })
}