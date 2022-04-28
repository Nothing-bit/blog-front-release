<template>
    <div>
        <el-row :gutter=15>
            <el-col :xl={span:20,offset:2} :lg={span:22,offset:1} :md={span:24}>
                <!--                面包屑导航-->
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path:'/fore/tag'}"><a class="breadcrumb-item">标 签</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a class="breadcrumb-item">{{tagName}}</a></el-breadcrumb-item>
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
                        <el-pagination  class="pagination"
                                        background
                                        :total=articleTotal
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
    import ArticleInfoList from "./ArticleInfoList";
    import articleAPI from "@/api/fore/article";
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
                articleAPI.getArticleListByTagName(this.tagName, pageNum, 5).then(data=>{
                    this.articleList=data.list
                    this.articlePageSize=data.pageSize
                    this.articleTotal=data.total
                    this.articleListLoading=false;
                })
            }
        },
        activated(){
            document.title="ZBlog | "+this.$route.query.tagName
        },
        created(){
            this.setTagName()
            this.getArticleList(1)
        }
    }
</script>

<style>


</style>