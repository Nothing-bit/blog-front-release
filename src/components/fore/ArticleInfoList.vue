<template>
    <div>
        <div >
            <transition-group  name="list-complete"
                               tag="div"
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
                                <b @click="articlePage(item.id)">{{item.title}}</b>
                            </div>
                            <div class="article-info-summary">
                                <p>{{item.summary}}</p>
                            </div>
                            <el-row style="text-align: center">
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleInfoList",
        props:["articleList"],
        data(){
            return{
            }
        },
        created(){
        },
        methods:{
            articlePage(id){
                this.$router.push(
                    {
                        name:'article',
                        query:{
                            id:id,
                        },
                        // params:{
                        //     title:title
                        // }
                    })
            },
            jumpToArticlePage(tagName){
                this.$router.push({name:'tagArticle',query:{tagName:tagName}})
            }
        }
    }
</script>

<style scoped>
    .article-card{
        padding: 13px;
        margin-bottom: 15px;
        text-align: left;
        position: relative;
    }
    .tag-container{
        height: 20px;
        vertical-align: center;
        padding: 10px;
    }
    .article-tag{
        margin-left: 15px;
    }
    .article-info-cover{
        text-align: center;
        border-radius: 2px;
        width: 95%;
        /*cursor: pointer;*/
        /*transition: transform 500ms;*/
    }
    .article-info-title{
        cursor: pointer;
        font-size: 18px;
        color:rgba(0,0,0,0.8)
    }
    .article-info-title:hover{
        color: rgba(64,158,255,0.9);
        transition: color 500ms;
    }
    .article-info-item{
        padding: 2px;
    }
    .article-tag:hover{
        cursor: pointer;
    }
    .article-info-summary{
        height: 100px;
        color: rgba(0,0,0,.5);
        overflow-y: hidden;
    }
</style>