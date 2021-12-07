<template>
    <div>
        <!--                面包屑导航-->
        <el-row>
            <el-col :xl="{span:14,offset:5}" :lg="{span:16,offset:4}" :md="{span:24}">
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a class="breadcrumb-item">{{articleData.title}}</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter=20>
<!--            目录-->
            <el-col id="directory" class="animate__animated animate__fadeInLeft" style="position: fixed" :xl="{span:4,offset:1}" :lg="{span:4}" :md="3" >
                <el-card  shadow="hover" v-loading="articleLoading" >
                    <div style="text-align: center" slot="header" >
                        <b>目 录</b>
                    </div>
                    <el-tree :data="directory" empty-text="空" highlight-current default-expand-all :expand-on-click-node=false :render-content="renderContent" @node-click="handleNodeClick">

                    </el-tree>
                </el-card>
            </el-col>
            <el-col :xl="{span:14,offset:5}" :lg={span:16,offset:4} :md={span:18,offset:3}>

<!--                日志主体card-->
                <transition appear
                            appear-active-class="animate__animated animate__fadeIn"
                            enter-active-class="animate__animated animate__fadeIn">
                    <el-card id="content" shadow="hover" v-loading="articleLoading">
                        <div class="article-title">
                            <h1>{{articleData.title}}</h1>
                        </div>
                        <div class="article-info" >
                            <el-row type="flex" align="middle">
                                <el-col :lg="6">
                                    <p >分类：{{articleData.categoryName}}</p>
                                </el-col>
                                <el-col :lg="6" >
                                    <p >创建于：{{articleData.createBy}}</p>
                                </el-col>
                                <el-col :lg="6" >
                                    <p >最后修改：{{articleData.createBy}}</p>
                                </el-col>
                                <el-col :lg="6">
                                    <el-button-group>
                                        <el-tooltip class="item" effect="dark" content="导出PDF文档" placement="top">
                                            <el-button  size="medium" icon="el-icon-download" @click="exportPDF"></el-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="分 享" placement="top">
                                            <el-button size="medium" icon="el-icon-share"></el-button>
                                        </el-tooltip>
                                    </el-button-group>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider></el-divider>
                        <div v-html="articleData.content" v-highlight class="article-content ck-content">
                        </div>
                        <el-divider></el-divider>
                        <div style="text-align: center">
                            <el-row>
                                <el-col :lg="12" :md="12">
                                    <a   @click="refreshPage(articleData.preId)">上一篇：{{articleData.preTitle}}</a>
                                </el-col>
                                <el-col :lg="12" :md="12">
                                    <a  @click="refreshPage(articleData.nextId)">下一篇：{{articleData.nextTitle}}</a>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </transition>
            </el-col>
        </el-row>
<!--        评论模块-->
        <el-row>
            <el-col :lg={span:18,offset:3} :md="24">
                <el-card shadow="hover" class="article-comment-module" v-loading="formLoading">
