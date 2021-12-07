<template>
    <div >
        <el-card>
            <h3>日志列表</h3>
            <el-divider/>
            <el-row class="table-button-container" :gutter="10">
                <el-col :lg={span:20}>
                    <el-button type="primary" @click="addArticle">添加</el-button>
                </el-col>
                <el-col :lg={span:4}>
                    <el-input placeholder="请输入关键字" v-model="searchValue" @change="getArticleList(1)"/>
                </el-col>
            </el-row>
            <el-table :data="articleList" stripe border @sort-change="orderArticleList" v-loading="articleListLoading">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="center">
                            <el-form-item label="封面:">
                                <img :src="props.row.pictureUrl" class="article-pic"/>
                            </el-form-item>
                            <el-form-item label="简述:">
                                <span>{{ props.row.summary}}</span>
                            </el-form-item>
                            <el-form-item label="标签:">
                                <el-tag v-for="item in props.row.tagList" v-bind:key="item">{{item}}</el-tag>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="ID" prop="id" width="100" sortable="custom" align="center"></el-table-column>
                <el-table-column label="标题" prop="title" width="500" sortable="custom" align="center"></el-table-column>
                <el-table-column label="是否置顶" prop="top" sortable="custom" align="center">
                    <template slot-scope="props">
                        <el-tag type="success" v-if="props.row.top">是</el-tag>
                        <el-tag type="danger" v-if="!props.row.top">否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否隐私" prop="privated" sortable="custom" align="center">
                    <template slot-scope="props">
                        <el-tag type="success" v-if="props.row.privated">是</el-tag>
                        <el-tag type="danger" v-if="!props.row.privated">否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="点击量" prop="traffic" sortable="custom" align="center"></el-table-column>
                <el-table-column label="创建时间" prop="createBy" sortable="custom" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="props">
                        <el-button size="small"  @click="updateArticle(props.row.id)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteArticle(props.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                :total="total"
                :current-page="pageNum"
                :page-size="pageSize"
                @current-change="getArticleList">
        </el-pagination>
    </div>
</template>

<script>
    import axios from "axios"
    import {Notification} from "element-ui"
    export default {
        name: "Article",
        data(){
            return{
                //article list
                articleListLoading:false,
                articleList:[],
                pageSize:5,
                pageNum:1,
                total:0,
                searchValue:'',
                orderProperty:'id',
                orderDirection:'desc',
                articleListDisplay:true,
                //article add
                articleAddDisplay:false,
                //axiosConfig
                headerConfig:{
                    headers:{
                        Authorization:''
                    }
                }
            }
        },
        methods:{
            getToken(){
                let token=this.$cookies.get("zBlogAdminToken")
                if(token!=null){
                    this.headerConfig.headers.Authorization=token
                }else{
                    this.$router.push("/admin/login")
                }
            },
            addArticle(){
                this.$router.push({name:"articleAdd"})
            },
            orderArticleList(params){
                 this.pageNum=1
                 this.orderProperty=params.prop;
                 this.orderDirection=params.order;
                 this.getArticleList(1);
            },
            deleteArticle(id){
                this.$confirm("此操作将会删除该日志，并且无法恢复！id："+id,"提示:",{
                    cancelButtonText:'取消',
                    confirmButtonText:'确定',
                    type:'warning'
                }).then(()=>{
                    let url=this.baseUrl+"/admin/article?id="+id;
                    axios.delete(url,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'id为：'+id+'的日志已被成功删除！',
                                type:'success'
                            })
                            this.getArticleList(this.pageNum)
                        }else{
                            Notification({
                                title:'提示',
                                message:'id为：'+id+'的日志删除失败！',
                                type:'error'
                            })
                        }
                    })
                }).catch(()=>{})
            },
            updateArticle(id){
                this.$router.push({name:'articleUpdate',query:{id:id}})
            },
            getArticleList(pageNum){
                this.articleListLoading=true;
                let url=this.baseUrl+"/admin/article/list?pageNum="+pageNum+
                    "&pageSize="+this.pageSize+
                    "&searchValue="+this.searchValue+
                    "&orderProperty="+this.orderProperty+
                    "&orderDirection="+this.orderDirection
                axios.get(url,this.headerConfig).then((res)=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.articleList=data.list
                        this.total=data.total;
                        this.articleListLoading=false;
                        this.pageNum=pageNum;
                    }else{
                        Notification({
                            title:'提示',
                            message:'加载日志列表失败',
                            type:'error'
                        })
                    }
                })
            }
        },
        created(){
            this.getToken()
            this.getArticleList(1)
        }
    }
</script>

<style>
    @media (min-width: 1200px) {
        .article-pic{
            border-radius: 5px;
            width: 250px;
        }
    }
    @media (min-width: 992px) and (max-width: 1200px){
        .article-pic{
            border-radius: 5px;
            width: 100px;
        }
    }

</style>