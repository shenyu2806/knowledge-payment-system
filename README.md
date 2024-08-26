## 项目介绍

<h3 align="center">
   基于node.js + Vue3 + uiapp 开发的知识付费系统
</h3>

### 项目图片

#### 前端(Vue2+Uiapp)

![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(7).png)
![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(8).png)
![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(9).png)
![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(10).png)
![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(11).png)

#### 管理前端(Vue3)

![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(1).png)
![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(2).png)
![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(3).png)
![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(4).png)
![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(5).png)

#### 后端服务(node.js)

![](https://gitee.com/fs529/bote_images_url/raw/master/Knowledge-payment-system/imag/a%20(6).png)

### 项目技术

- 前端：Vue2 + Uiapp + Uview
- 管理前端：Vue3 + router + vite + element-plus + axios + mitt + pinia + sass
- 后端服务：node.js + express + cors + bcryptjs + imageinfo + multer + mysql + nodemailer + nodemon + router

### 项目进度
- 已完成：管理前端页面+部分基础逻辑和基础接口，前端页面+部分基础逻辑和基础接口
- 待完成：项目整体逻辑，代码优化

## 运行项目
### 前端
1) 下载`HBuilder X`
2) 拖进位于根目录下的`uiapp`文件夹打开
### 管理前端
```bush
npm i cnpm //可选
cnpm i pnpm //可选
pnpm i | cnpm i
pnpm i electron //可选
pnpm run dev //前端网页
pnpm run electron:serve //启动程序打开
```
### 后端服务
1) 修改`serve/smtp/email.js`里的邮箱配置和`serve/router/email.js`的接口邮箱配置
2) 修改`serve/db/index.js`里的数据库配置
```bush
cpnp i
cpnp run dev //启动后端
cpnp run serve //开发模式启动后端
```