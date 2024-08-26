const http = uni.$u.http

//轮播图
export const getSliders = (data) => http.get('/slider/getSliders', data)

//计入搜索
export const HotKeywords = (data) => http.post('/slider/keywords/HotKeywords', data)

//获取热门搜索post
export const getHotKeywords = (data) => http.get('/slider/keywords/getHotKeywords', data)

//获取首页公告
export const getannouncement = (data) => http.get('/slider/system/announcement', data)