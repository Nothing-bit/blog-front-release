<template xmlns:el-col="http://www.w3.org/1999/html">
    <div class="main-container" >
        <el-row :gutter="15" >
            <!--            第一列-->
            <el-col :xl="{span:5,offset:2}" :lg="{span:6}">
                <el-alert type="success" :title="notice"></el-alert>
                <transition
                        enter-active-class="animate__animated animate__fadeIn">
                    <el-card  shadow="hover" class="self-info-card card " >
                        <img class="head-pic" src="../../assets/headPic.png" width="100px">
                        <h3>Zhou Jian Guo</h3>
                        <span>{{signature}}</span>
                        <el-divider></el-divider>
                        <el-row>
                            <el-col  :xl="{span:4,offset:4}" :lg="{span:6}">
                                <el-tooltip content="逼乎" effect="light">
                                    <a href="https://www.zhihu.com/people/zhou-xiao-jun-3-75" target="_blank"><img  class="appPic" src="../../assets/index-zhihu.png"></a>
                                </el-tooltip>
                            </el-col>
                            <el-col :xl="{span:4}" :lg="{span:6}" >
                                <el-tooltip content="网抑云" effect="light">
                                    <a href="https://music.163.com/#/user/home?id=336092679" target="_blank"><img class="appPic" src="../../assets/index-wycloudmusic.png"></a>
                                </el-tooltip>
                            </el-col>
                            <el-col :xl="{span:4}" :lg="{span:6}">
                                <el-tooltip content="CopyHub" effect="light">
                                    <a href="https://github.com/Nothing-bit"><img class="appPic" src="../../assets/index-github.png"></a>
                                </el-tooltip>
                            </el-col>
                            <el-col :xl="{span:4}" :lg="{span:6}">
                                <el-tooltip content="Gitee" effect="light">
                                    <a href="https://gitee.com/zhou-jian-guo"><img class="appPic" src="../../assets/login-gitee.png"></a>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                    </el-card>
                </transition>
                <h3>随 说</h3>
                <el-timeline>
                    <transition-group name="list-complete"
                                      tag="div"
                                      appear
                                      appear-active-class="animate__animated animate__fadeIn"
                                      enter-active-class="animate__animated animate__fadeIn">
                        <el-timeline-item  type="primary" :timestamp="item.createBy" placement="top" v-for="item in newsList" v-bind:key="item.id" >
                            <el-card style="min-height: 200px" shadow="hover">
                                <el-row>
                                    <el-col :xl={span:6} :lg={span:6}>
                                        <el-avatar :src="item.avatar" shape="square"></el-avatar>
                                    </el-col>
                                    <el-col :xl={span:16} :lg={span:16}>
                                        <p class="username">{{item.username}}</p>
                                    </el-col>
                                </el-row>
                                <div v-html="item.content" class="content-module ck-content"></div>
                            </el-card>
                        </el-timeline-item>
                    </transition-group>
                </el-timeline>
            </el-col>
            <!--            第二列-->
            <el-col :xl="{span:10}" :lg="{span:12}">
                <h3>日 志</h3>
                <ArticleInfoList v-loading="loading" :article-list="this.articleList"></ArticleInfoList>
                <div class="block pagination">
                    <el-pagination
                            @current-change="getArticleList"
                            :current-page="1"
                            :page-size=pageSize
                            layout="total, prev, pager, next, jumper"
                            :total=total>
                    </el-pagination>
                </div>
            </el-col>
            <!--        第三列-->
            <transition appear
                        appear-active-class="animate__animated animate__fadeIn"
                        enter-active-class="animate__animated animate__fadeIn">
                <el-col :xl="{span:5}" :lg="{span:6}" :md="24">
                    <h3>标签云</h3>
                    <el-card shadow="hover" class="card" ref="wordCloudCard">
                        <TagContainer :tag-list="tagList" :size-range="[10,50]" padding="0.2rem"></TagContainer>
                    </el-card>
                    <h3>友 链</h3>
                    <el-card shadow="hover" style="text-align: center;" :body-style="{padding:'10px !important'}">
                        <el-link class="link" v-for="item in friendLinkList" type="primary" v-bind:key="item.id" :href="item.url" target="_blank">{{item.name}}</el-link>
                    </el-card>
                    <h3>站点信息</h3>
                    <el-card shadow="hover" class="card">
                        <p><i class="el-icon-time"></i> 运行时间：{{time}}</p>
                        <p><i class="el-icon-document"></i> 日志数量：{{countPublicArticle}} 篇</p>
                        <p><i class="el-icon-menu"></i> 分类数量：{{countCategory}} 个</p>
                        <p><i class="el-icon-price-tag"></i> 标签数量：{{countTag}} 个</p>
                    </el-card>
                </el-col>
            </transition>
        </el-row>
    </div>

