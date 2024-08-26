const http = uni.$u.http

//查询数量
export const setnum = (data) => http.get('/course/setnum', data)
//查询推荐
export const getmostNew = (data) => http.post('/course/mostNew', data)
//最热课程
export const getmostHeat = (data) => http.post('/course/mostHeat', data)
//查询课程
export const search = (data) => http.post('/course/search', data)
//一级分类
export const getFirstCategorys = (data) => http.get('/course/category/getFirstCategorys', data)
//二级分类
export const getSecondCategorys = (data) => http.post('/course/category/getSecondCategorys', data)