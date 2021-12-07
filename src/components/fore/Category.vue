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
                <div style="min-height: 700px;">
<!--                    分类-->
                    <el-col :lg={span:4}  style="text-align: center" v-loading="categoryListLoading">
                        <transition name="list-complete"
                                    tag="div"
                                    appear
                                    appear-active-class="animate__animated animate__fadeInLeft"
                                    enter-active-class="animate__animated animate__fadeInLeft">
                            <el-card>
                                <transition-group name="list-complete"
                                                  tag="div"
                                                  appear
                                                  appear-active-class="animate__animated animate__fadeInLeft"
                                                  enter-active-class="animate__animated animate__fadeInLeft">
                                    <div class="nav-menu" v-for="item in categoryList" v-bind:key="item.id">
                                        <el-link type="primary" class="nav-item" @click="getArticleListByCategoryId(item.id)">{{item.name}}</el-link>
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
                    <el-col :lg={span:18} v-loading="articleListLoading">
                        <transition-group name="list-complete"
                                          tag="div"
                                          appear
                                          appear-active-class="animate__animated animate__fadeIn"
                                          enter-active-class="animate__animated animate__fadeIn">
                            <el-card shadow="hover" v-for="item in articleList" v-bind:key="item.id" class="article-card" >
                                <el-row :gutter=5>
                                    <!--                封面列-->
                                    <el-col :lg="10" :md="24" :sm="24">
                                        <img :src="baseUrl+item.pictureUrl" @click="articlePage(item.id)" class="article-pic"  >
                                    </el-col>
                                    <!--                简略信息列-->
                                    <el-col :lg="14" :md="24" :sm="24">
                                        <h3>{{item.title}}</h3>
                                        <div class="article-info-summary">
                                            <p>{{item.summary}}</p>
                                        </div>
                                        <el-row >
                                            <el-col :lg="9" :md="9" :sm="8">
                                                <p><i class="el-icon-menu article-info-icon"></i>{{item.categoryName}}</p>
                                            </el-col>
                                            <el-col :lg="9" :md="9" :sm="8">
                                                <p><i class="el-icon-date article-info-icon"></i>{{item.createBy}}</p>
                                            </el-col>
                                            <el-col :lg="6" :md="6" :sm="8">
                                                <p><i class="el-icon-view article-info-icon"></i> {{item.traffic}}</p>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-row class="tag-container">
                                    <i class="el-icon-price-tag"></i>
                                    <el-tag class="article-tag" v-for="tag in item.tagList" v-bind:key="tag" @click="jumpToArticlePage(tag)">{{tag}}</el-tag>
                                </el-row>
                            </el-card>
                        </transition-group>
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
        methods:{
            articlePage(id){
                this.$router.push({name:'article',query:{id:id}})
            },
            jumpToArticlePage(tagName){
                this.$router.push({name:'tagArticle',query:{tagName:tagName}})
            },
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
        created(){
            this.getCategoryList(1)
            this.getArticleList(1)
        },
        mounted(){
        }
    }
</script>

<style>
    .pagination{
        text-align: center;
    }
    .nav-menu{
        text-align: center;
        padding: 10px;

    }
    .nav-item{
        color: rgb(64,158,255);
    }
</style>