<template>
    <el-container id="header">
        <el-header  style="height:65px;position:fixed;background: rgb(255,255,255);z-index: 2;width:100%;border-bottom: 1px solid #c6c4ca;">
            <el-row type="flex" align="middle" justify="center">
                <el-menu default-active="/fore/index" active-text-color="rgb(64,158,255)" mode="horizontal"  router>
                    <el-menu-item index="/fore/index" class="nav-bar-item" ><i class="el-icon-s-promotion"></i>首 页</el-menu-item>
                    <el-menu-item index="/fore/news" class="nav-bar-item"><i class="el-icon-edit"></i>随 说</el-menu-item>
                    <el-menu-item index="/fore/category" class="nav-bar-item"><i class="el-icon-menu"></i>分 类</el-menu-item>
                    <el-menu-item index="/fore/tag" class="nav-bar-item"><i class="el-icon-price-tag"></i>标 签</el-menu-item>
                    <el-menu-item index="/fore/archive" class="nav-bar-item"><i class="el-icon-date"></i>归 档</el-menu-item>
                    <el-menu-item index="/fore/about" class="nav-bar-item"><i class="el-icon-more"></i>关 于</el-menu-item>
                </el-menu>
            </el-row>
        </el-header>

            <el-main class="main" style="padding-top: 10px; min-height: calc(100vh - 150px);margin-top:65px">
                <keep-alive >
                    <router-view v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"/>
            </el-main>
        <el-footer id="footer">
            <div class="footer">
                <span>@CopyRight 2019 ZhouJianGuo版权所有</span>
                <br>
                <a href="http://beian.miit.gov.cn" target="_blank">
                    <span>苏ICP备19061991号</span>
                </a>
            </div>
        </el-footer>
            <!--    登录Dialog-->
            <el-dialog :visible.sync="loginDialogDisplay" width="35%">
                <el-row class="login-module">
                    <h1>登 录</h1>
                    <span>选择以下方式第三方进行登录</span>
                    <el-divider></el-divider>
                    <el-tooltip content="Github">
                        <el-button @click="login('github')"><img src="../../assets/login-github.png" ></el-button>
                    </el-tooltip>
                    <el-tooltip content="QQ">
                        <el-button @click="login('qq')"><img src="../../assets/login-qq.png"></el-button>
                    </el-tooltip>
                    <el-tooltip content="Gitee">
                        <el-button @click="login('gitee')"><img src="../../assets/login-gitee.png"></el-button></el-tooltip>
                    <el-divider></el-divider>
                    <span>TIP:只获取你的昵称和头像~</span>
                </el-row>
            </el-dialog>
<!--        右下角小菜单-->

        <div  class="el-backtop animate__animated animate__rollIn"  style="bottom: 240px;right: 40px" @click="$router.go(-1)">
            <i class="el-icon-back"></i>
        </div>
<!--        搜索-->
        <div class="el-backtop animate__animated animate__rollIn"  style="bottom: 190px;right: 40px" @click="drawer=true">
            <i class="el-icon-search"></i>
        </div>
<!--        搜索抽屉-->
        <el-drawer
                :visible.sync="drawer"
                :with-header="false"
                size="20%">
            <div style="    display: flex;
                            flex-direction: column;
                            height: 100%;
                            padding: 20px">
                <el-form :model="form" >
                    <el-form-item label="搜索" >
                        <el-input prefix-icon="el-icon-search" @input="queryArticle" v-model="form.searchValue"  autocomplete="off" clearable minLength="1" maxLength="50"></el-input>
                    </el-form-item>
                </el-form>
<!--                <el-row justify="center" type="flex">-->
<!--                    <el-button @click="drawer=false">取 消</el-button>-->
<!--                    <el-button type="primary" @click="queryArticle" >确 定</el-button>-->
<!--                </el-row>-->
                <span style="margin:10px;text-align: center">包含 “{{showSearchValue}}” 关键字的日志共 {{searchResultList.length}} 条</span>
                <div class="overflow-box" style="padding: 20px;font-size: 20px; height: calc(65vh);">
                    <el-row v-for="(item, index) in searchResultList" v-bind:key="item.id">
                        <el-link  type="primary" @click="selectHandler(item)">{{index+1+". "+item.value}}</el-link>
                    </el-row>
                </div>
            </div>
        </el-drawer>
