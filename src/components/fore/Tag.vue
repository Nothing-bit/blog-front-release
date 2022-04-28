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
    import TagContainer from "@/components/fore/TagContainer";
    import tagAPI from "@/api/fore/tag";
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
                tagAPI.getTagAll().then(data=>{
                    // console.log(data)
                    this.tagList=data;
                    this.tagListLoading=false;
                },error=>console.error(error))
            },
        },
        activated() {
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