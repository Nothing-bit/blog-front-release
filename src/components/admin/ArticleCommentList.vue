<template>
    <div>
        <el-card>
            <h1>日志评论列表</h1>
            <el-divider></el-divider>
            <el-row class="table-button-container" :gutter="10">
                <el-col :lg={span:4,offset:20}>
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getArticleCommentList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="articleCommentList" row-key="id" :tree-props="{children:'replyList'}" stripe border @sort-change="orderArticleCommentList" v-loading="articleCommentListLoading">
                <el-table-column label="id" sortable="custom" prop="id" width="100" align="center"></el-table-column>
                <el-table-column label="日志标题" prop="articleTitle"></el-table-column>
                <el-table-column label="昵称"  prop="username" align="center"></el-table-column>
                <el-table-column label="被回复昵称" prop="targetUsername" align="center"></el-table-column>
                <el-table-column label="内容" prop="content"></el-table-column>
                <el-table-column label="平台"  prop="source" align="center" width="100"></el-table-column>
                <el-table-column label="回复时间" sortable="custom" prop="createBy" align="center"></el-table-column>
                <el-table-column label="是否展示" sortable="custom" prop="effective" align="center" width="100">
                    <template slot-scope="props">
                        <el-tag v-if="props.row.effective">是</el-tag>
                        <el-tag v-else type="danger">否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="300">
                    <template slot-scope="props">
                        <el-button size="small" @click="replyArticleComment(props.row)">回复</el-button>
                        <el-button v-if="props.row.effective" class="el-button--primary" size="small" @click="disableArticleComment(props.row.id)">隐藏</el-button>
                        <el-button v-else class="el-button--success" size="small" @click="enableArticleComment(props.row.id)">展示</el-button>
                        <el-button class="el-button--danger" @click="deleteArticleComment(props.row.id)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                :total="total"
                :current-page="pageNum"
                :page-size="pageSize"
                @current-change="getArticleCommentList">
        </el-pagination>
<!--        回复对话框-->
        <el-dialog :visible.sync="replyDialogDisplay" :close-on-click-modal="false" :title="'回复：'+reply.targetUsername" width="50%">
            <el-form>
                <el-form-item label="内容：">
                    <el-input v-model="reply.content" :minLength="1" type="textarea" :rows="4"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center">
                <el-button class="el-button--primary" @click="submitReply">提交</el-button>
                <el-button @click="replyDialogDisplay=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import {Notification} from "element-ui";

    export default {
        name: "ArticleCommentList",
        data(){
            return{
                //articleCommentList
                articleCommentList:[],
                articleCommentListLoading:false,
                pageNum:1,
                pageSize:5,
                total:0,
                searchValue:'',
                orderProperty:'id',
                orderDirection:'asc',
                //reply
                reply:{
                    targetUsername:'',
                    targetUserId:0,
                    parentId:0,
                    content:'',
                    articleId:0,
                },
                //dialog
                replyDialogDisplay:false,
                //headerConfig
                headerConfig:{
                    headers:{
                        Authorization:''
                    }
                }
            }
        },
        methods:{
            submitReply(){
                let url=this.baseUrl+"/admin/article/comment/reply"
                axios.post(url,this.reply,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        Notification({
                            title:'提示',
                            message:'已成功回复!',
                            type:'success'
                        })
                        this.getArticleCommentList(this.pageNum)
                        this.replyDialogDisplay=false
                    }else{
                        Notification({
                            title:'提示',
                            message:'回复评论失败!',
                            type:'error'
                        })
                    }
                })

            },
            replyArticleComment(row){
                let articleComment=row
                this.reply.targetUsername=articleComment.username
                this.reply.targetUserId=articleComment.userId;
                this.reply.articleId=articleComment.articleId;
                if(articleComment.parentId==null){//判断一级回复
                    this.reply.parentId=articleComment.id
                }else{
                    this.reply.parentId=articleComment.parentId
                }
                this.replyDialogDisplay=true;
            },
            disableArticleComment(id){
                let url=this.baseUrl+"/admin/article/comment/disable?id="+id
                axios.put(url,{},this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        Notification({
                            title:'提示',
                            message:'id：'+id+"的评论已成功隐藏！",
                            type:'success'
                        })
                        this.getArticleCommentList(this.pageNum)
                    }else{
                        Notification({
                            title:'提示',
                            message:'隐藏评论失败!',
                            type:'error'
                        })
                    }
                })
            },
            enableArticleComment(id){
                let url=this.baseUrl+"/admin/article/comment/enable?id="+id
                console.log(this.headerConfig)
                axios.put(url,{},this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        Notification({
                            title:'提示',
                            message:'id：'+id+"的评论已成功展示！",
                            type:'success'
                        })
                        this.getArticleCommentList(this.pageNum)
                    }else{
                        Notification({
                            title:'提示',
                            message:'展示评论失败!',
                            type:'error'
                        })
                    }
                })
            },
            deleteArticleComment(id){
                this.$confirm("此操作将会删除id:"+id+"的评论,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    let url=this.baseUrl+"/admin/article/comment?id="+id;
                    axios.delete(url,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'删除id:'+id+'评论成功!',
                                type:'success'
                            })
                            this.getArticleCommentList(this.pageNum)
                        }else{
                            Notification({
                                title:'提示',
                                message:'删除评论失败!',
                                type:'error'
                            })
                        }
                    })
                }).catch(()=>{})
            },
            orderArticleCommentList(params){
                this.pageNum=1
                this.orderProperty=params.prop;
                this.orderDirection=params.order;
                this.getArticleCommentList(1);
            },
            getArticleCommentList(pageNum){
                this.articleCommentListLoading=true
                let url=this.baseUrl+"/admin/article/comment/list?pageNum="+ pageNum+
                    "&pageSize="+ this.pageSize+
                    "&searchValue="+ this.searchValue+
                    "&orderProperty="+this.orderProperty+
                    "&orderDirection="+this.orderDirection
                axios.get(url,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.articleCommentList=data.list;
                        this.total=data.total;
                        this.pageNum=pageNum
                        this.articleCommentListLoading=false;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取分类列表失败！',
                            type:'error'
                        })
                    }
                })
            },
            getToken(){
                let token=this.$cookies.get("zBlogAdminToken")
                if(token!=null){
                    this.headerConfig.headers.Authorization=token
                }else{
                    this.$router.push("/admin/login")
                }
            },
        },
        created(){
            this.getToken()
            this.getArticleCommentList(1)
        }
    }
</script>

<style scoped>

</style>