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
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <div style="min-height: 700px;">
                <!--                    归档-->
                <el-col style="text-align: center; position: fixed" :xl="{span:3,offset:5}"  :lg="{span:3,offset:3}" v-loading="archiveListLoading">
                    <transition name="list-complete"
                                      tag="div"
                                      appear
                                      appear-active-class="animate__animated animate__fadeInLeft"
                                      enter-active-class="animate__animated animate__fadeInLeft">
                        <el-card shadow="hover">
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
                <el-col :xl="{span:10,offset:8}" :lg="{span:12,offset:6}">
                    <ArticleInfoList v-loading="articleListLoading" :article-list="articleList"></ArticleInfoList>
                    <el-pagination  class="pagination"
                                    background
                                    :total=articleTotal
                                    :page-size=articlePageSize
                                    :current-page=1
                                    @current-change="getArticleList"></el-pagination>
                </el-col>
            </div>
        </el-row>
    </div>
</template>

<script>
    import ArticleInfoList from "./ArticleInfoList";
    import archiveAPI from "@/api/fore/archive";
    import articleAPI from "@/api/fore/article";
    export default {
        name: "Archive",
        components:{
            ArticleInfoList
        },
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
            getArticleListByMonth(month){
                this.articleListLoading=true;
                this.month=month;
                this.getArticleList(1)
            },
            getArticleList(pageNum){
                this.articleListLoading=true;
                articleAPI.getArticleListByMonth(this.month, pageNum, 5).then(data=>{
                    this.articleList=data.list;
                    this.articlePageSize=data.pageSize;
                    this.articleTotal=data.total;
                    this.articleListLoading=false;
                },error=>console.error(error))
            },
            getArchiveList(pageNum){
                this.archiveListLoading=true;
                archiveAPI.getArchiveList(pageNum,10).then(data=>{
                    this.archiveList=data.list;
                    this.archiveTotal=data.total;
                    this.archivePageSize=data.pageSize;
                    this.archiveListLoading=false;
                },error=>console.error(error))
            }
        },
        activated() {
        },
        created(){
            if(this.$route.query.month!=null){
                this.month = this.$route.query.month
            }
            this.getArchiveList(1)
            this.getArticleList(1)
        }
    }
</script>

<style>
</style>