<template>
    <el-container id="header">
        <!---头部--->
        <el-header style="height: 65px;width: 100%;background: rgb(255,255,255);z-index: 2;">
            <el-row type="flex" align="middle" justify="center" >
                <el-menu mode="horizontal" active-text-color="rgb(64,158,255)" default-active="/admin/article/list" router>
                    <el-menu-item class="nav-bar-item" index="/admin/news/list"><i class="el-icon-edit"></i>随 说</el-menu-item>
                    <el-menu-item class="nav-bar-item" index="/admin/article/list"><i class="el-icon-document"></i>日 志</el-menu-item>
                    <el-menu-item class="nav-bar-item" index="/admin/category/list"><i class="el-icon-menu"></i>分 类</el-menu-item>
                    <el-menu-item class="nav-bar-item" index="/admin/tag/list"><i class="el-icon-price-tag"></i>标 签</el-menu-item>
                    <el-menu-item class="nav-bar-item" index="/admin/article/comment/list"><i class="el-icon-chat-line-round"></i>评 论</el-menu-item>
                    <el-menu-item class="nav-bar-item" index="/admin/comment/list"><i class="el-icon-chat-dot-round"></i>留 言</el-menu-item>
                    <el-menu-item class="nav-bar-item" index="/admin/friend/link/list"><i class="el-icon-link"></i>友 链</el-menu-item>
                    <el-menu-item class="nav-bar-item" index="/admin/other"><i class="el-icon-set-up"></i>其 他</el-menu-item>
                </el-menu>
            </el-row>
        </el-header>
<!--        中间主要内容-->
        <el-main style="min-height: calc(85vh)">
            <keep-alive >
                <router-view v-if="$route.meta.keepAlive"/>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"/>
        </el-main>
        <!--        前往顶部-->
        <div class="el-backtop" style="bottom: 90px;right: 40px" @click="scrollToTop">
            <i class="el-icon-caret-top"></i>
        </div>
        <!--        前往底部-->
        <div class="el-backtop" style="bottom: 40px;right: 40px" @click="scrollToBottom">
            <i class="el-icon-caret-bottom"></i>
        </div>
<!--底部-->
        <el-footer id="footer" class="footer" style="height: calc(7vh)">
            <span>@CopyRight 2019 ZhouJianGuo版权所有</span>
            <br>
            <a href="http://beian.miit.gov.cn" target="_blank">
                <span>苏ICP备19061991号</span>
            </a>
        </el-footer>
    </el-container>
</template>

<script>
    export default {
        name: "Admin",
        data(){
            return{
            }
        },
        methods:{
            scrollToTop(){
                document.getElementById("header").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
            },
            scrollToBottom(){
                document.getElementById("footer").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
            },
        }
    }
</script>

<style>
    .nav-bar-item{
        font-size: 17px;
        font-family: "Helvetica Neue";
    }
    .header{
        border-bottom:1px solid rgb(220,223,230);
    }
    .aside{
        text-align: center;
    }
    .el-footer {
        /* border-top: 1px solid rgb(220,223,230); */
        text-align: center;
        background: white;
        border-top: 1px solid #c6c4ca
    }
    .el-header {
        padding: 0 20px;
        box-sizing: border-box;
        flex-shrink: 0;
        border-bottom: 1px solid #c6c4ca;
    }
    .el-menu.el-menu--horizontal {
        border-bottom: none;
    }
    .table-button-container{
        padding-bottom: 20px;
    }
</style>