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
                    <el-col :lg={span:12,offset:6} v-loading="articleListLoading">
                        <transition-group name="list-complete"
                                          tag="div"
                                          appear
                                          appear-active-class="animate__animated animate__fadeIn"
                                          enter-active-class="animate__animated animate__fadeIn">
                            <el-card shadow="hover" v-for="item in articleList" v-bind:key="item.id" class="article-card" >
                                <el-tooltip v-if="item.top" content="置 顶" effect="light" placement="left">
                                    <img src="../../assets/top.png" style="position: absolute;right: 20px;top: 12px;"/>
                                </el-tooltip>
                                <el-row :gutter=5>
                                    <!--                封面列-->
                                    <el-col :lg="8" :md="24" :sm="24">
                                        <img :src="baseUrl+item.pictureUrl"  class="article-info-cover">
                                    </el-col>
                                    <!--                简略信息列-->
                                    <el-col :lg="16" :md="24" :sm="24">
                                        <div class="article-info-title">
                                            <b><a @click="articlePage(item.id)">{{item.title}}</a></b>
                                        </div>
                                        <div class="article-info-summary">
                                            <p>{{item.summary}}</p>
                                        </div>
                                        <el-row >
                                            <el-col :lg="9" :md="9" :sm="8">
                                                <div class="article-info-item">
                                                    <span><i class="el-icon-menu"></i>&nbsp;{{item.categoryName}}</span>
                                                </div>
                                            </el-col>
                                            <el-col :lg="9" :md="9" :sm="8">
                                                <div class="article-info-item">
                                                    <span><i class="el-icon-date"></i>&nbsp;{{item.createBy}}</span>
                                                </div>
                                            </el-col>
                                            <el-col :lg="6" :md="6" :sm="8">
                                                <div class="article-info-item">
                                                    <span><i class="el-icon-view"></i>&nbsp;{{item.traffic}} 次</span>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-row class="tag-container">
                                    <i class="el-icon-price-tag"></i>
                                    <el-tag size="medium" class="article-tag" v-for="tag in item.tagList" v-bind:key="tag" @click="jumpToArticlePage(tag)">{{tag}}</el-tag>
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
        name: "TagArticle",
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
            articlePage(id){
                this.$router.push({path:"article",query:{id:id}})
            },
            jumpToArticlePage(tagName){
                this.$router.push({name:'tagArticle',query:{tagName:tagName}})
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
        created(){
            this.setTagName()
            this.getArticleList(1)
        }
    }
</script>

<style>


</style>