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
                    <el-card style="height: calc(70vh)" v-loading="tagListLoading">
                        <div style="text-align: center">
                            <h2>当前共有{{tagList.length}}个标签</h2>
                        </div>
                        <el-divider></el-divider>
                            <div id="wordCloudChart" style="width: auto;height: calc(50vh);"></div>
                        <div></div>
                    </el-card>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    var echarts = require('echarts/lib/echarts');
    require('echarts-wordcloud');
    import axios from 'axios'
    import { Notification }  from 'element-ui';
    export default {
        name: "Tag",
        data(){
            return{
                tagListLoading:false,
                tagList:[],
                tagTotal:0,
            }
        },
        methods:{
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
                        this.initWordCloud()
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取标签列表失败',
                            type:'error'
                        })
                    }
                })
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
                        width: '100%',
                        height: '100%',
                        // Text size range which the value in data will be mapped to.
                        // Default to have minimum 12px and maximum 60px size.
                        sizeRange: [10, 50],
                        // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45
                        rotationRange: [0, 0],
                        rotationStep: 0,
                        // size of the grid in pixels for marking the availability of the canvas
                        // the larger the grid size, the bigger the gap between words.
                        gridSize: 13,
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
                                shadowColor: 'rgb(64,158,255)'
                            }
                        },
                        // Data is an array. Each array item must have name and value property.
                        data: this.tagList
                    }]
                });
            },
        },
        created(){
            document.title="标 签"
            this.getTagCloudList()
        }
    }
</script>

<style scoped>
    .tag-button-container{
        padding: 20px 50px 50px;
    }
    .tag-button{
        margin-top:15px;
        padding: 10px;
    }
</style>