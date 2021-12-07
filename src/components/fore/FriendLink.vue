<template>
    <div>
        <div v-loading="loading">
            <el-row>
                <el-col :md={span:24} :lg={span:20,offset:2}>
                    <!--                面包屑导航-->
                    <div class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                            <el-breadcrumb-item><a class="breadcrumb-item">友 链</a></el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <el-row :gutter="15" style="min-height: 700px;">
                        <el-alert title="交换友链请前往关于页留言,如果有logo,请留下超链接" type="warning" center></el-alert>
                        <el-col :md="6" :lg="6" v-for="item in friendLinkList" v-bind:key="item.id">
                            <el-card shadow="hover" class="friend-link-card">
                                <el-row>
                                    <el-col :md="12" :lg="12">
                                        <img :src="item.logoUrl" class="friend-link-logo" v-if="item.logoUrl!=''">
                                        <img src="../../assets/link.png" v-else>
                                    </el-col>
                                    <el-col :md="12" :lg="12">
                                        <a target="_blank" :href="item.url">{{item.name}}</a>
                                        <br/>
                                        <span>{{item.createBy}}</span>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "FriendLink",
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
        },
        data(){
            return {
                friendLinkList:[],
                loading:true,
            }
        },
        created(){
            this.queryAllFriendLink()
        }
    }
</script>

<style>
    .friend-link-card{
        height: 100px;
        margin-top: 10px;
    }
    .friend-link-logo{
        width: 100px;
    }
</style>