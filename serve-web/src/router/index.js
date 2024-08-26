import { createRouter, createWebHistory } from 'vue-router';

import a404 from '@/view/err/404.vue'

const routes =[
    {
        path:'/',
        redirect:'/home'
    },
    {
        name:'login',
        path:'/login',
        component:()=>import("@/view/login/index.vue"),
    },
    {
        name:'menu',
        path:'/menu',
        component:()=>import("@/view/menu/index.vue"),
        children:[
            {
                name:'home',
                path:'/home',
                component:()=>import("@/view/home/index.vue"),
            },
            {
                name:'overs',
                path:'/overs',
                component:()=>import("@/view/overs/index.vue"),
            },
            {
                name:'courses_list',
                path:'/courses/courses_list',
                component:()=>import("@/view/courses/courses_list/index.vue"),
            },
            {
                name:'courses_classification',
                path:'/courses/courses_classification',
                component:()=>import("@/view/courses/course_classification/index.vue"),
            },
            {
                name:'courses_level',
                path:'/courses/courses_level',
                component:()=>import("@/view/courses/course_level/index.vue"),
            },
            {
                name:'users_list',
                path:'/users/users_list',
                component:()=>import("@/view/users_counter/users_list/index.vue"),
            },
            {
                name:'users_teacher',
                path:'/users/users_teacher',
                component:()=>import("@/view/users_counter/user_teacher/index.vue"),
            },
            {
                name:'logs',
                path:'/logs/logs_login',
                component:()=>import("@/view/logs/logs_login/index.vue"),
            },
            {
                name:'general_settings',
                path:'/settings/general',
                component:()=>import("@/view/setting/general/index.vue"),
            },
        ]
    },
    {
        name:'404',
        path:'/404',
        component:a404
    },
    // 当什么都没有匹配到的时候，重定向页面到 404 页面
    { path: "/:pathMatch(.*)", redirect: "/404", name: "notMatch", hidden: true },
]

// 创建router实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

//全局前置路由
router.beforeEach((to,from,next)=>{
    //const userinfor = localStorage.getItem('pinia-userinfor')
    const token = localStorage.getItem('token')

    if(to.name != 'login' && ! token) {
        next({name:'login'})
    }else{
        next()
    }
})

export default router;
