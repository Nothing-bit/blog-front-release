<template>
    <el-card>
        <h1>修改日志</h1>
        <el-form label-position="top" class="form">
            <el-form-item label="标题" style="width: 50%;">
                <el-input type="text" v-model="article.title" show-word-limit maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="简述" style="width: 50%">
                <el-input type="textarea" v-model="article.summary" resize="none" rows="6" show-word-limit maxlength="300"></el-input>
            </el-form-item>
            <el-form-item label="封面" style="width: 20%">
                <el-upload class="uploader"
                           :action="uploadUrl"
                           :limit=1
                           :http-request="upload"
                           accept="image/jpeg,image/png">
                    <img class="cover" v-if="article.pictureUrl" :src="article.pictureUrl">
                    <i v-else class="el-icon-plus uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-row>
                <el-col :lg="3">
                    <el-form-item label="分类">
                        <el-select v-model="article.categoryId" filterable placeholder="请选择">
                            <el-option v-for="item in categoryList" :value="item.id" :label="item.name" v-bind:key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="3">
                    <el-form-item label="标签">
                        <el-select v-model="article.tagList" filterable placeholder="请选择" allow-create multiple>
                            <el-option v-for="item in tagList" :value="item.name" :label="item.name" v-bind:key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg={span:3}>
                    <el-form-item label="置顶">
                        <el-radio-group v-model="article.top">
                            <el-radio  :label="true">是</el-radio>
                            <el-radio  :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :lg={span:3}>
                    <el-form-item label="隐藏">
                        <el-radio-group v-model="article.privated">
                            <el-radio  :label="true">是</el-radio>
                            <el-radio  :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :lg={span:3}>
                    <el-form-item label="点击量">
                        <el-input-number v-model="article.traffic"></el-input-number>
                    </el-form-item>
                </el-col>
                <el-col :lg="3">
                    <el-form-item label="首次创建">
                        <el-date-picker
                                v-model="article.createBy"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetime"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :lg="3">
                    <el-form-item label="最后修改">
                        <el-date-picker
                                v-model="article.modifiedBy"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="内容">
                <ckeditor :editor="editor" v-model="article.content"  :config="editorConfig"></ckeditor>
            </el-form-item>
        </el-form>
        <div class="button-container">
            <el-button class="el-button--primary" @click="submit">提 交</el-button><el-button @click="back">返 回</el-button>
        </div>
        <div  class="el-backtop animate__animated animate__rollIn"  style="bottom: 190px;right: 40px" @click="submit">
            <i class="el-icon-check"></i>
        </div>
        <div  class="el-backtop animate__animated animate__rollIn"  style="bottom: 140px;right: 40px" @click="back">
            <i class="el-icon-close"></i>
        </div>
    </el-card>