<!--        登录-->
        <div  class="el-backtop animate__animated animate__rollIn"  style="bottom: 140px;right: 40px" @click="loginDialog">
            <i class="el-icon-user"></i>
        </div>
<!--        注销-->
        <el-popover v-if="userInfoDisplay"
                placement="left"
                width="160"
                v-model="visible">
            <p>是否注销？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible=false">取消</el-button>
                <el-button type="primary" size="mini" @click="logout">确定</el-button>
            </div>
            <div slot="reference" class="el-backtop"  style="bottom: 140px;right: 40px">
                <el-avatar :src="userInfo.avatar"></el-avatar>
            </div>
        </el-popover>
<!--        多媒体-->
<!--        <div class="el-backtop animate__animated animate__rollIn"  style="bottom: 140px;right: 40px" @click="musicNotify">-->
<!--            <i class="el-icon-video-pause "></i>-->
<!--        </div>-->
<!--        前往顶部-->
        <div class="el-backtop animate__animated animate__rollIn" style="bottom: 90px;right: 40px" @click="scrollToTop">
            <i class="el-icon-caret-top"></i>
        </div>
<!--        前往底部-->
        <div class="el-backtop animate__animated animate__rollIn" style="bottom: 40px;right: 40px" @click="scrollToBottom">
            <i class="el-icon-caret-bottom"></i>
        </div>
    </el-container>
</template>

<script>
    import axios from 'axios'
    import { Notification }  from 'element-ui';
    export default {
        name:'fore',
        data() {
            return {
                activeIndex: '1',
                loginDialogDisplay:false,
                userInfo:'',
                userInfoDisplay:false,
                musicURL:'',
                form:{
                    searchValue:'',
                    searchProperty:''
                },
                showSearchValue:'',
                searchResultList:[],
                visible: false,
                drawer:false,
            };
        },
        methods: {
            // musicNotify(){
            //     this.$notify({
            //         title: 'HTML 片段',
            //         dangerouslyUseHTMLString: true,
            //         message: '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src='+this.musicURL+'></iframe>'
            //     })
            // },
            scrollToTop(){
                window.scrollTo({
                    top:0,
                    behavior:'smooth'
                })
            },
            scrollToBottom(){
                let footerLocation = document.getElementById("footer").offsetTop
                window.scrollTo({
                    top:footerLocation,
                    behavior:'smooth'
                })
            },
            queryArticle(){
                this.showSearchValue=this.form.searchValue
                if(this.showSearchValue!=null&&this.showSearchValue!=''){
                    let url=this.baseUrl+"/fore/article/all?searchValue="+this.form.searchValue;
                    axios.get(url).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            // console.log(result.data)
                            this.searchResultList=result.data
                        }
                    })
                }else{
                    this.showSearchValue=''
                    this.searchResultList=[]
                }
            },
            selectHandler(item){
                this.$router.push({name:'article',query:{id:item.id}})
                this.drawer=false
            },
            logout(){
                this.$cookies.remove("zBlogToken");
                Notification({
                    title:'提示',
                    message:'你已成功退出登录！',
                    type:'success'
                })
                this.userInfoDisplay=false;
            },
            check(){//检查token是否有效，有效则获取用户信息，无效则需要重新登录
                 var url=this.baseUrl+"/oauth/check"
                 var token=this.$cookies.get("zBlogToken")
                 axios.get(url,{headers:{Authorization:token}}).then((res)=>{
                     var result=res.data;
                     if(result.code==200){//有效则保存用户信息，并渲染出来
                         this.userInfo=result.data;
                         var message="欢迎回来！来自"+result.data.source+"的"+result.data.username
                        Notification({
                            title:'提示',
                            message:message,
                            type:'success'
                        })
                         this.userInfoDisplay=true;
                     }else if(result.code==201){//无效则渲染出登录按钮
                         this.userInfoDisplay=false;
                         this.$cookies.remove("zBlogToken")
                     }
                 })
            },
            loginDialog(){
                this.loginDialogDisplay=true
            },
            getUserInfo(e){
                var userInfo=e.data;
                if(e.data!=null){
                    var message="来自"+userInfo.source+"的"+userInfo.username+",你已成功登录！"
                    Notification({
                        title:'提示：',
                        message:message,
                        type:'success'
                    })
                    this.userInfo=userInfo;
                    this.userInfoDisplay=true;
                    this.$cookies.set("zBlogToken",userInfo.token,60*60*24*7);
                }else{
                    Notification({
                        title:'提示：',
                        message:'糟糕，登录出现了问题!',
                        type:'error'
                    })
                    this.userInfoDisplay=false;
                }
                window.removeEventListener('message',this.getUserInfo,false)
            },
            login(platform){//登录操作
                this.loginDialogDisplay=false;
                var url=this.baseUrl+"/oauth/login/"+platform
                window.open(url,'newwindow', 'height=500, width=500, top=50, left=50, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')
                window.addEventListener('message', this.getUserInfo,false)
            },
            getMusicURL(){//获取音乐URL
                let url=this.baseUrl+"/fore/setting?name=musicURL"
                axios.get(url).then(res=>{
                    let result= res.data;
                    if(result.code==200){
                        this.musicURL=result.data;
                    }else{
                        Notification({
                            title:'提示',
                            message:'未能获取到背景音乐的链接！',
                            type:'warning'
                        })
                    }
                })
            }
        },
        components:{
        },
        beforeMount(){
            // console.warn("beforeMount")
        },
        mounted(){
            // console.warn("mounted")
        },
        beforeUpdate(){

        },
        created(){
            this.check()
            this.getMusicURL()
        },
    }
