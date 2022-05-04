<template>
    <div >
        <span  class="tag-link"  :style="{padding: padding, fontSize:item.fontSize, color:randomColor()}" v-for="(item, idx) in tagListTemp" v-bind:key=idx @click="jumpToArticlePage(item.name)">{{item.name}}</span>
    </div>
</template>
<script>
    import colorPanel from "@/config/colorPanel";

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
        },
        methods:{
            randomColor(){
                let color = colorPanel[Math.floor(Math.random() * colorPanel.length) ]
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