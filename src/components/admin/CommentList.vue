<template>
    <div>
        <el-card>
            <h1>留言列表</h1>
            <el-divider></el-divider>
            <el-row class="table-button-container" :gutter="10">
                <el-col :lg={span:4,offset:20}>
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getCommentList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="commentList" row-key="id" :tree-props="{children:'replyList'}" stripe border @sort-change="orderCommentList" v-loading="commentListLoading">
                <el-table-column label="id" sortable="custom" prop="id" width="100" align="center"></el-table-column>
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
                        <el-button size="small" @click="replyComment(props.row)">回复</el-button>
                        <el-button v-if="props.row.effective" class="el-button--primary" size="small" @click="disableComment(props.row.id)">隐藏</el-button>
                        <el-button v-else class="el-button--success" size="small" @click="enableComment(props.row.id)">展示</el-button>
                        <el-button class="el-button--danger" @click="deleteComment(props.row.id)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                :total="total"
                :current-page="pageNum"
                :page-size="pageSize"
                @current-change="getCommentList">
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
    import tokenName from "@/config/tokenName";
    import commentAPI from "@/api/admin/comment";
    export default {
        name: "CommentList",
        data(){
            return{
                //CommentList
                commentList:[],
                commentListLoading:false,
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
                },
                //dialog
                replyDialogDisplay:false,
            }
        },
        methods:{
            submitReply(){
                commentAPI.submitReply(this.token, this.reply).then(
                    ()=>{
                        this.getCommentList(this.pageNum)
                        this.replyDialogDisplay=false
                        this.reply.content=""
                    },reason => console.error(reason)
                )
            },
            replyComment(row){
                let comment=row
                this.reply.targetUsername=comment.username
                this.reply.targetUserId=comment.userId;
                this.reply.articleId=comment.articleId;
                if(comment.parentId==null){//判断一级回复
                    this.reply.parentId=comment.id
                }else{
                    this.reply.parentId=comment.parentId
                }
                this.replyDialogDisplay=true;
            },
            disableComment(id){
                commentAPI.disableComment(this.token, id).then(()=>this.getCommentList(this.pageNum),reason => console.error(reason))
            },
            enableComment(id){
                commentAPI.enableComment(this.token, id).then(()=>this.getCommentList(this.pageNum),reason => console.error(reason))
            },
            deleteComment(id){
                this.$confirm("此操作将会删除id:"+id+"的留言,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:"warning"
                }).then(()=>{
                    commentAPI.deleteComment(this.token, id).then(
                        ()=>this.getCommentList(this.pageNum),reason => console.error(reason)
                    )
                }).catch(()=>{})
            },
            orderCommentList(params){
                this.pageNum=1
                this.orderProperty=params.prop;
                this.orderDirection=params.order;
                this.getCommentList(1);
            },
            getCommentList(pageNum){
                this.commentListLoading=true
                commentAPI.getCommentList(this.token, pageNum, this.pageSize, this.searchValue, this.orderProperty, this.orderDirection).then(
                    data=>{
                        this.commentList=data.list;
                        this.total=data.total;
                        this.pageNum=pageNum
                        this.commentListLoading=false;
                    },reason => console.error(reason)
                )
            },
            getToken(){
                let token = this.$cookies.get(tokenName.admin)
                if(token==null){
                    this.$router.push("/admin/login")
                }else{
                    this.token = token
                }
            }
        },
        created(){
            this.getToken()
            this.getCommentList(1)
        }
    }
</script>

<style scoped>

</style>