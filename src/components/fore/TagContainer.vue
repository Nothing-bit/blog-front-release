<template>
    <div class="tag-container">
        <span  class="tag-link"  :style="{padding: padding, fontSize:item.fontSize, color:randomColor()}" v-for="(item, idx) in tagListTemp" v-bind:key=idx @click="jumpToArticlePage(item.name)">{{item.name}}</span>
    </div>
</template>
<script>
    export default {
        name: "TagContainer",
        props:{
            tagList: {
                type: Array,
                require:true
            },
            sizeRange: {
                type: Array,
                default: function () {
                    return [10,40]
                }
            },
            padding:{
                type:String,
                default:"0.3rem"
            },
            colors:{
                type: Array,
                default: function () {
                    return  [
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
            }
        },
        methods:{
            randomColor(){
                let color = this.colors[Math.floor(Math.random() * this.colors.length) ]
                return color
            },
            linearMap(val, domain, range, clamp) {
                let subDomain = domain[1] - domain[0];
                let subRange = range[1] - range[0];

                if (subDomain === 0) {
                    return subRange === 0
                        ? range[0]
                        : (range[0] + range[1]) / 2;
                }

                // Avoid accuracy problem in edge, such as
                // 146.39 - 62.83 === 83.55999999999999.
                // See echarts/test/ut/spec/util/number.js#linearMap#accuracyError
                // It is a little verbose for efficiency considering this method
                // is a hotspot.
                if (clamp) {
                    if (subDomain > 0) {
                        if (val <= domain[0]) {
                            return range[0];
                        }
                        else if (val >= domain[1]) {
                            return range[1];
                        }
                    }
                    else {
                        if (val >= domain[0]) {
                            return range[0];
                        }
                        else if (val <= domain[1]) {
                            return range[1];
                        }
                    }
                }
                else {
                    if (val === domain[0]) {
                        return range[0];
                    }
                    if (val === domain[1]) {
                        return range[1];
                    }
                }

                return (val - domain[0]) / subDomain * subRange + range[0];
            },
            resizeFont(){
                //获取value范围
                let domain = [Math.min.apply(null, this.tagList.map(item=>item.value)), Math.max.apply(null, this.tagList.map(item=>item.value))]
                //获取缩放比例
                this.tagList.map((item)=>{
                    let new_item = {
                        name:item.name,
                        fontSize:this.linearMap(item.value, domain, this.sizeRange)+"px",
                    }
                    this.tagListTemp.push(new_item)
                })
            },
            jumpToArticlePage(tagName){
                this.$router.push({name:'tagArticle',query:{tagName:tagName}})
            },
        },
        watch:{
            tagList:'resizeFont'
        },
        data(){
            return {
                tagListTemp: this.tagList,
            }
        }
    }
</script>

<style scoped>
    .tag-container{
    }
    .tag-link{
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        position: relative;
        text-decoration: none;
        outline: 0;
        padding: 0;
        transform: scale(1.0, 1.0);
        transition: 500ms;
    }
    .tag-link:hover{
        text-shadow: 5px 5px 2px rgba(100, 100, 100, 0.6);
        transform: scale(1.2, 1.2);
        transition: 500ms;
        cursor: pointer;
    }
</style>