</template>
<script>
    import CKEditor from "@ckeditor/ckeditor5-vue"
    import Editor from '@ckeditor/ckeditor5-build-classic';
    import axios from 'axios'
    import {Notification} from 'element-ui'
    let staticToken;
    let staticArticleId;
    let staticBaseUrl;
    export default {
        name: "ArticleUpdate",
        data(){
            return {
                uploadUrl:this.baseUrl+"/admin/upload/images",
                editor:Editor,
                editorConfig:{
                    language:'zh-cn',
                    codeBlock:{
                        languages:[
                            {language: 'bash', label: 'Bash'},
                            {language: 'java',label: 'Java'},
                            {language: 'javascript',label: 'JavaScript'},
                            {language: 'python', label: 'Python'},
                            {language: 'sql', label: 'SQL'},
                            {language: 'html',label: 'HTML'},
                            {language: 'css',label: 'CSS'},
                            {language: 'xml',label: 'XML'},
                            { language: 'c', label: 'C' },
                            {language: 'c++', label: 'C++'},
                            {language: 'json',label: 'JSON'}
                        ]
                    },
                    image: {
                        toolbar: [
                            'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                            '|',
                            'resizeImage',
                            '|',
                            'imageTextAlternative'
                        ],
                        styles: [
                            'full',
                            'side',
                            'alignLeft',
                            'alignCenter',
                            'alignRight'
                        ]
                    },
                    table: {
                        contentToolbar: [
                            'tableColumn',
                            'tableRow',
                            'mergeTableCells',
                            'tableCellProperties',
                            'tableProperties'
                        ]
                    },
                    simpleUpload:{
                        headers:{
                            Authorization:''
                        },
                        uploadUrl: this.baseUrl+"/admin/upload/images"
                    },
                    // fontFamily: {
                    //     supportAllValues: true
                    // },
                    toolbar: {
                        items: [
                            'undo',
                            'redo',
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'subscript',
                            'superscript',
                            'removeFormat',
                            '|',
                            'fontSize',
                            'fontFamily',
                            'fontColor',
                            'fontBackgroundColor',
                            'highlight',
                            '|',
                            'imageUpload',
                            'blockQuote',
                            'insertTable',
                            'codeBlock',
                            'htmlEmbed',
                            'specialCharacters',
                            '|',
                            'link',
                            'anchor',
                            'bulletedList',
                            'numberedList',
                            'todoList',
                            '|',
                            'alignment',
                            'outdent',
                            'indent',
                            'horizontalLine',
                        ],
                        shouldNotGroupWhenFull: true
                    },
                    blockToolbar: [
                        'paragraph', 'heading1', 'heading2', 'heading3',
                        '|',
                        'bulletedList', 'numberedList',
                        '|',
                        'blockQuote', 'uploadImage'
                    ],
                    //auto save
                    autosave:{
                        waitingTime:10000,
                        save(editor){
                            let url=staticBaseUrl+"/admin/article/content?id="+staticArticleId
                            axios.put(url,editor.getData(),{
                                headers:{
                                    Authorization:staticToken,
                                    "Content-Type":"text/plain"
                            }
                            }).then(res=>{
                                let result=res.data
                                if(result.code==200){
                                    Notification({
                                        title:'提示',
                                        message:'内容已同步至服务端！',
                                        type:'success',
                                        duration:5000,
                                        showClose:false,
                                        position:'top-right'
                                    })
                                }else{
                                    Notification({
                                        title:'提示',
                                        message:'同步内容出错！',
                                        type:'error',
                                        duration:5000,
                                        showClose:false,
                                        position:'top-right'
                                    })
                                }
                            })

                        },
                    }
                },
                article:{//需要提交的Article
                    title:'',
                    summary:'',
                    content:'',
                    traffic:0,
                    categoryId:'',
                    top:false,
                    privated:false,
                    pictureUrl:'',
                    tagList:[],
                    createBy:'',
                    modifiedBy:''
                },
                categoryList:[],
                tagList:[],
                //headerConfig
                headerConfig:{
                    headers:{
                        Authorization:'',
                    }
                }
            }
        },
        methods:{
            initArticle(){
                let id=this.$route.query.id;
                let url=this.baseUrl+"/admin/article/detail?id="+id
                axios.get(url,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.article=data;
                        // console.log(data)
                    }else{
                        Notification({
                            title:"提示",
                            message:'获取id为'+id+"的日志信息失败！",
                            type:'error'
                        })
                    }
                })
            },
            getTagList(){
                let url=this.baseUrl+"/admin/tag/all"
                axios.get(url,this.headerConfig).then(res=>{
                    let result= res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.tagList=data;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取标签列表失败！',
                            type:'error'
                        })
                    }
                })
            },
            getCategoryList(){
                let url=this.baseUrl+"/admin/category/all"
                axios.get(url,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.categoryList=data;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取分类列表失败！',
                            type:'error'
                        })
                    }
                })
            },
            upload(param){
                let url=param.action
                let formData=new FormData();
                let file=param.file
                formData.append("upload",file)
                console.log(formData)
                axios.post(url,formData,this.headerConfig).then((res)=>{
                    let result=res.data;
                    if(result.code==200){
                        let url=result.url
                        this.article.pictureUrl=url;
                        Notification({
                            title:'提示',
                            message:'上传封面成功！',
                            type:'success'
                        })
                    }else{
                        Notification({
                            title:'提示',
                            message:'上传封面出错!',
                            type:'error'
                        })
                    }
                })
            },
            submit(){
                // console.log(this.article)
                if(this.article.title==''){
                    Notification({
                        title:'提示',
                        message:'请填写标题',
                        type:'warning'
                    })
                }else if(this.article.summary==''){
                    Notification({
                        title:'提示',
                        message:'请填写简述',
                        type:'warning'
                    })
                }else if(this.article.categoryId==''){
                    Notification({
                        title:'提示',
                        message:'请选择分类',
                        type:'warning'
                    })
                }else if(this.article.pictureUrl==''){
                    Notification({
                        title:'提示',
                        message:'请上传封面',
                        type:'warning'
                    })
                }else if(this.article.content==''){
                    Notification({
                        title:'提示',
                        message:'请填写内容',
                        type:'warning'
                    })
                }else if(this.article.tagList==''){
                    Notification({
                        title:'提示',
                        message:'请选择标签',
                        type:'warning'
                    })
                }else{
                    let url=this.baseUrl+"/admin/article"
                    axios.put(url,this.article,this.headerConfig).then(res=>{
                        let result=res.data;
                        if(result.code==200){
                            Notification({
                                title:'提示',
                                message:'日志已成功更新！',
                                type:'success'
                            })
                            this.back()
                        }else{
                            Notification({
                                title:'提示',
                                message:'日志更新失败！',
                                type:'error'
                            }
                            )
                        }
                    })
                }
            },
            back(){
                this.$router.back();
            },
            getToken(){
                let token=this.$cookies.get("zBlogAdminToken")
                if(token!=null){
                    this.headerConfig.headers.Authorization=token
                    this.editorConfig.simpleUpload.headers.Authorization=token
                }else{
                    this.$router.push("/admin/login")
                }
            }
        },
        components:{
            ckeditor:CKEditor.component
        },
        created(){
            staticToken=this.$cookies.get("zBlogAdminToken");
            staticArticleId=this.$route.query.id
            staticBaseUrl=this.baseUrl
            this.getToken()
            this.initArticle()
            this.getCategoryList()
            this.getTagList()
        }
    }
</script>

<style scoped>
    >>> .ck-content {
        min-height: 500px;
        border:solid 1px rgb(201,201,201);
    }
    .form{
    }
    .button-container{
        text-align: center;
        padding-top:20px;
    }
    .uploader{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .uploader:hover {
        border-color: #409EFF;
    }
    .uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .cover {
        width: 200px;
        display: block;
    }

</style>