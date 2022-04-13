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
                    <el-card style="min-height: calc(60vh)" v-loading="tagListLoading">
                        <div style="text-align: center">
                            <h2>当前共有{{tagList.length}}个标签</h2>
                        </div>
                        <el-divider></el-divider>
                        <TagContainer class="tag-container" :tag-list="tagList" :size-range="[15,50]"/>
                        </el-card>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import { Notification }  from 'element-ui';
    import TagContainer from "@/components/fore/TagContainer";
    export default {
        name: "Tag",
        components:{
          TagContainer
        },
        data(){
            return{
                tagListLoading:false,
                tagList:[],
                tagTotal:0,
            }
        },
        methods:{
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
    .tag-container{
        padding: 0px 40px 0px 40px;
    }
</style>