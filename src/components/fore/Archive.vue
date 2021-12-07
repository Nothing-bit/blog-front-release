<template>
    <div>
        <el-row :gutter=15>
            <el-col :xl="{span:14,offset:5}" :lg="{span:16,offset:4}" :md={span:24}>
                <!--                面包屑导航-->
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a class="breadcrumb-item">归 档</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div style="min-height: 700px;">
                    <!--                    分类-->
                    <el-col :lg={span:4} style="text-align: center" v-loading="archiveListLoading">
                        <transition name="list-complete"
                                          tag="div"
                                          appear
                                          appear-active-class="animate__animated animate__fadeInLeft"
                                          enter-active-class="animate__animated animate__fadeInLeft">
                            <el-card>
                                <transition-group name="list-complete"
                                                  tag="div"
                                                  appear
                                                  appear-active-class="animate__animated animate__fadeIn"
                                                  enter-active-class="animate__animated animate__fadeIn">
                                    <div class="nav-menu" v-for="item in archiveList" v-bind:key="item">
                                        <el-link class="nav-item" @click="getArticleListByMonth(item)">{{item}}</el-link>
                                        <br>
                                    </div>
                                </transition-group>
                            </el-card>
                        </transition>
                        <el-pagination :total=archiveTotal
                                       :page-size=archivePageSize
                                       :current-page=1
                                       @current-change="getArchiveList"
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
        name: "Archieve",
        data(){
            return{
                //archiveList
                archiveTotal:0,
                archiveList:[],
                archivePageSize:0,
                archiveListLoading:true,
                //articleList
                month:"all",
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
            getArticleListByMonth(month){
                this.articleListLoading=true;
                this.month=month;
                this.getArticleList(1)
            },
            getArticleList(pageNum){
                this.articleListLoading=true;
                let url=this.baseUrl+"/fore/archive/article/list?month=" +this.month
                    +"&pageNum="+pageNum
                    +"&pageSize=10";
                axios.get(url).then((res)=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
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
            getArchiveList(pageNum){
                this.archiveListLoading=true;
                let url=this.baseUrl+"/fore/archive/list?pageNum="+pageNum
                    +"&pageSize=10";
                axios.get(url).then((res)=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.archiveList=data.list;
                        this.archiveTotal=data.total;
                        this.archivePageSize=data.pageSize;
                        this.archiveListLoading=false;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取归档列表失败',
                            type:'error'
                        })
                    }
                })
            }
        },
        created(){
            this.getArchiveList(1)
            this.getArticleList(1)
        }
    }
</script>

<style scoped>

    .article-pic{
        border-radius: 5px;
        width: 95%;
    }
    .article-card{
        padding: 20px;
        margin-bottom: 5px;
        text-align: left;
    }
    .tag-container{
        height: 20px;
        vertical-align: center;
        padding: 10px;
    }
    .article-tag{
        margin-left: 15px;
    }
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
    .article-info-icon{
        font-size: 20px;
        margin-right: 5px;
    }
    .article-info-summary{
        height: 100px;
    }
</style>