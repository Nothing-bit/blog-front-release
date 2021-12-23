import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    mode: 'hash',
    routes: [
        {//admin login
            path:'/admin/login',
            name:'adminLogin',
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
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/NewsList")
                    component:resolve =>require(["@/components/admin/NewsList"],resolve)
                },
                {//日志列表
                    path:'article/list',
                    name:'articleList',
                    meta:{
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/ArticleList")
                    component:resolve =>require(["@/components/admin/ArticleList"],resolve)
                },
                {//日志添加
                    path:'article/add',
                    name:'articleAdd',
                    // component:()=>import("@/components/admin/ArticleAdd")
                    component:resolve =>require(["@/components/admin/ArticleAdd"],resolve)
                },
                {//日志修改
                    path:'article/update',
                    name:'articleUpdate',
                    // component:()=>import("@/components/admin/ArticleUpdate")
                    component:resolve =>require(["@/components/admin/ArticleUpdate"],resolve)
                },
                {//分类列表
                    path:'category/list',
                    name:'categoryList',
                    meta:{
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/CategoryList")
                    component:resolve =>require(["@/components/admin/CategoryList"],resolve)
                },
                {//标签列表
                    path:'tag/list',
                    name:'tagList',
                    meta:{
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/TagList")
                    component:resolve =>require(["@/components/admin/TagList"],resolve)
                },
                {//评论列表
                    path: 'article/comment/list',
                    name:'articleCommentList',
                    meta:{
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/ArticleCommentList")
                    component:resolve =>require(["@/components/admin/ArticleCommentList"],resolve)
                },
                {//留言列表
                    path: "comment/list",
                    name:'commentList',
                    meta:{
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/CommentList")
                    component:resolve =>require(["@/components/admin/CommentList"],resolve)
                },
                {//友链列表
                    path: 'friend/link/list',
                    name:'friendLinkList',
                    meta:{
                        keepAlive:true,
                    },
                    // component:()=>import("@/components/admin/FriendLinkList")
                    component:resolve =>require(["@/components/admin/FriendLinkList"],resolve)
                },
                {//其他
                    path:'other',
                    name:'other',
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
                    },
                    component:resolve =>require(["@/components/fore/Index"],resolve),
                },
                {
                    //分类
                    path:'category',
                    name:'category',
                    meta:{
                        keepAlive:true,
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
                    },
                    // component:()=>import("@/components/fore/Tag")
                    component:resolve =>require(["@/components/fore/Tag"],resolve)
                },
                {
                    //标签日志
                    path:'tagArticle',
                    name:'tagArticle',
                    meta:{
                        keepAlive:true,
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
                        keepAlive:true,
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
                    },
                    // component:()=>import('@/components/fore/About')
                    component:resolve =>require(["@/components/fore/About"],resolve)
                }
            ]
        },
        {
            path: '/',
            redirect:'/fore/index'
        }
    ]
})