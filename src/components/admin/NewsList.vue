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
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="list" stripe border @sort-change="orderList" v-loading="listLoading">
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
                @current-change="getList">
        </el-pagination>
        <!--        添加随说对话框-->
        <el-dialog :visible.sync="addDialogDisplay" :close-on-click-modal="false" width="50%" title="添加新随说">
            <el-form v-model="news" style="text-align: center">
                <el-form-item label="内容">
                    <ckeditor :editor="editor" :config="editorConfig" v-model="news.content"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="add">提交</el-button>
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
                    <el-button class="el-button--primary" @click="update">提交</el-button>
                    <el-button @click="updateDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Notification} from 'element-ui'
    import CKEditor from "@ckeditor/ckeditor5-vue"
    import Editor from '@ckeditor/ckeditor5-build-classic';
    export default {
        name: "NewsList",
        data(){
            return {
                searchValue:'',
                listLoading:true,
                list:[],
                orderDirection:"desc",
                orderProperty:"create_by",
                pageSize:5,
                pageNum:1,
                total:0,
                //headerConfig
                headerConfig:{
                    headers:{
                        Authorization:this.getToken()
                    }
                },
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
                        uploadUrl:this.baseUrl+"/admin/upload/images",
                        headers:{
                            Authorization:this.getToken()
                        }
                    },
                }
            }
        },
        components:{
            ckeditor:CKEditor.component
        },
        methods:{
            add(){
                let url=this.baseUrl+"/admin/news"
                axios.post(url,this.news,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        Notification({
                            title:'提示',
                            message:'添加新随说成功!',
                            type:'success'
                        })
                        this.addDialogDisplay=false
                        this.getList(this.pageNum)
                    }else{
                        Notification({
                            title:'提示',
                            message:'添加新随说失败!',
                            type:'error'
                        })
                    }
                })
            },
            update(){
                let url=this.baseUrl+"/admin/news"
                axios.put(url,this.news,this.headerConfig).then(res=>{
                    let result=res.data
                    if(result.code==200){
                        Notification({
                            title:'提示',
                            message:'修改随说成功!id:'+this.news.id,
                            type:'success'
                        })
                        this.updateDialogDisplay=false
                        this.getList(this.pageNum)
                    }else{
                        Notification({
                            title:'提示',
                            message:'修改随说失败!',
                            type:'error'
                        })
                    }
                })
            },
            deleteNews(id){
                this.$confirm("此操作将会删除id:"+id+"的随说,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    let url=this.baseUrl+"/admin/news?id="+id;
                    axios.delete(url,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'删除id:'+id+'随说成功!',
                                type:'success'
                            })
                            this.getList(this.pageNum)
                        }else{
                            Notification({
                                title:'提示',
                                message:'删除随说失败!',
                                type:'error'
                            })
                        }
                    })
                }).catch(()=>{})
            },
            orderList(params){
                this.pageNum=1
                this.orderProperty=params.prop;
                this.orderDirection=params.order;
                this.getList(1);
            },
            getList(pageNum){
                this.listLoading=true;
                let url=this.baseUrl+"/admin/news/list?pageNum="+pageNum+
                    "&pageSize="+this.pageSize+
                    "&orderProperty="+this.orderProperty+
                    "&orderDirection="+this.orderDirection

                axios.get(url,this.headerConfig).then(res=>{
                    let result= res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.list=data.list
                        this.total=data.total
                        this.pageNum=data.pageNum
                        this.listLoading=false
                    }
                })
            },
            getToken(){
                let token=this.$cookies.get("zBlogAdminToken")
                if(token==null){
                    this.$router.push("/admin/login")
                }
                return token
            }
        },
        created(){
            this.getToken()
            this.getList(1)
            document.title="Blog后台|随说列表"
        }
    }
</script>

<style scoped>
    >>> .ck-content {
        min-height: 350px;
        border:solid 1px rgb(201,201,201);
    }
</style>