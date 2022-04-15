<template>
    <div>
        <el-row :gutter=15>
            <el-col :xl={span:20,offset:2} :lg={span:22,offset:1} :md={span:24}>
                <!--                面包屑导航-->
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a class="breadcrumb-item">标 签</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div style="min-height: 700px;" >
                    <div style="text-align: center">
                        <h2>{{tagName}}</h2>
                    </div>
                    <el-divider></el-divider>
                    <!--                    日志-->
                    <el-col :lg={span:12,offset:6}>
                        <ArticleInfoList :article-list="articleList" v-loading="articleListLoading"></ArticleInfoList>
                        <el-pagination  class="pagination" :total=articleTotal
                                        :page-size=articlePageSize
                                        :current-page=1
                                        @current-change="getArticleList"></el-pagination>
                    </el-col>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios"
    import {Notification} from 'element-ui'
    import ArticleInfoList from "./ArticleInfoList";
    export default {
        name: "TagArticle",
        components:{
            ArticleInfoList
        },
        data(){
            return{
                articleListLoading:false,
                articleList:[],
                articlePageSize:0,
                articleTotal:0,
                tagName:"",
            }
        },
        methods:{
            setTagName(){
                this.tagName=this.$route.query.tagName
            },
            getArticleList(pageNum){
                this.articleListLoading=true;
                let url=this.baseUrl+"/fore/tag/article/list?tagName="+this.tagName+"&pageNum="+pageNum
                axios.get(url).then((res)=>{
                    let result =res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.articleList=data.list
                        this.articlePageSize=data.pageSize
                        this.articleTotal=data.total
                        this.articleListLoading=false;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取日志列表失败',
                            type:'error'
                        })
                    }
                })

            }
        },
        activated(){
            document.title="Blog | "+this.$route.query.tagName
        },
        created(){
            this.setTagName()
            this.getArticleList(1)
        }
    }
</script>

<style>


</style>