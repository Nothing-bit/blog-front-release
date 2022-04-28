<template>
    <div>
<!--        简介模块-->
        <el-row>
            <el-col :xl="{span:18,offset:3}" :lg={span:20,offset:2} :md={span:24}>
                <!--                面包屑导航-->
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a class="breadcrumb-item">关 于</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <!--                主体card-->
                <transition appear
                            appear-active-class="animate__animated animate__fadeIn"
                            enter-active-class="animate__animated animate__fadeIn">
                    <el-card >
                        <div  class="info-content ck-content"  v-html="myInfo">

                        </div>
                    </el-card>
                </transition>
            </el-col>
        </el-row>
<!--        留言模块-->
        <el-row>
            <el-col :xl="{span:18,offset:3}" :lg={span:20,offset:2} :md="24">
                <el-card shadow="hover" class="comment-module" v-loading="formLoading">
                    <!--                    发表留言表单模块-->
                    <el-row>
                        <el-col :lg={span:12,offset:6} :md={span:20,offset:2}>
                            <el-form :model="form" ref="form" label-position="top">
                                <el-form-item class="form-item" label="内容" prop="content">
                                    <el-input type="textarea" v-model="form.content" maxlength="400" rows="6" show-word-limit resize="none"></el-input>
                                </el-form-item>
                                <el-form-item class="form-item" label="被回复时，邮件告诉我">
                                    <el-switch v-model="form.inform"></el-switch>
                                </el-form-item>
                                <el-form-item  class="form-item" label="邮件地址" prop="email">
                                    <el-input type="email" :disabled="!form.inform" v-model="form.email"></el-input>
                                </el-form-item>
                                <el-form-item class="form-item" style="text-align: center">
                                    <el-button type="primary" @click="submitComment">提交</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-card>

                <!--                    历史留言模块-->
                <div class="infinite-list" infinite-scroll-delay="1000" v-infinite-scroll="getComment" style="overflow:auto">
                    <el-card v-for="item in list" shadow="hover" class="infinite-list-item comment-module" v-bind:key="item.id">
                        <el-row type="flex" align="middle">
                            <el-col :lg={span:16,offset:4} :md={span:24} :sm={span:24}>
                                <el-row type="flex" align="middle">
                                    <el-col :lg={span:2} :md={span:2} :sm="{span:2}">
                                        <el-avatar :size="50" :src="item.avatar" shape="square"></el-avatar>
                                    </el-col>
                                    <el-col :lg={span:6} :md={span:6} :sm="{span:6}">
                                        <p class="username">{{item.username}}</p>
                                    </el-col>
                                    <el-col :lg={span:8,offset:8} :md={span:8,offset:8} :sm="{span:8,offset:8}">
                                        <p class="create-by">留言于：{{item.createBy}}</p>
                                    </el-col>
                                </el-row>
                                <p class="content-module">{{item.content}}</p>
                                <el-button size="mini" round @click="reply(item.userId,item.id,item.username)">回复</el-button>
                                <!--                                子回复模块-->
                                <div v-for="childItem in item.replyList" v-bind:key="childItem.id">
                                    <el-divider></el-divider>
                                    <el-row type="flex" align="middle">
                                        <el-col :lg={span:2} :md={span:2} :sm="{span:2}">
                                            <el-avatar :size="50" :src="childItem.avatar" shape="square" class="avatar"></el-avatar>
                                        </el-col>
                                        <el-col :lg={span:6} :md={span:6} :sm="{span:6}">
                                            <p class="username">{{childItem.username}} 回复：{{childItem.targetUsername}}</p>
                                        </el-col>
                                        <el-col :lg={span:8,offset:8} :md={span:8,offset:8} :sm="{span:8,offset:8}">
                                            <p class="create-by">回复于：{{childItem.createBy}}</p>
                                        </el-col>
                                    </el-row>
                                    <p class="content-module">{{childItem.content}}</p>
                                    <el-button size="mini" round @click="reply(childItem.userId,item.id,childItem.username)">回复</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
                <el-card shadow="hover" class="last-card">
                    <h3 style="text-align: center" v-if="commentLoading"><i class="el-icon-loading"></i>努力加载中</h3>
                    <h3 style="text-align: center" v-if="!hasNextPage">没有更多留言了！</h3>
                </el-card>
            </el-col>
        </el-row>
        <!--        子回复弹窗-->
        <el-dialog
                :visible.sync="replyDialogDisplay"
                width="50%"
                center>
            <span>回复：{{targetUsername}}</span>
            <el-form :model="form" ref="form" label-position="top" v-loading="formLoading">
                <el-form-item class="form-item" label="内容" prop="content">
                    <el-input type="textarea" v-model="form.content" maxlength="400" rows="6" show-word-limit resize="none"></el-input>
                </el-form-item>
                <el-form-item class="form-item" label="被回复时，邮件告诉我">
                    <el-switch v-model="form.inform"></el-switch>
                </el-form-item>
                <el-form-item  class="form-item" label="邮件地址" prop="email">
                    <el-input type="email" :disabled="!form.inform" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item class="form-item" style="text-align: center">
                    <el-button type="primary" @click="submitComment">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import checkerUtil from "@/utils/checker";
    import commentAPI from "@/api/fore/comment";
    import messageUtil from "@/utils/message";
    import indexAPI from "@/api/fore";
    import tokenName from "@/config/tokenName";

    export default {
        name: "About",
        methods:{
            getMyInfo(){
                indexAPI.getMyInfo().then(data=>this.myInfo=data,error => console.error(error))
            },
            checkInput(){
                if(!checkerUtil.contentChecker(this.form.content)){//检验输入
                    messageUtil.error("请输入有效的留言！")
                    return false
                }
                if(this.form.inform){//按需求检验邮箱格式
                   return checkerUtil.emailChecker(this.form.email)
                }
                return true;
            },
            reply(targetUserId,parentId,targetUsername){
                this.replyDialogDisplay=true
                this.form.targetUserId=targetUserId
                this.form.parentId=parentId;
                this.targetUsername=targetUsername
            },
            submitComment(){
                if(this.checkInput()==true){
                    let token=this.$cookies.get(tokenName.fore)
                    commentAPI.submitComment(token, this.form).then(()=>{
                        this.formLoading=false;
                        this.$refs['form'].resetFields();
                        this.replyDialogDisplay = false
                    },error => {console.error(error)})
                }
            },
            getComment(){
                if(this.hasNextPage){
                    this.commentLoading=true
                    commentAPI.getCommentList(this.pageNum, 5).then(data=>{
                        this.pageNum++
                        this.hasNextPage=data.hasNextPage
                        this.commentLoading=false
                        this.list=this.list.concat(data.list)
                    },error => console.error(error))
                }
            },
        },
        activated(){
        },
        created(){
            this.getMyInfo()
        },
        data(){
            return {
                replyDialogDisplay:false,
                hasNextPage:true,
                formLoading:false,
                targetUsername:'',
                form:{
                    content:'',
                    inform:false,
                    email:'',
                    //回复需要的额外参数
                    targetUserId:'',
                    parentId:'',
                },
                commentLoading:false,
                list:[],
                pageNum:1,
                myInfo:""
            }
        }
    }
</script>

<style scoped>
    @import "~@/assets/css/ckeditor-content.css";
    .info-content{
        padding: 50px;
        line-height: 30px;
    }
    .comment-module{
        margin-top: 20px;
    }
    .create-by{
        color:rgb(64,158,255);
        margin-right:20px;
        margin-top: 20px;
    }
    .content-module{
        padding: 20px;
    }
    .last-card{
        padding: 20px;
        margin-bottom: 50px;
        margin-top: 50px;
    }
</style>