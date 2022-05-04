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
                            background
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
                    <el-card shadow="hover" ref="wordCloudCard">
                        <TagContainer :tag-list="tagList" :size-range="[10,50]" padding="0.2rem"></TagContainer>
                    </el-card>
                    <h3>友 链</h3>
                    <el-card shadow="hover" style="text-align: center;" :body-style="{padding:'10px !important'}">
                        <table class="friend-link-table">
                            <tr v-for="(item, index) in friendLinkList" v-if="index%3==0" v-bind:key="item.id">
                                <td class="friend-link-table-td" v-if="index<friendLinkList.length">
                                    <el-link :underline=true icon="el-icon-link"   :href="item.url" target="_blank">{{friendLinkList[index].name}}</el-link></td>
                                <td class="friend-link-table-td" v-else></td>
                                <td class="friend-link-table-td" v-if="index+1<friendLinkList.length">
                                    <el-link :underline=true icon="el-icon-link"   :href="item.url" target="_blank">{{friendLinkList[index+1].name}}</el-link></td>
                                <td class="friend-link-table-td" v-else></td>
                                <td class="friend-link-table-td" v-if="index+2<friendLinkList.length">
                                    <el-link :underline=true icon="el-icon-link"   :href="item.url" target="_blank">{{friendLinkList[index+2].name}}</el-link></td>
                                <td class="friend-link-table-td" v-else></td>
                            </tr>
                        </table>

                    </el-card>
                    <h3>最多阅读</h3>
                    <el-card shadow="hover">
                        <div class="top-read-node" v-for="(item, index) in hotArticleList" v-bind:key="item.id" style="padding: 5px">
                            <div class="top-read-order-number" :style="{background:getColor(index)}">{{index+1}}</div>
                            <div class="top-read-content">
                                <el-link :underline=true @click="selectHandler(item)">{{item.title.length>30?item.title.substring(0,30)+"...":item.title}}</el-link>
                            </div>
                        </div>
                    </el-card>
                    <h3>站点信息</h3>
                    <el-card shadow="hover" style="color: rgba(50,50,50,0.95)">
                        <p><i class="el-icon-time"></i> 运行时间：{{time}}</p>
                        <p><i class="el-icon-document"></i> 日志数量：{{countPublicArticle}} 篇</p>
                        <p><i class="el-icon-menu"></i> 分类数量：{{countCategory}} 个</p>
                        <p><i class="el-icon-price-tag"></i> 标签数量：{{countTag}} 个</p>
                        <p><i class="el-icon-user"></i> 在线人数：{{countVisitor}} 位</p>
                    </el-card>
                </el-col>
            </transition>
        </el-row>
    </div>

</template>
<script>
    import ArticleInfoList from "./ArticleInfoList";
    import TagContainer from "@/components/fore/TagContainer";
    import articleAPI from "@/api/fore/article";
    import newsAPI from "@/api/fore/news";
    import friendLinkAPI from "@/api/fore/friendLink";
    import indexAPI from "@/api/fore";
    import colorPanel from "@/config/colorPanel";

    export default {
        data(){
            return{
                tagList:[],
                notice:'',
                signature:'',
                countPublicArticle:0,
                countTag:0,
                countCategory:0,
                countVisitor:0,
                time:'',
                newsList:[],
                friendLinkList:[],
                articleList:[],
                total:0,
                loading:true,
                pageSize:0,
                hotArticleList:[]
            }
        },
        methods:{
            getColor(index){
                return colorPanel[index]
            },
            getArticleList(pageNum){
                this.loading=true
                articleAPI.getArticleList(pageNum, 5).then(data=>{
                    this.articleList=data.list;
                    this.pageSize=data.pageSize
                    this.total=data.total
                })
                this.loading=false
            },
            queryAllFriendLink(){
                friendLinkAPI.getAllFriendLink().then(data=>{
                    this.loading=false;
                    this.friendLinkList=data;
                },error => console.error(error))
            },
            getNews(){
                newsAPI.getNews(1,4).then(data=>{
                    this.newsList=data.list;
                })
            },
            selectHandler(item){
                // history.pushState('','',"/fore/article?id="+item.id)
                this.$router.push({name:'article',query:{id:item.id}})
                this.drawer=false
            },
            initData(){
                indexAPI.initIndexData().then(data=>{
                    this.tagList=data.tagList
                    this.signature=data.signature
                    this.notice=data.notice
                    this.countTag=data.countTag
                    this.countCategory=data.countCategory
                    this.countPublicArticle=data.countPublicArticle
                    this.countVisitor = data. countVisitor
                    this.hotArticleList = data.hotArticleList
                },reason => console.error(reason))
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
                let t1 = Date.UTC(2019,9,1,0,0,0);
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
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
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
    .top-read-node{
        display: table;
    }
    .top-read-order-number {
        display: table-cell;
        border-radius: 18px;
        background-color: rgb(92,182,255);
        width: 22px;
        height: 22px;
        font-size: 10px;
        text-align: center;
        vertical-align: middle;
        color: #fff;
    }
    .top-read-content{
        display: table-cell;
        padding-left:10px;
    }
    .friend-link-table{
        border-collapse: separate;
        width: 100%;
        table-layout: fixed;
        border-spacing: 0;
        border-top:dashed 1px rgba(60, 60, 60, 0.4);
        border-left: dashed 1px rgba(60, 60, 60, 0.4);
    }
    .friend-link-table-td{
        padding: 8px;
        border:dashed 1px rgba(60, 60, 60, 0.4);
        border-top:none;
        border-left: none;
    }
</style>