</template>
<script>
    import ArticleInfoList from "./ArticleInfoList";
    import TagContainer from "@/components/fore/TagContainer";
    import axios from 'axios'
    export default {
        data(){
            return{
                tagList:[],
                notice:'',
                signature:'',
                countPublicArticle:0,
                countTag:0,
                countCategory:0,
                time:'',
                newsList:[],
                friendLinkList:[],
                articleList:[],
                total:0,
                loading:true,
                pageSize:0
            }
        },
        methods:{
            getArticleList(pageNum){
                this.loading=true
                let url = this.baseUrl+"/fore/article/list?pageNum="+pageNum;
                axios.get(url).then((res) => {
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data
                        this.articleList=data.list;
                        this.pageSize=data.pageSize
                        this.total=data.total
                        this.loading=false
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            queryAllFriendLink(){
                let url=this.baseUrl+"/fore/friend/link/all"
                axios.get(url).then((res)=>{
                    let result=res.data;
                    if(result.code==200){
                        this.loading=false;
                        this.friendLinkList=result.data;
                    }
                })
            },
            getNews(){
                let url=this.baseUrl+"/fore/news/list?pageNum=1&pageSize=4"
                axios.get(url).then(res=>{
                    let result =res.data
                    if(result.code==200){
                        let data=result.data;
                        this.newsList=data.list;
                    }
                })
            },
            initData(){
                let url=this.baseUrl+"/fore/index/data"
                axios.get(url).then((response)=>{
                    let result=response.data;
                    if(result.code==200){
                        let data=result.data
                        this.tagList=data.tagList.sort((a,b)=>a.value-b.value)
                        this.signature=data.signature
                        this.notice=data.notice
                        this.countTag=data.countTag
                        this.countCategory=data.countCategory
                        this.countPublicArticle=data.countPublicArticle
                    }else{
                        this.$message({
                            message:'加载首页信息出错啦！',
                            type:'error'
                        })
                    }
                })
            },
            setTime(){
                let seconds = 1000;
                let minutes = seconds * 60;
                let hours = minutes * 60;
                let days = hours * 24;
                let years = days * 365;
                let today = new Date();
                let todayYear = today.getFullYear();
                let todayMonth = today.getMonth()+1;
                let todayDate = today.getDate();
                let todayHour = today.getHours();
                let todayMinute = today.getMinutes();
                let todaySecond = today.getSeconds();
                let t1 = Date.UTC(2019,9,1,0,0,0); //北京时间2016-12-1 00:00:00
                let t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);
                let diff = t2-t1;
                let diffYears = Math.floor(diff/years);
                let diffDays = Math.floor((diff/days)-diffYears*365);
                this.time=diffYears+" 年 "+diffDays+" 天 "
            }
        },
        updated(){
        },
        activated(){
            document.title="Blog | 首 页"
            // this.show=true
        },
        deactivated(){
        },
        created(){
            this.initData()
            this.setTime()
            this.getNews()
            this.queryAllFriendLink()
        },
        mounted() {
            this.getArticleList(1)
        },
        components:{
            ArticleInfoList,
            TagContainer
        }
    }
</script>
<style >
    @import "~@/assets/css/ckeditor-content.css";
    .self-info-card{
        text-align: center;
    }
    .head-pic{
        border-radius: 10px;
    }
    .main-container{
        min-height: 800px;
    }
    .appPic{
        width: 32px;
    }
    .link{
        padding: 10px;
        font-size: 15px;
    }
</style>