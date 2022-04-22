<template>
    <div>
        <el-card>
            <h1>标签列表</h1>
            <el-divider></el-divider>
            <el-row class="table-button-container" :gutter="10">
                <el-col :lg={span:20}>
                    <el-button type="primary" @click="tag.name='';addDialogDisplay=true">添加</el-button>
                </el-col>
                <el-col :lg={span:4}>
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getTagList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="tagList" stripe border @sort-change="orderTagList" v-loading="tagListLoading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.infoList" stripe border>
                            <el-table-column width="800" label="标题">
                                <template slot-scope="child_props">
                                    <el-link style="padding: 0.1rem" @click="updateArticle(child_props.row.articleId)">{{child_props.row.title}}</el-link>
                                </template>
                            </el-table-column>
                            <el-table-column width="100" label="操作">
                                <template slot-scope="child_props">
                                    <el-button type="danger" size="mini" @click="deleteArticleTag(child_props.row.title, child_props.row.articleId, props.row.id)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column label="id" sortable="custom" prop="id" width="100" align="center"></el-table-column>
                <el-table-column label="标签名称" sortable="custom" align="center" prop="name"> </el-table-column>
                <el-table-column label="引用次数" sortable="custom" prop="number" align="center"></el-table-column>
                <el-table-column label="创建时间" sortable="custom" prop="createBy" align="center"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="props">
                        <el-button size="small"  @click="updateDialogDisplay=true;tag.id=props.row.id;tag.name=props.row.name">编辑</el-button>
                        <el-button size="small" v-if="props.row.number==0" class="el-button--danger" @click="deleteTag(props.row.id)">删除</el-button>
                        <el-button size="small" v-else disabled class="el-button--danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                :total="total"
                :current-page="pageNum"
                :page-size="pageSize"
                @current-change="getTagList">
        </el-pagination>
        <!--        添加标签对话框-->
        <el-dialog :visible.sync="addDialogDisplay" :close-on-click-modal="false" width="30%" title="添加新标签">
            <el-form v-model="tag" style="text-align: center">
                <el-form-item label="名称">
                    <el-input v-model="tag.name" maxLength="25" show-word-limit type="text"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="addTag">提交</el-button>
                    <el-button @click="addDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--        更新标签对话框-->
        <el-dialog :visible.sync="updateDialogDisplay" :close-on-click-modal="false" width="30%" title="修改标签信息">
            <el-form v-model="tag" style="text-align: center">
                <el-form-item label="id">
                    <el-input v-model="tag.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="tag.name" maxLength="25" show-word-limit type="text"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="el-button--primary" @click="updateTag">提交</el-button>
                    <el-button @click="updateDialogDisplay=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import axios from 'axios'
    import {Notification} from 'element-ui'
    export default {
        name: "TagList",
        data(){
            return{
                //tagList
                tagList:[],
                pageNum:1,
                total:0,
                pageSize:5,
                tagListLoading:false,
                searchValue: '',
                orderProperty:'id',
                orderDirection:'',
                //add
                addDialogDisplay:false,
                //update
                updateDialogDisplay:false,
                tag:{
                    id:0,
                    name:'',
                },
                //headerConfig
                headerConfig:{
                    headers:{
                        Authorization:''
                    }
                }
            }
        },
        methods:{
            deleteArticleTag(title, articleId, tagId){
                this.$confirm("此操作将会删除日志"+title+"对该标签的引用,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消'
                }).then(()=>{
                    let url=this.baseUrl+"/admin/article/tag?articleId="+articleId+"&tagId="+tagId;
                    axios.delete(url,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'删除标签引用成功!',
                                type:'success'
                            })
                            this.getTagList(this.pageNum)
                        }else{
                            Notification({
                                title:'提示',
                                message:'删除标签引用失败!',
                                type:'error'
                            })
                        }
                    })
                })
            },
            updateArticle(id){
                this.$router.push({name:'articleUpdate',query:{id:id}})
            },
            addTag(){
                let url=this.baseUrl+"/admin/tag"
                axios.post(url,this.tag,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        Notification({
                            title:'提示',
                            message:'添加新标签成功!',
                            type:'success'
                        })
                        this.addDialogDisplay=false
                        this.getTagList(this.pageNum)
                    }else{
                        Notification({
                            title:'提示',
                            message:'添加新标签失败!',
                            type:'error'
                        })
                    }
                })
            },
            updateTag(){
                let url=this.baseUrl+"/admin/tag"
                axios.put(url,this.tag,this.headerConfig).then(res=>{
                    let result=res.data
                    if(result.code==200){
                        Notification({
                            title:'提示',
                            message:'修改标签成功!id:'+this.tag.id,
                            type:'success'
                        })
                        this.updateDialogDisplay=false
                        this.getTagList(this.pageNum)
                    }else{
                        Notification({
                            title:'提示',
                            message:'修改标签失败!',
                            type:'error'
                        })
                    }
                })
            },
            deleteTag(id){
                this.$confirm("此操作将会删除id:"+id+"的标签,并且无法恢复!","提示",{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消'
                }).then(()=>{
                    let url=this.baseUrl+"/admin/tag?id="+id;
                    axios.delete(url,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'删除id:'+id+'标签成功!',
                                type:'success'
                            })
                            this.getTagList(this.pageNum)
                        }else{
                            Notification({
                                title:'提示',
                                message:'删除标签失败!',
                                type:'error'
                            })
                        }
                    })
                })
            },
            orderTagList(params){
                this.pageNum=1
                this.orderProperty=params.prop;
                this.orderDirection=params.order;
                this.getTagList(1);
            },
            getTagList(pageNum){
                this.tagListLoading=true
                let url=this.baseUrl+"/admin/tag/list?pageNum="+ pageNum+
                    "&pageSize="+ this.pageSize+
                    "&searchValue="+ this.searchValue+
                    "&orderProperty="+this.orderProperty+
                    "&orderDirection="+this.orderDirection
                axios.get(url,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.tagList=data.list;
                        this.total=data.total;
                        this.pageNum=pageNum
                        this.tagListLoading=false;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取标签列表失败！',
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
            }

        },
        created() {
            this.getToken();
            this.getTagList(1)
            document.title="Blog后台|标签列表"
        }
    }
</script>

<style>
    .table-button-container{
        padding-bottom: 20px;
    }
</style>