</script>

<style>
    @import "~@/assets/css/ckeditor-content.css";
    @import "~animate.css/animate.min.css";
    /* for block of numbers */
    .hljs-ln-numbers {
        text-align: center;
        color: #aaa;
        border-right: 1px solid #CCC;
        vertical-align: top;
        padding-right: 5px !important;

        /* your custom style here */
    }

    /* for block of code */
    .hljs-ln-code {
        padding-left: 5px !important;
    }


    .overflow-box{
        overflow: auto;
    }
    .username{
        color:rgb(64,158,255);
    }
    .avatar{
        vertical-align:center;
    }
    .nav-bar-item{
        font-size: 17px;
        font-family: "Helvetica Neue";
        text-align: center;
    }
    .breadcrumb{
        padding: 15px;
    }
    .breadcrumb-item{
        font-size: 15px;
    }
    .footer{
        text-align: center;
        background: white;
        padding: 20px;
    }
    .main{
        min-height: 700px;
    }
    .login-module{
        text-align: center;
    }

    .tag-cloud{
        height: 300px;
    }
    .pagination{
        text-align: center;
    }
    .card{
        margin-top: 5px;
    }
    .el-link--inner{
        /*transition: all 500ms;*/
    }

    i{
        font-size: 16px;
        color: rgb(92,182,255);
    }
    .el-timeline-item__timestamp.is-top{
        margin-bottom: 8px;
        padding-top: 3px;

    }
    .el-timeline-item__wrapper{
        padding: 0px 20px;
    }
    .el-timeline-item__tail{position:absolute;left:4px;height:100%;border-left:2px solid #accaf7}
    .el-card{
        border: 1px solid #d3d5d7;
        background-color: #FFF;
        color: #303133;
        transition: .3s;
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
    .el-footer {
        /* border-top: 1px solid rgb(220,223,230); */
        text-align: center;
        background: white;
        border-top: 1px solid #c6c4ca
    }
    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
        box-shadow: 4px 4px 6px 3px rgba(140, 140, 140, 0.2);
    }

    .nav-menu{
        text-align: center;
        padding: 10px;

    }
    .list-complete-leave-to{
        display: none;
    }
    /** scroll bar custom
     style
    /* width */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgb(235, 235, 235);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(190, 190, 190);
        border-radius:5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(150, 150, 150);
    }

    .el-scrollbar__wrap{ overflow-x:hidden; }
</style>