<!--                    发表评论表单模块-->
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
                <!--                    历史评论模块-->
                <div class="infinite-list" infinite-scroll-delay="1000" v-infinite-scroll="getArticleComment" style="overflow:auto">
                    <el-card v-for="item in list" shadow="hover" class="infinite-list-item article-comment-module" v-bind:key="item.id">
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
                                        <p class="create-by">回复于：{{item.createBy}}</p>
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
                    <h3 style="text-align: center" v-if="commentLoading"><i class="el-icon-loading"></i>努力加载中······</h3>
                    <h3 style="text-align: center" v-if="!hasNextPage">没有更多评论了！</h3>
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
<script type="text/jsx">
    import axios from 'axios'
    import { Notification }  from 'element-ui';
    import html2pdf from 'html2pdf.js'
    export default {
        name: "Article",
        methods:{
            // 自定义目录树渲染
            renderContent(h, { node}) {
                return (
                    <el-tooltip content={node.label[0]} effect="light" placement="right">
                        <el-link>{node.label}</el-link>
                    </el-tooltip>);
            },
            // 锚点跳转
            handleNodeClick(data){

                // this.$nextTick(()=>{
                    let selector="anchor"+(data.anchor)
                   document.getElementById(selector).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
                // })


            },
            //深度搜索建立目录索引树
            dfs(level, titleList, anchor){
                let list = []
                for(let i=0;i<titleList.length;i++){
                    let curLevel=titleList[i].charAt(2)
                    let data={
                        label:titleList[i].match(/(?!<=h[1-9])[^>]+(?=<\/h[1-9])/g),
                        children:[],
                        anchor:anchor++
                    }
                    if(curLevel==level){
                        list.push(data)
                    }else if(curLevel>level){
                        let results=this.dfs(curLevel,titleList.slice(i+1),anchor)
                        anchor=results[0]
                        let children=results[1]
                        children=[data,...children]
                        list[list.length-1].children=children
                        i+=children.length-1
                    }else{
                        break;
                    }
                }
                let result=[]
                result.push(anchor-1)
                result.push(list)
                return result
            },
            //生成目录
            generateDirectory(detail){
                let titleList=detail.match(/<h[1-9][^>]*>[^>]*<\/h[1-9]>/g)
                if(titleList!=null&&titleList.length!=0){
                    titleList.forEach(((value, index) => {
                        detail=detail.replace(value,"<a id=anchor"+index+">"+value+"</a>")
                    }))
                    // console.log(titleList)
                    let level=titleList[0].charAt(2)
                    this.directory=this.dfs(level,titleList,0)[1]
                    // console.log(this.directory)
                }
                return detail
            },
            //校验输入格式
            checkInput(){
                if(this.form.content.length<2){//检验输入
                    Notification({
                        title:"提示",
                        message:'请输入评论内容或者评论内容过短',
                        type:'warning'
                    })
                    return false;
                }
                if(this.form.inform==true){//按需求检验邮箱格式
                    let filter = /^\w{3,}@\w{2,}\.(com|cn|net|com\.cn)$/;
                    if(filter.test(this.form.email)==false){
                        Notification({
                            title:"提示",
                            message:'请输入格式正确的邮件地址',
                            type:'warning'
                        })
                        return false;
                    }
                }
                return true;
            },
            exportPDF(){
                html2pdf().set({
                    pagebreak:{mode:'avoid-all'},
                    margin: 10,
                    }).from(this.articleData.content).toPdf().save(this.articleData.title+this.articleData.modifiedBy);
            },
            reply(targetUserId,parentId,targetUsername){
                this.replyDialogDisplay=true
                this.form.targetUserId=targetUserId
                this.form.parentId=parentId;
                this.targetUsername=targetUsername
            },
            submitComment(){
                if(this.checkInput()==true){
                    var token=this.$cookies.get("zBlogToken")
                    if(token!=null){
                        var url=this.baseUrl+"/fore/article/comment"
                        this.formLoading=true;
                        axios.post(url,this.form,{headers:{Authorization:token}}).then((res)=>{
                            var result=res.data;
                            if(result.code==200){
                                Notification({
                                    title:'提示',
                                    message:'已成功提交评论，待审核后将会予以展示。',
                                    type:'success'
                                })
                                this.formLoading=false;
                                this.$refs['form'].resetFields();
                            }else{
                                Notification({
                                    title:'错误',
                                    message:'未能成功提交评论！',
                                    type:'error'
                                })
                                this.formLoading=false;
                            }
                        })
                    }else{
                        Notification({
                            title:'注意',
                            message:'您需要登录后才能进行评论！',
                            type:'warning'
                        })
                    }
                }
            },
            getArticleDetail(){
                this.articleLoading=true
                var id=this.$route.query.id
                var url=this.baseUrl+"/fore/article/detail?id="+id
                axios.get(url).then((res)=>{
                    var result=res.data;
                    if(result.code==200){
                        result.data.content=this.generateDirectory(result.data.content)
                        this.articleData=result.data
                        this.articleLoading=false
                        this.form.articleId=id;
                    }
                })
            },
            getArticleComment(){
                if(this.hasNextPage){
                    this.commentLoading=true
                    var articleId=this.$route.query.id
                    var url=this.baseUrl+"/fore/article/comment/list?articleId="+articleId+"&pageNum="+this.pageNum
                    axios.get(url).then((res)=>{
                        var result=res.data;
                        if(result.code==200){
                            var data=result.data;
                            this.list=this.list.concat(data.list)
                            this.pageNum++
                            this.hasNextPage=data.hasNextPage
                            this.commentLoading=false
                        }else{
                            Notification({
                                title:'提示',
                                message:'获取评论列表失败！',
                                type:'error'
                            })
                        }
                    })
                }
            },
            refreshPage(id) {
                this.$router.push({name:'article',query:{id:id}})
                this.getArticleDetail()
            },
            onscrollListener () {
                let directory=document.getElementById("directory")
                let content=document.getElementById("content")
                if(window.pageYOffset+directory.offsetHeight>=content.offsetHeight){
                    // directory.style.animation="fadeOutLeft 0.5s"
                    directory.classList.remove('animate__fadeInLeft')
                    directory.classList.add('animate__fadeOutLeft')
                    // directory.style.display="none"
                }else{
                    directory.classList.remove('animate__fadeOutLeft')
                    directory.classList.add('animate__fadeInLeft')
                    //directory.style.animation="fadeInLeft 0.5s"
                    // directory.style.display="block"
                }
            }
        },
        created(){
        },
        mounted(){
            this.getArticleDetail()
            window.addEventListener("scroll",this.onscrollListener)

        },
        beforeDestroy(){
            window.removeEventListener("scroll",this.onscrollListener)
        },
        updated(){
        },
        data(){
            return{
                replyDialogDisplay:false,
                hasNextPage:true,
                articleData:'',
                articleLoading:true,
                formLoading:false,
                targetUsername:'',
                form:{
                    articleId:'',
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
                directory:[]
            }
        }
    }
</script>

<style scoped>
    .article-content{
        padding: 50px;
    }
    .article-title{
        text-align: center;
    }
    .article-info{
        text-align: center;
    }
    .article-comment-module{
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
        margin-top: 50px;
        margin-bottom: 50px;

    }

</style>