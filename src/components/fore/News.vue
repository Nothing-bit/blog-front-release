<template>
    <div>
        <!--                面包屑导航-->
        <el-row >
            <el-col :xl="{span:14,offset:5}" :lg="{span:16,offset:4}" :md="{span:24}">
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a class="breadcrumb-item">随 说</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :xl="{span:14,offset:5}" :lg="{span:16,offset:4}" :md="{span:24}">
                <!--                时间轴部分-->
                <el-col :lg="{span:20,offset:2}" :md="{span:24}">
                    <el-timeline class="infinite-list" infinite-scroll-delay="1000"  :infinite-scroll-distance="200" v-infinite-scroll="getList" style="overflow:auto">
                        <transition-group name="list-complete"
                                          tag="div"
                                          appear
                                          appear-active-class="animate__animated animate__fadeInRight"
                                          enter-active-class="animate__animated animate__fadeInRight">
                            <el-timeline-item class="infinite-list-item" type="primary" :timestamp="item.createBy" placement="top" v-for="item in pageInfo.list" v-bind:key="item.id" >
                                <el-card shadow="hover">
                                    <el-row>
                                        <el-col :lg={span:2} :md={span:3} :sm={span:3}>
                                            <el-avatar :src="item.avatar" shape="square" class="avatar"></el-avatar>
                                        </el-col>
                                        <el-col :lg={span:4} :md={span:6} :sm="{span:6}">
                                            <p class="username">{{item.username}}</p>
                                        </el-col>
                                    </el-row>
                                    <div v-html="item.content" class="content-module ck-content"></div>
                                </el-card>
                            </el-timeline-item>
                        </transition-group>
                        <el-card class="last-card" shadow="never">
                            <h3 style="text-align: center" v-if="listLoading"><i class="el-icon-loading"></i>努力加载中····</h3>
                            <h3 style="text-align: center" v-if="!pageInfo.hasNextPage"><i class="el-icon-more"></i>很久很久以前，那遥不可及的地方<i class="el-icon-more"></i></h3>
                        </el-card>
                    </el-timeline>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import newsAPI from "@/api/fore/news";
    export default {
        name: "News",
        data(){
            return{
                pageInfo:{
                    list:[],
                    pageNum:1,
                    pageSize:5,
                    total:0,
                    hasNextPage:true,
                },
                listLoading:false,
            }
        },
        methods:{
            getList(){
                if(this.pageInfo.hasNextPage){
                    this.listLoading=true;
                    newsAPI.getNews(this.pageInfo.pageNum, this.pageInfo.pageSize).then(data=>{
                        this.pageInfo.pageNum++
                        this.pageInfo.list=this.pageInfo.list.concat(data.list);
                        this.pageInfo.total=data.total;
                        this.pageInfo.hasNextPage=data.hasNextPage
                        this.listLoading=false
                    }, error => {console.error(error)})
                }
            }
        },
        activated(){
        }
    }
</script>

<style >
    @import "~@/assets/css/ckeditor-content.css";
    .content-module{
        padding: 20px;
    }
    .last-card{
        padding: 20px;
        margin-bottom: 50px;
    }
</style>