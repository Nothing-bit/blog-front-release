<template>
    <div>
        <el-card>
            <h1>随说列表</h1>
            <el-divider></el-divider>
            <el-row class="table-button-container" :gutter="10">
                <el-col :lg={span:20}>
                    <el-button type="primary" @click="news.content='';addDialogDisplay=true">添加</el-button>
                </el-col>
                <el-col :lg={span:4}>
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getNewsList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="newsList" stripe border @sort-change="orderList" v-loading="newsListLoading">
                <el-table-column type="expand">
                    <template scope="props">
                        <div v-html="props.row.content" class="article-content ck-content"></div>
                    </template>
                </el-table-column>
                <el-table-column label="id" sortable="custom" prop="id" width="100" align="center"></el-table-column>
                <el-table-column label="用户名" align="center" prop="username"></el-table-column>
                <el-table-column label="创建时间" sortable="custom" prop="createBy" align="center"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="props">
                        <el-button size="small"  @click="updateDialogDisplay=true;news.id=props.row.id;news.content=props.row.content">编辑</el-button>
                        <el-button size="small" class="el-button--danger" @click="deleteNews(props.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                :total="total"
                :current-page="pageNum"
                :page-size="pageSize"
                @current-change="getNewsList">
        </el-pagination>
        <!--        添加随说对话框-->
        <el-dialog :visible.sync="addDialogDisplay" :close-on-click-modal="false" width="50%" title="添加新随说">
            <el-form v-model="news" style="text-align: center">
                <el-form-item label="内容">
                    <ckeditor :editor="editor" :config="editorConfig" v-model="news.content"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="submitAdd">提交</el-button>
                    <el-button @click="addDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--        更新随说对话框-->
        <el-dialog :visible.sync="updateDialogDisplay" :close-on-click-modal="false" width="50%" title="修改随说">
            <el-form v-model="news" style="text-align: center">
                <el-form-item >
                    <ckeditor :editor="editor" :config="editorConfig" v-model="news.content"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="submitUpdate">提交</el-button>
                    <el-button @click="updateDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import CKEditor from "@ckeditor/ckeditor5-vue"
    import Editor from '@ckeditor/ckeditor5-build-classic';
    import tokenName from "@/config/tokenName";
    import newsAPI from "@/api/admin/news";
    import baseURL from "@/config/baseURL";
    import checkerUtil from "@/utils/checker";
    export default {
        name: "NewsList",
        data(){
            return {
                searchValue:'',
                newsListLoading:true,
                newsList:[],
                orderDirection:"desc",
                orderProperty:"create_by",
                pageSize:5,
                pageNum:1,
                total:0,
                //news
                news:{
                    id:0,
                    content:'',
                },
                //display
                //add
                addDialogDisplay:false,
                //update
                updateDialogDisplay:false,
                editor:Editor,
                editorConfig:{
                 //editor配置
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            'imageStyle:full',
                            'imageStyle:side'
                        ]
                    },
                    table: {
                        contentToolbar: [
                            'tableColumn',
                            'tableRow',
                            'mergeTableCells',
                            'tableCellProperties',
                            'tableProperties'
                        ]
                    },
                    toolbar: {
                        items: [
                            'undo',
                            'redo',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'subscript',
                            'superscript',
                            'removeFormat',
                            '|',
                            'fontSize',
                            'fontFamily',
                            'fontColor',
                            'fontBackgroundColor',
                            'highlight',
                            '|',
                            'link',
                            'bulletedList',
                            'numberedList',
                            '|',
                            'alignment',
                            'indent',
                            'outdent',
                            'horizontalLine',
                            '|',
                            'imageUpload',
                            'blockQuote',
                            'insertTable',
                            'code',
                            'codeBlock',
                            'todoList'
                        ]
                    },
                    simpleUpload:{
                //上传图片配置
                        uploadUrl:baseURL+"/admin/upload/images",
                        headers:{
                            Authorization:'',
                            baseURL:baseURL
                        }
                    },
                }
            }
        },
        components:{
            ckeditor:CKEditor.component
        },
        methods:{
            submitAdd(){
                if(checkerUtil.newsChecker(this.news)){
                    newsAPI.addNews(this.token, this.news).then(
                        ()=>{
                            this.addDialogDisplay=false
                            this.getNewsList(this.pageNum)
                        },reason => console.error(reason)
                    )
                }
            },
            submitUpdate(){
                if(checkerUtil.newsChecker(this.news)){
                    newsAPI.updateNews(this.token, this.news).then(
                        ()=>{
                            this.updateDialogDisplay=false
                            this.getNewsList(this.pageNum)
                        },reason => console.error(reason)
                    )
                }
            },
            deleteNews(id){
                this.$confirm("此操作将会删除id:"+id+"的随说,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    newsAPI.deleteNews(this.token, id).then(
                        ()=>{
                            this.getNewsList(this.pageNum)
                        },reason => console.error(reason)
                    )
                }).catch(()=>{})
            },
            orderList(params){
                this.pageNum=1
                this.orderProperty=params.prop;
                this.orderDirection=params.order;
                this.getNewsList(1);
            },
            getNewsList(pageNum){
                this.newsListLoading=true;
                newsAPI.getNewsList(this.token, pageNum, this.pageSize, this.searchValue, this.orderProperty, this.orderDirection).then(
                    data=>{
                        this.newsList=data.list
                        this.pageNum=pageNum;
                        this.total=data.total;
                        this.newsListLoading=false;
                    },error => console.error(error)
                )
            },
            getToken(){
                let token = this.$cookies.get(tokenName.admin)
                if(token==null){
                    this.$router.push("/admin/login")
                }else{
                    this.token = token
                    this.editorConfig.simpleUpload.headers.Authorization=token
                }
            }
        },
        created(){
            this.getToken()
            this.getNewsList(1)
        }
    }
</script>

<style scoped>
    >>> .ck-content {
        min-height: 350px;
        border:solid 1px rgb(201,201,201);
    }
</style>