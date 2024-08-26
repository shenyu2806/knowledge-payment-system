const express = require('express');
const fs = require('fs');
const path = require('path');
// 导入 cors 中间件——支持跨域访问
const cors = require('cors')

 
const app = express();
const port = 3000;
app.use(cors()) 

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//静态托管
const multer = require("multer")
const upload = multer({dest:'./public/upload'})
app.use(upload.any())
// 设置静态文件目录
app.use(express.static("./public"))

//路由
const indexRouter =require('./router/index')
app.use('/',indexRouter)
const sliderRouter =require('./router/slider')
app.use('/slider',sliderRouter)
const courseRouter =require('./router/course')
app.use('/course',courseRouter)
const adminRouter =require('./router/admin')
app.use('/admin',adminRouter)
const listRouter =require('./router/admin_list')
app.use('/admin_list',listRouter)
const logsRouter =require('./router/logs')
app.use('/logs',logsRouter)
const emailRouter =require('./router/email')
app.use('/email',emailRouter)
const setRouter =require('./router/admin_set')
app.use('/admin_set',setRouter)
 
 
// 加载当前目录下的package.json文件
const package = require('./package')
app.listen(port, () => {
  console.log("项目名称："+package.name);
	console.log("版本号："+package.version);
  console.log(`服务运行在:http://localhost:${port}`);
});

//打印错误，防止异常
process.on('uncaughtException', function (err) { 
    //打印出错误 
    console.log(err); 
    //打印出错误的调用栈方便调试 
    console.log(err.stack);
});