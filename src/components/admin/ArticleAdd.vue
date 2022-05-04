<template>
    <el-card>
        <h1>添加新日志</h1>
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
                <el-col :lg="4">
                    <el-form-item label="分类">
                        <el-select v-model="article.categoryId" filterable placeholder="请选择">
                            <el-option v-for="item in categoryList" :value="item.id" :label="item.name" v-bind:key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="4">
                    <el-form-item label="标签">
                        <el-select v-model="article.tagList" filterable placeholder="请选择" allow-create multiple>
                            <el-option v-for="item in tagList" :value="item.name" :label="item.name" v-bind:key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :lg="4">
                    <el-form-item label="置顶">
                        <el-radio-group v-model="article.top">
                            <el-radio  :label="true">是</el-radio>
                            <el-radio  :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :lg="4">
                    <el-form-item label="隐藏">
                        <el-radio-group v-model="article.privated">
                            <el-radio  :label="true">是</el-radio>
                            <el-radio  :label="false">否</el-radio>
                        </el-radio-group>
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
    import baseURL from "@/config/baseURL";
    import tagAPI from "@/api/admin/tag";
    import categoryAPI from "@/api/admin/category";
    import articleAPI from "@/api/admin/article";
    import checkerUtil from "@/utils/checker";
    import tokenName from "@/config/tokenName";
    import {languages} from "@/utils/highlightCustom"
    export default {
        name: "ArticleAdd",
        data(){
            return {
                uploadUrl:baseURL+"/admin/upload/images",
                editor:Editor,
                editorConfig: {
                    language:'zh-cn',
                    codeBlock:{
                        languages: languages()
                    },
                    image: {
                        toolbar: [
                            'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                            '|',
                            'resizeImage',
                            '|',
                            'imageTextAlternative',
                            '|',
                            'toggleImageCaption'
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
                            Authorization:'',
                            baseURL:baseURL
                        },
                        uploadUrl: baseURL+"/admin/upload/images"
                    },
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
                            'mediaEmbed',
                            'sourceEditing',
                            'specialCharacters',
                            '|',
                            'link',
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
                    tagList:[]
                },
                categoryList:[],
                tagList:[]
            }
        },
        methods:{
            getTagList(){
                tagAPI.getTagAll(this.token).then(data=>this.tagList=data, reason => console.error(reason))
            },
            getCategoryList(){
                categoryAPI.getCategoryAll(this.token).then(data=>this.categoryList=data, reason => console.error(reason))
            },
            upload(param){
                articleAPI.uploadCover(this.token, param).then(data=>this.article.pictureUrl=data.url,reason => console.error(reason))
            },
            submit(){
                if(checkerUtil.articleChecker(this.article)){
                    console.log(this.article)
                    articleAPI.addArticle(this.token, this.article).then(()=>this.back(), reason => console.log(reason))
                }
            },
            back(){
                this.$router.back();
            },
            getToken(){
                let token=this.$cookies.get(tokenName.admin)
                this.token = token
                if(token!=null){
                    this.editorConfig.simpleUpload.headers.Authorization=token
                }else{
                    this.$router.push("/admin/login")
                }
            },
        },
        components:{
            ckeditor:CKEditor.component
        },
        created(){
            this.getToken()
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