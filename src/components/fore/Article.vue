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
        <el-row :gutter=15>
<!--            目录-->
            <el-col id="directory"  class="animate__animated animate__fadeInLeft" style="position: fixed; overflow: auto; max-height: calc(70vh)" :xl="{span:4,offset:1}" :lg="{span:4}" :md="3" >
<!--                <el-card  shadow="hover" v-loading="articleLoading" :body-style="{padding:'10px',-->
<!--                height:'200px',overflow: 'scroll','overflow-x': 'hidden'}">-->
                <el-card  shadow="hover" v-loading="articleLoading" :body-style="{padding:'10px'}">
                    <el-tree ref="directory" node-key="anchor" :data="directory" empty-text="空"
                             highlight-current :expand-on-click-node=true :indent=8
                             :render-content="renderContent" @node-click="handleNodeClick">
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
                                <el-col :lg="4">
                                    <strong >分类：{{articleData.categoryName}}</strong>
                                </el-col>
                                <el-col :lg="7" >
                                    <strong >创建于：{{articleData.createBy}}</strong>
                                </el-col>
                                <el-col :lg="7" >
                                    <strong >最后修改：{{articleData.modifiedBy}}</strong>
                                </el-col>
                                <el-col :lg="6">
                                    <el-button-group>
<!--                                        <el-tooltip class="item" effect="light" content="打赏" placement="top">-->
<!--                                            <el-button  size="small" icon="el-icon-chicken" ></el-button>-->
<!--                                        </el-tooltip>-->
                                        <el-tooltip class="item" effect="light" content="收藏" placement="top">
                                            <el-button  size="small" icon="el-icon-star-off" ></el-button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="light" content="发表评论" placement="top">
                                            <el-button  size="small" icon="el-icon-chat-dot-square" @click="toComment"></el-button>
                                        </el-tooltip>
<!--                                        <el-tooltip class="item" effect="light" content="导出PDF文档" placement="top">-->
<!--                                            <el-button  size="small" icon="el-icon-download" @click="exportPDF"></el-button>-->
<!--                                        </el-tooltip>-->
                                        <el-tooltip class="item" effect="light" content="分 享" placement="top">
                                            <el-button size="small" icon="el-icon-share" @click="copyLink"></el-button>
                                        </el-tooltip>
                                    </el-button-group>
                                </el-col>
                            </el-row>
                        </div>
                        <el-divider></el-divider>
                        <div v-html="articleData.content" v-highlight class="article-content ck-content" v-viewer="{movable: false}"/>
                        <el-row>
                            <el-col :lg="{span:16,offset:4}">
                                <div class="tip">
                                    <span>本文链接：{{href}}</span>
                                    <br>
                                    <span>版权声明：本站所有文章除特别声明外,转载请注明出处！</span>
                                    <br>
                                    <span>最后修改于：{{articleData.modifiedBy}}</span>
                                    <br>
                                    <span>许可协议：署名-非商业性使用-禁止演绎 4.0 国际 转载请保留原文链接及作者。</span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-divider></el-divider>
                        <div style="text-align: center">
                            <el-row>
                                <el-col :lg="12" :md="12">
                                    <el-link @click="refreshPage(articleData.preId)"><i class="el-icon-arrow-left"></i>&nbsp;&nbsp;上一篇：{{articleData.preTitle}}</el-link>
                                </el-col>
                                <el-col :lg="12" :md="12">
                                    <el-link @click="refreshPage(articleData.nextId)">下一篇：{{articleData.nextTitle}}&nbsp;&nbsp;<i class="el-icon-arrow-right"></i></el-link>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </transition>
            </el-col>
        </el-row>
