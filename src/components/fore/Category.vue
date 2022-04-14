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
                                    <el-link class="nav-item" @click="getArticleListByCategoryId(item.id)">{{item.name}}</el-link>
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
                <el-col :xl="{span:10,offset:8}" :lg="{span:12,offset:6}" v-loading="articleListLoading">
                    <ArticleInfoList v-loading="articleListLoading" :article-list="articleList"></ArticleInfoList>
                    <div class="block pagination">
                        <el-pagination
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
    import axios from "axios"
    import {Notification} from 'element-ui'
    import ArticleInfoList from "./ArticleInfoList";
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
            getArticleListByCategoryId(categoryId){
                this.categoryId=categoryId
                this.getArticleList(1);
            },
            getArticleList(pageNum){
                let url=this.baseUrl+"/fore/category/article/list?categoryId="+this.categoryId+"&pageNum="+pageNum
                this.articleListLoading=true;
                axios.get(url).then((res)=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data
                        this.articleList=data.list;
                        this.articlePageSize=data.pageSize;
                        this.articleTotal=data.total;
                        this.articleListLoading=false;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取日志列表失败',
                            type:'error'
                        })
                    }
                })
            },
            getCategoryList(pageNum){
                let url=this.baseUrl+"/fore/category/list?pageNum="+pageNum
                    +"&pageSize="+10;
                this.categoryListLoading=true;
                axios.get(url).then((res)=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.categoryList=data.list
                        this.categoryTotal=data.total;
                        this.categoryPageSize=data.pageSize
                        this.categoryListLoading=false;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取分类列表失败！',
                            type:'error'
                        })
                    }
                })
            }
        },
        activated(){
            document.title="Blog | 分 类"

        },
        created(){
            this.getCategoryList(1)
            this.getArticleList(1)
        },
        mounted(){
        }
    }
</script>

<style>
</style>