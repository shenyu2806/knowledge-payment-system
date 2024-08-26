import instance from "@/utils/http";

//重置密码
export const resetpassword = (email) => {
    return instance({
        url: '/email/resetpassword',
        method: 'post',
        data: {
            email
        }
    })
}
//激活账号
export const countemail = (email) => {
    return instance({
        url: '/email/countemail',
        method: 'post',
        data: {
            email
        }
    })
}