<!--        评论模块-->
        <el-row id="comment">
            <el-col :lg={span:18,offset:3} :md="24">
                <el-card  shadow="hover" class="article-comment-module" v-loading="formLoading">
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
    // import html2pdf from 'html2pdf.js'
    import 'viewerjs/dist/viewer.css'
    import { directive as viewer } from "v-viewer"
    import copy from 'copy-to-clipboard';
    import articleAPI from "@/api/fore/article";
    import messageUtil from "@/utils/message";
    import articleCommentAPI from "@/api/fore/articleComment";
    import checkerUtil from "@/utils/checker";
    import tokenName from "@/config/tokenName";
    export default {
        name: "Article",
        directives: {
            viewer: viewer({
                debug: false,
            }),
        },
        methods:{

            //选择当前阅读位置所对应的目录节点
            directoryLocator(){
                //1.获取anchor的list，无需树状结构
                //锚点位置列表
                if(this.titleListLength==null||this.titleListLength==0){
                    return;
                }
                if(this.locationList==null||this.locationList.length==0){
                    this.locationList=[]
                    for(let i=0;i<this.titleListLength;i++){
                        this.locationList.push((document.getElementById("anchor"+i).offsetTop))
                    }
                }
                //2.top-k查找，判断最近位置
                let position=window.pageYOffset
                let i=this.locationList.length-1
                for(;i>=0;i--){
                    if(position>=this.locationList[i]){
                       break;
                    }
                }
                //3.目录对应节点设置为高亮状态
                this.$refs["directory"].setCurrentKey(i)
                this.$nextTick(()=>{
                    let currentNode=this.$refs["directory"].store.currentNode
                    if(currentNode!=null){
                        currentNode.expanded=true
                        if(currentNode.parent!=null){
                            currentNode.parent.expanded=true
                        }
                    }
                })
                //4.滚动到高亮目录节点
                let target = document.getElementById("node"+i);
                if(target!=null){
                    const location = target.offsetTop;
                    document.getElementById("directory").scrollTo({
                        top: location,
                    })
                }
            },
            //viewer渲染
            show(){
              const viewer=this.$el.querySelector('.ck-content').$viewer
              viewer.show()
            },
            // 目录节点渲染
            renderContent(h, { node}) {
                return (
                    <el-tooltip content={node.label[0]} effect="light" placement="right">
                        <span id={"node"+node.data.anchor} style="font-size:12px; font-weight: bold">{node.label}</span>
                    </el-tooltip>);
            },
            // 锚点跳转
            handleNodeClick(data){
                let selector="anchor"+(data.anchor)
                let target=document.getElementById(selector)
                // const drag = 15;
                // 指定元素距离顶部的距离
                const location = target.offsetTop;
                window.scrollTo({
                    top: location,
                    behavior: "smooth"
                })
               // target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
            },
            //深度搜索建立目录树
            dfs(level, titleList, anchor){
                let list=[]
                for (let i=0;i<titleList.length;){
                    // console.log(level+titleList[i])
                    let curLevel=titleList[i].charAt(2)
                    if (curLevel==level){
                        let label = titleList[i].match(/(?<=<h[1-9][^/]*?>).+?(?=<\/h[1-9]>)/g);
                        // 这里是过滤样式，对于包含html标签修饰的标题进行过滤
                        let pattern = /(?<=<\w+>).+(?=<\/\w+>)/g
                        label.forEach((value, index) => {
                            if (pattern.test(value)) {
                                let ret = value.match(pattern);
                                label[index] = ret[0];
                            }
                        })
                        let data={
                            label: label,
                            children:[],
                            anchor:anchor++
                        }
                        list.push(data)
                        i++
                    }else if(curLevel>level){
                        let result=this.dfs(curLevel,titleList.slice(i),anchor)
                        list[list.length-1].children=result[0]
                        i+=result[1]-list[list.length-1].anchor-1
                        anchor=result[1]
                    }else{
                        break;
                    }
                }
                let result=[]
                result.push(list)
                result.push(anchor)
                return result;

            },
            //生成目录
            generateDirectory(detail){
                let titleList=detail.match(/(<h[1-9].*?>.*?<\/h[1-9]>)/g)
                if(titleList!=null&&titleList.length!=0){
                    titleList.forEach(((value, index) => {
                        detail = detail.replace(value,"<a id=anchor"+index+">"+value+"</a>")
                    }))
                    let level=titleList[0].charAt(2)
                    //目录树
                    let directory=this.dfs(level,titleList,0)[0]
                    this.directory=directory
                }
                if(titleList!=null)
                    this.titleListLength=titleList.length
                return detail
            },
            //校验输入格式
            checkInput(){
                if(!checkerUtil.contentChecker(this.form.content)){//检验输入
                    messageUtil.error("请输入有效的评论内容！")
                    return false;
                }
                if(this.form.inform==true){//按需求检验邮箱格式
                    return checkerUtil.emailChecker(this.form.email)
                }
                return true;
            },
            //前往评论
            toComment(){
                let commentOffsetY = document.getElementById("comment").offsetTop
                window.scrollTo({
                    top:commentOffsetY,
                    behavior:'smooth'
                })
            },
            //分享连接
            copyLink(){
                copy(window.location.href)
                // console.log(block)
                messageUtil.success("复制分享链接成功！")
            },
            //导出PDF
            // exportPDF(){
            //     html2pdf().set({
            //         pagebreak:{mode:'avoid-all'},
            //         margin: 10,
            //         }).from(this.articleData.content).toPdf().save(this.articleData.title+this.articleData.modifiedBy);
            //      // Message.success({message:"导出PDF文件成功！", offset:100})
            //     messageUtil.success()
            // },
            reply(targetUserId,parentId,targetUsername){
                this.replyDialogDisplay=true
                this.form.targetUserId=targetUserId
                this.form.parentId=parentId;
                this.targetUsername=targetUsername
            },
            submitComment(){
                if(this.checkInput()==true){
                    let token=this.$cookies.get(tokenName.fore)
                    articleCommentAPI.submitArticleComment(token, this.form).then(()=>{
                        this.formLoading=false;
                        this.$refs['form'].resetFields();
                        this.replyDialogDisplay=false
                    },error => console.error(error))
                }
            },
            getArticleDetail(){
                this.articleLoading=true
                let id=this.$route.query.id
                articleAPI.getArticleDetail(id).then(data=>{
                    data.content = this.generateDirectory(data.content)
                    this.articleData = data
                    document.title = this.articleData.title
                    this.articleLoading=false
                    this.form.articleId=id;
                }, error => console.error(error))
            },
            getArticleComment(){
                if(this.hasNextPage){
                    this.commentLoading=true
                    let articleId=this.$route.query.id
                    articleCommentAPI.getArticleCommentList(articleId, this.pageNum, 5).then(data=>{
                        this.list=this.list.concat(data.list)
                        this.pageNum++
                        this.hasNextPage=data.hasNextPage
                        this.commentLoading=false
                    }, error => console.error(error))
                }
            },
            refreshPage(id) {
                this.$router.push({name:'article',query:{id:id}})
                this.getArticleDetail()
                this.list = []
                this.hasNextPage = true
                this.pageNum = 1
                this.getArticleComment()
            },
            //决定目录是否隐藏
            directoryCollapse () {
                let directory=document.getElementById("directory")
                let content=document.getElementById("content")
                if(window.pageYOffset+directory.offsetHeight>=content.offsetHeight){
                    directory.classList.remove('animate__fadeInLeft')
                    directory.classList.add('animate__fadeOutLeft')
                }else{
                    directory.classList.remove('animate__fadeOutLeft')
                    directory.classList.add('animate__fadeInLeft')
                }
            },
        },
        created(){
            // document.title=this.$route.params.title
        },
        mounted(){
            this.getArticleDetail()
            window.addEventListener("scroll",this.directoryCollapse)
            window.addEventListener('scroll',this.directoryLocator)
            // console.error("mounted!")

        },
        beforeDestroy(){
            window.removeEventListener("scroll",this.directoryCollapse)
            window.removeEventListener("scroll",this.directoryLocator)
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
                directory:[],
                href:window.location.href
            }
        }
    }
</script>

<style scoped>
    .article-content{
        padding: 20px;
    }
    .article-title{
        text-align: center;
    }
    .article-info{
        text-align: center;
        color:rgba(60,60,60,0.8);
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
    ::v-deep .el-tree--highlight-current .is-current.el-tree-node> .el-tree-node__content{
         background: #66b1ff !important;
         color: #ffffff !important;
         border-radius: 2px !important;
     }
    ::v-deep .el-tree-node:hover> .el-tree-node__content{
         background: #66b1ff !important;
         color: #ffffff !important;
         border-radius: 2px !important;
     }
    ::v-deep .el-tree-node:focus> .el-tree-node__content{
        background: rgb(255,255,255);
    }
</style>