<template>
    <div>
        <el-row :gutter=15>
            <el-col :lg={span:18,offset:3} :md={span:24}>
                <!--                面包屑导航-->
                <div class="breadcrumb">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{path:'/fore/index'}"><a class="breadcrumb-item">首 页</a></el-breadcrumb-item>
                        <el-breadcrumb-item><a class="breadcrumb-item">标 签</a></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <transition appear
                            appear-active-class="animate__animated animate__fadeIn"
                            enter-active-class="animate__animated animate__fadeIn">
                    <el-card style="height: calc(60vh)" v-loading="tagListLoading">
                        <div style="text-align: center">
                            <h2>当前共有{{tagList.length}}个标签</h2>
                        </div>
                        <el-divider></el-divider>
                            <div class="tag-container">
                                <el-link class="tag-link" :underline=false type="info" :style="{fontSize:item.value+15+'px', color:randomColor()}" v-for="item in tagList" v-bind:key=item.id @click="jumpToArticlePage(item.name)">#{{item.name}}</el-link>
                            </div>
                        </el-card>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import { Notification }  from 'element-ui';
    export default {
        name: "Tag",
        data(){
            return{
                tagListLoading:false,
                tagList:[],
                tagTotal:0,
                colors:[
                    '#2ec7c9',
                    '#b6a2de',
                    '#5ab1ef',
                    '#ffb980',
                    '#d87a80',
                    '#8d98b3',
                    '#e5cf0d',
                    '#97b552',
                    '#95706d',
                    '#dc69aa',
                    '#07a2a4',
                    '#9a7fd1',
                    '#588dd5',
                    '#f5994e',
                    '#c05050',
                    '#59678c',
                    '#c9ab00',
                    '#7eb00a',
                    '#6f5553',
                    '#c14089'
                ]
            }
        },
        methods:{
            randomColor(){
                return  this.colors[Math.round(Math.random() * this.colors.length) ]
            },
            jumpToArticlePage(tagName){
                this.$router.push({name:'tagArticle',query:{tagName:tagName}})
            },
            getTagCloudList(){
                this.tagListLoading=true;
                let url=this.baseUrl+"/fore/tag/cloud"
                axios.get(url).then((res)=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.tagList=data;
                        this.tagListLoading=false;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取标签列表失败',
                            type:'error'
                        })
                    }
                })
            },
        },
        activated() {
            document.title="Blog | 标 签"
        },
        created(){
            this.getTagCloudList()
        }
    }
</script>

<style scoped>
    .tag-link{
        /*color:rgba(128, 191, 255, 0.9);*/
        padding:0.5rem
    }
    .tag-link:hover{
        /*color:rgba(26, 139, 255, 1);*/
        /*transition: color 300ms;*/
        text-shadow: 3px 3px 4px rgba(100, 100, 100, 0.6);
    }
    .tag-container{
        padding: 0px 40px 0px 40px;
    }
</style>