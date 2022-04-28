<template>
    <div>
        <el-row :gutter=15>
            <el-col :xl="{span:14,offset:5}" :lg="{span:16,offset:4}" :md={span:24}>
                <!--                面包屑导航-->
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a class="breadcrumb-item">分 类</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <div style="min-height: 700px;">
<!--                    分类-->
                <el-col style="text-align: center; position: fixed" :xl="{span:3,offset:5}"  :lg="{span:3,offset:3}"   v-loading="categoryListLoading">
                    <transition name="list-complete"
                                tag="div"
                                appear
                                appear-active-class="animate__animated animate__fadeInLeft"
                                enter-active-class="animate__animated animate__fadeInLeft">
                        <el-card shadow="hover">
                            <transition-group name="list-complete"
                                              tag="div"
                                              appear
                                              appear-active-class="animate__animated animate__fadeInLeft"
                                              enter-active-class="animate__animated animate__fadeInLeft">
                                <div class="nav-menu" v-for="item in categoryList" v-bind:key="item.id">
                                    <el-link class="nav-item" @click="getArticleListByCategoryId(item.id, 1)">{{item.name}}</el-link>
                                    <br>
                                </div>
                            </transition-group>
                        </el-card>
                    </transition>
                    <el-pagination :total=categoryTotal
                                   :page-size=categoryPageSize
                                   :current-page=1
                                   @current-change="getCategoryList"
                                   layout="prev,next"></el-pagination>
                </el-col>
<!--                    日志-->
                <el-col :xl="{span:10,offset:8}" :lg="{span:12,offset:6}">
                    <ArticleInfoList v-loading="articleListLoading" :article-list="articleList"></ArticleInfoList>
                    <div class="block pagination">
                        <el-pagination
                                background
                                @current-change="getArticleList"
                                :current-page="1"
                                :page-size=articlePageSize
                                layout="total, prev, pager, next, jumper"
                                :total=articleTotal>
                        </el-pagination>
                    </div>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
    import ArticleInfoList from "./ArticleInfoList";
    import articleAPI from "@/api/fore/article";
    import categoryAPI from "@/api/fore/category";
    export default {
        name: "Category",
        data(){
            return {
                //categoryList
                categoryList:[],
                categoryPageSize:0,
                categoryTotal:0,
                categoryListLoading:false,
                //articleList
                categoryId:0,
                articleList:[],
                articlePageSize:0,
                articleTotal:0,
                articleListLoading:false,

            }
        },
        components:{
          ArticleInfoList
        },
        methods:{
            getArticleList(pageNum){
                this.articleListLoading = true;
                articleAPI.getArticleListByCategoryId(this.categoryId, pageNum, 5).then(data=>{
                    this.articleList=data.list;
                    this.articlePageSize=data.pageSize;
                    this.articleTotal=data.total;
                    this.articleListLoading=false;
                }, ()=>{})
            },
            getArticleListByCategoryId(categoryId, pageNum){
                this.articleListLoading=true;
                articleAPI.getArticleListByCategoryId(categoryId, pageNum, 5).then(data=>{
                    this.articleList=data.list;
                    this.articlePageSize=data.pageSize;
                    this.articleTotal=data.total;
                    this.categoryId = categoryId
                    this.articleListLoading=false;
                }, ()=>{})
            },
            getCategoryList(pageNum){
                this.categoryListLoading=true;
                categoryAPI.getCategoryList(pageNum, 10).then(data=>{
                    this.categoryList=data.list
                    this.categoryTotal=data.total;
                    this.categoryPageSize=data.pageSize
                    this.categoryListLoading=false;
                },()=>{})
            }
        },
        created(){
            this.getArticleList(1)
            this.getCategoryList(1)
        },
        mounted(){
        }
    }
</script>

<style>
</style>