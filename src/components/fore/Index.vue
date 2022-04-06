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
                <div v-loading="loading">
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
                <div class="block pagination">
                    <el-pagination
                            @current-change="handleCurrentChange"
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
                    <el-card shadow="hover" class="card">
                        <div id="wordCloudChart" class="tag-cloud"></div>
                    </el-card>
                    <h3>友 链</h3>
                    <el-card style="text-align: center;" :body-style="{padding:'10px !important'}">
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
    var echarts = require('echarts/lib/echarts');
    require('echarts-wordcloud');
    import axios from 'axios'
    export default {
        data(){
            return{
                pageSize:0,
                total:0,
                tagList:[],
                articleList: [],
                loading:true,
                notice:'',
                signature:'',
                countPublicArticle:0,
                countTag:0,
                countCategory:0,
                time:'',
                searchValue:'',
                newsList:[],
                friendLinkList:[],
                temp:[]
            }
        },
        methods:{
            queryAllFriendLink(){
                var url=this.baseUrl+"/fore/friend/link/all"
                axios.get(url).then((res)=>{
                    var result=res.data;
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
            articlePage(id){
                this.$router.push({name:'article',query:{id:id}})
            },
            jumpToArticlePage(tagName){
                this.$router.push({name:'tagArticle',query:{tagName:tagName}})
            },
            initData(){
                var url=this.baseUrl+"/fore/index/data"
                axios.get(url).then((response)=>{
                    var result=response.data;
                    if(result.code==200){
                        var data=result.data
                        this.tagList=data.tagList
                        this.signature=data.signature
                        this.notice=data.notice
                        this.countTag=data.countTag
                        this.countCategory=data.countCategory
                        this.countPublicArticle=data.countPublicArticle
                        this.initWordCloud()
                    }else{
                        this.$message({
                            message:'加载首页信息出错啦！',
                            type:'error'
                        })
                    }
                })
            },
            handleCurrentChange(pageNum){
                this.loading=true
                var url = this.baseUrl+"/fore/article/list/?pageNum="+pageNum;
                axios.get(url).then((res) => {
                    var result=res.data;
                    if(result.code==200){
                        var data=result.data
                        this.articleList=data.list;
                        this.pageSize=data.pageSize
                        this.total=data.total
                        this.loading=false
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            initWordCloud(){
                var wordCloudChart=echarts.init(document.getElementById("wordCloudChart"))
                wordCloudChart.setOption({
                    tooltip: {
                        triggerOn: "click",
                        formatter: (e)=> {
                            this.$router.push({name:'tagArticle',query:{tagName:e.name}})
                        }
                    },
                    series: [{
                        type: 'wordCloud',
                        // The shape of the "cloud" to draw. Can be any polar equation represented as a
                        // callback function, or a keyword present. Available presents are circle (default),
                        // cardioid (apple or heart shape curve, the most known polar equation), diamond (
                        // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

                        shape: 'square',
                        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                        // Default to be put in the center and has 75% x 80% size.
                        left: 'center',
                        top: 'center',
                        width: '90%',
                        height: '90%',
                        // Text size range which the value in data will be mapped to.
                        // Default to have minimum 12px and maximum 60px size.
                        sizeRange: [10, 30],
                        // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45
                        rotationRange: [-90, 90],
                        rotationStep: 45,
                        // size of the grid in pixels for marking the availability of the canvas
                        // the larger the grid size, the bigger the gap between words.
                        gridSize: 5,
                        // set to true to allow word being draw partly outside of the canvas.
                        // Allow word bigger than the size of the canvas to be drawn
                        drawOutOfBound: false,
                        // Global text style
                        textStyle: {
                            normal: {
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                // Color can be a callback function or a color string
                                color: function () {
                                    // Random color
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        // Data is an array. Each array item must have name and value property.
                        data: this.tagList
                    }]
                });
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
                /* Date.UTC() -- 返回date对象距世界标准时间(UTC)1970年1月1日午夜之间的毫秒数(时间戳)
                year - 作为date对象的年份，为4位年份值
                month - 0-11之间的整数，做为date对象的月份
                day - 1-31之间的整数，做为date对象的天数
                hours - 0(午夜24点)-23之间的整数，做为date对象的小时数
                minutes - 0-59之间的整数，做为date对象的分钟数
                seconds - 0-59之间的整数，做为date对象的秒数
                microseconds - 0-999之间的整数，做为date对象的毫秒数 */
                let t1 = Date.UTC(2019,9,1,0,0,0); //北京时间2016-12-1 00:00:00
                let t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);
                let diff = t2-t1;
                let diffYears = Math.floor(diff/years);
                let diffDays = Math.floor((diff/days)-diffYears*365);
                this.time=diffYears+" 年 "+diffDays+" 天 "
            }
        },
        updated(){
                //console.log("Updated!")
        },
        activated(){
            // this.articleList=this.temp
            // console.log("Activated")
            // this.isShow=true
        },
        deactivated(){
            // this.temp=this.articleList
            // this.articleList=[]
            // console.log("Deactivated")
            // this.isShow=false
        },
        created(){
            this.initData()
            this.setTime()
            this.getNews()
            this.queryAllFriendLink()
        },
        mounted() {
            this.handleCurrentChange(1)
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