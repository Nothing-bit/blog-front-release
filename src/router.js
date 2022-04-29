import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {//admin login
            path:'/admin/login',
            name:'adminLogin',
            meta:{
               title:"ZBlog后台 | 登录"
            },
            // component: ()=>import("@/components/admin/AdminLogin"),
            component:resolve =>require(["@/components/AdminLogin"],resolve)
        },
        {//admin
            path:'/admin',
            name:'admin',
            // component: ()=>import("@/components/admin/Admin"),
            component:resolve =>require(["@/components/admin/Admin"],resolve),
            children:[
                {//微动态列表
                    path:"news/list",
                    name:'newsList',
                    meta:{
                        title:"ZBlog后台 | 随说列表",
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/NewsList")
                    component:resolve =>require(["@/components/admin/NewsList"],resolve)
                },
                {//日志列表
                    path:'article/list',
                    name:'articleList',
                    meta:{
                        title: "ZBlog后台 | 日志列表",
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/ArticleList")
                    component:resolve =>require(["@/components/admin/ArticleList"],resolve)
                },
                {//日志添加
                    path:'article/add',
                    name:'articleAdd',
                    meta: {
                        title: "ZBlog后台 | 添加日志",
                    },
                    // component:()=>import("@/components/admin/ArticleAdd")
                    component:resolve =>require(["@/components/admin/ArticleAdd"],resolve)
                },
                {//日志修改
                    path:'article/update',
                    name:'articleUpdate',
                    meta:{
                        title: "ZBlog后台 | 修改日志",
                    },
                    // component:()=>import("@/components/admin/ArticleUpdate")
                    component:resolve =>require(["@/components/admin/ArticleUpdate"],resolve)
                },
                {//分类列表
                    path:'category/list',
                    name:'categoryList',
                    meta:{
                        title: "ZBlog后台 | 分类列表",
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/CategoryList")
                    component:resolve =>require(["@/components/admin/CategoryList"],resolve)
                },
                {//标签列表
                    path:'tag/list',
                    name:'tagList',
                    meta:{
                        title: "ZBlog后台 | 标签列表",
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/TagList")
                    component:resolve =>require(["@/components/admin/TagList"],resolve)
                },
                {//评论列表
                    path: 'article/comment/list',
                    name:'articleCommentList',
                    meta:{
                        title: "ZBlog后台 | 评论列表",
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/ArticleCommentList")
                    component:resolve =>require(["@/components/admin/ArticleCommentList"],resolve)
                },
                {//留言列表
                    path: "comment/list",
                    name:'commentList',
                    meta:{
                        title: "ZBlog后台 | 留言列表",
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/CommentList")
                    component:resolve =>require(["@/components/admin/CommentList"],resolve)
                },
                {//友链列表
                    path: 'friend/link/list',
                    name:'friendLinkList',
                    meta:{
                        title: "ZBlog后台 | 友链列表",
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/FriendLinkList")
                    component:resolve =>require(["@/components/admin/FriendLinkList"],resolve)
                },
                {//其他
                    path:'other',
                    name:'other',
                    meta:{
                        title: "ZBlog后台 | 其他设置",
                    },
                    // component:()=>import("@/components/admin/Other")
                    component:resolve =>require(["@/components/admin/Other"],resolve)
                }
            ]
        },
        {//fore
            path: '/fore',
            name:'fore',
            // component: Fore,
            component:resolve =>require(["@/components/fore/Fore"],resolve),
            children:[
                {
                    //首页
                    path:'index',
                    name:'index',
                    // component:()=>import('@/components/fore/Index')
                    meta:{
                        keepAlive:true,
                        title:'ZBlog | 首 页'
                    },
                    // component:()=>import('@/components/fore/Index.vue')
                    component:resolve =>require(["@/components/fore/Index"],resolve),
                },
                {
                    //分类
                    path:'category',
                    name:'category',
                    meta:{
                        keepAlive:true,
                        title:'ZBlog | 分 类'
                    },
                    // component:()=>import("@/components/fore/Category")
                    component:resolve =>require(["@/components/fore/Category"],resolve)
                },
                {
                    //标签
                    path:'tag',
                    name:'tag',
                    meta:{
                        keepAlive:true,
                        title:'ZBlog | 标 签'
                    },
                    // component:()=>import("@/components/fore/Tag")
                    component:resolve =>require(["@/components/fore/Tag"],resolve)
                },
                {
                    //标签日志
                    path:'tagArticle',
                    name:'tagArticle',
                    meta:{
                        keepAlive:false,
                    },
                    // component:()=>import("@/components/fore/TagArticle")
                    component:resolve =>require(["@/components/fore/TagArticle"],resolve)
                },
                {
                    //归档
                    path:'archive',
                    name:'archive',
                    meta:{
                        keepAlive:true,
                        title:'ZBlog | 归 档'
                    },
                    // component:()=>import("@/components/fore/Archive")
                    component:resolve =>require(["@/components/fore/Archive"],resolve)
                },
                {
                    //日志内容页
                    path:'article',
                    name:'article',
                    props:true,
                    // component:()=>import('@/components/fore/Article')
                    component:resolve =>require(["@/components/fore/Article"],resolve)
                },
                {
                    //微动态
                    path:'news',
                    name:'news',
                    meta:{
                        keepAlive:false,
                        title:'ZBlog | 随 说'
                    },
                    // component:()=>import('@/components/fore/News')
                    component:resolve =>require(["@/components/fore/News"],resolve)
                },
                {
                    //关于页
                    path:'about',
                    name:'about',
                    meta:{
                        keepAlive:true,
                        title:'ZBlog | 关 于'
                    },
                    // component:()=>import('@/components/fore/About')
                    component:resolve =>require(["@/components/fore/About"],resolve)
                },
                {
                    //第三方登录回调+验证界面
                    path:'callback/:platform',
                    name:'OauthLogin',
                    meta:{
                        keepAlive: false,
                        title:"第三方登录验证"
                    },
                    component:resolve => require(["@/components/fore/OauthLogin"], resolve)
                }
            ]
        },
        {
            path: '/',
            redirect:'/fore/index'
        },
        {
            path:'/admin/*',
            redirect: '/admin/login'
        }
    ]
})

router.beforeEach((to, from, next) => {
    // if (to.meta.requiresAuth) {
    //     api.login.getToken()
    //     next()
    // } else {
    //     next()
    // }
    if (to.meta.title) {
        document.title = to.meta.title
        next()
    } else {
        next()
    }
})

export default router;