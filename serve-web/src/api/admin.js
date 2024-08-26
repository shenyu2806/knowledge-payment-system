import instance from "@/utils/http";

//注册
export const register = data => {
    const {
        account,
        email,
        password,
    } = data
    return instance({
        url: '/admin/register',
        method: 'post',
        data: {
            account,
            email,
            password
        }
    })
}
//登录
export const login = data => {
    const {
        account,
        password
    } = data
    return instance({
        url: '/admin/login',
        method: 'post',
        data: {
            account,
            password
        }
    })
}
//忘记密码验证
export const verify = data => {
    const {
        account,
        email
    } = data
    return instance({
        url: '/admin/verifyAccountAndEmail',
        method: 'post',
        data: {
            account,
            email
        }
    })
}
//密码重置
export const resetPassword = (id,newpassword) => {
    return instance({
        url: '/admin/changePasswordInLogin',
        method: 'post',
        data: {
            id,
            newpassword
        }
    })
}
//获取用户人数
export const getuserskl = () => {
    return instance({
        url: '/admin/getuserskl',
        method: 'get',
    })
}