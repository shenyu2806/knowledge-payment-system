import instance from "@/utils/http";
import {ref} from "vue";


// 万能日志计入
export const logs = (type,account,description) => {
    return instance({
        url: '/logs/logs',
        method: 'post',
        data: {
            account,
            type,
            description
        }
    })
}
// 万能日志获取
export const getlogs = (type) => {
    return instance({
        url: '/logs/getlogs',
        method: 'post',
        data: {
            type
        }
    })
}
// 万能日志清空
export const deletelogs = (type) => {
    return instance({
        url: '/logs/deletelogs',
        method: 'post',
        data: {
            type
        }
    })
}