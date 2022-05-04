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
                            <div style="width: 95%; overflow:hidden;">
                                <img :src="baseURL+item.pictureUrl" @click="articlePage(item.id)" class="article-info-cover">
                            </div>
                        </el-col>
                        <!--                简略信息列-->
                        <el-col :lg="16" :md="24" :sm="24">
                            <div class="article-info-title">
                                <b @click="articlePage(item.id)">{{item.title}}</b>
                            </div>
                            <div class="article-info-summary">
                                <p>{{item.summary.length>80?item.summary.substring(0, 80)+"...":item.summary}}</p>
                            </div>
                            <el-row>
                                <el-col :lg="9" :md="9" :sm="8">
                                    <div class="article-info-item">
                                        <span @click="categoryPage(item.categoryId)"><i class="el-icon-menu"></i>&nbsp;{{item.categoryName}}</span>
                                    </div>
                                </el-col>
                                <el-col :lg="9" :md="9" :sm="8">
                                    <div class="article-info-item">
                                        <span  @click="archivePage(item.createBy.match(/\d{4}年\d{2}月/g))"><i class="el-icon-date"></i>&nbsp;{{item.createBy}}</span>
                                    </div>
                                </el-col>
                                <el-col :lg="6" :md="6" :sm="8">
                                    <div class="article-info-item">
                                        <span @click="articlePage(item.id)"><i class="el-icon-view"></i>&nbsp;{{item.traffic}} 次</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row class="article-tag-list">
                        <div  class="article-tag" v-for="tag in item.tagList" v-bind:key="tag">
                            <el-tag size="medium"  @click="tagArticlePage(tag)">{{tag}}</el-tag>
                        </div>
                    </el-row>
                </el-card>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import baseURL from '@/config/baseURL';
    export default {
        name: "ArticleInfoList",
        props:["articleList"],
        data(){
            return{
                baseURL:''
            }
        },
        created(){
            this.baseURL = baseURL
        },
        methods:{
            articlePage(id){
                this.$router.push(
                    {
                        name:'article',
                        query:{
                            id:id,
                        }
                    })
            },
            categoryPage(categoryId){
                this.$router.push({name:'category',query:{categoryId:categoryId}})
            }
            ,
            tagArticlePage(tagName){
                this.$router.push({name:'tagArticle',query:{tagName:tagName}})
            },
            archivePage(month){
                this.$router.push({name:'archive',query:{month:month}})
            }
        }
    }
</script>

<style scoped>
    .article-card{
        padding: 10px;
        margin-bottom: 15px;
        text-align: left;
        position: relative;
        /*transform:translateZ(0)  scale(1.0);*/
        /*transition: all 300ms;*/
    }
    .article-card:hover{
        /*transform: translateZ(0) scale(1.01);*/
        /*transition: all 300ms;*/
    }
    .article-tag-list{
        margin-top: 10px;
        margin-bottom: -10px;
        display: table
    }
    .article-tag{
        display: table-cell;
        padding-left: 10px;
    }
    .article-info-cover{
        text-align: center;
        border-radius: 2px;
        width: 100%;
        /*cursor: pointer;*/
        /*transition: transform 500ms;*/
        transform: scale(1) ;
        transition: 300ms ease-out;
    }
    .article-info-cover:hover{
        transform: scale(1.07) ;
        transition: 300ms ease-in;
        cursor: pointer;
    }
    .article-info-title{
        cursor: pointer;
        font-size: 18px;
        color:rgba(0,0,0,0.8);
        /*transform: scale(1) ;*/
        transition: all 300ms ease-out;
    }
    .article-info-title:hover{
        color: rgba(64,158,255,0.9);
        /*transform: scale(1.05) ;*/
        transition: all 300ms ease-in;
    }
    .article-info-item{
        padding: 2px;
        color: rgba(60, 60, 60, 0.78);
        font-weight: bold;
    }
    .article-info-item:hover{
        cursor: pointer;
    }
    .article-tag:hover{
        cursor: pointer;
    }
    .article-info-summary{
        height: 110px;
        color: rgba(0,0,0,.5);
        overflow-y: hidden;
    }
</style>