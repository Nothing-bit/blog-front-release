<template>
    <div>
        <el-card>
            <el-row :gutter="10">
                <!--            第一列-->
                <el-col :lg={span:8}>
                    <h1>首页信息</h1>
                    <el-divider></el-divider>
                    <el-form>
                        <el-form-item label="签名">
                            <el-tooltip content="个性签名">
                                <el-input v-model="settings.signature"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="音乐插件URL">
                            <el-tooltip content="网易云音乐">
                                <el-input v-model="settings.musicURL"></el-input>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="公告">
                            <el-tooltip content="公告展示在首页公告区">
                                <el-input v-model="settings.notice" type="textarea" rows="6" resize="none"></el-input>
                            </el-tooltip>
                        </el-form-item>
                    </el-form>
                </el-col>
                <!--            第二列-->
                <el-col :lg={span:8}>
                    <h1>系统配置</h1>
                    <el-divider></el-divider>
                    <el-form>
                        <el-form-item label="邮件通知地址">
                            <el-tooltip content="当有新回复、评论和留言将会发送邮件到配置地址进行提醒">
                                <el-input v-model="settings.mailAddress"></el-input>
                            </el-tooltip>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <ckeditor :editor="editor" v-model="settings.myInfo"  :config="editorConfig"></ckeditor>
            </el-row>
            <div style="text-align: center;margin-top: 10px;">
                <el-button class="el-button--primary" @click="updateSetting">保存</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'
    import {Notification} from 'element-ui'
    import CKEditor from "@ckeditor/ckeditor5-vue";
    import Editor from "@ckeditor/ckeditor5-build-classic";
    export default {
        name: "other",
        data(){
            return{
                editor:Editor,
                settings:{
                    notice:'',
                    signature:'',
                    mailAddress:'',
                    musicURL:'',
                    myInfo:""
                },
                headerConfig:{
                    headers:{
                        Authorization:''
                    }
                },
                editorConfig:{
                    language:'zh-cn',
                    codeBlock:{
                        languages:[
                            {language: 'java',label: 'Java'},
                            {language: 'javascript',label: 'JavaScript'},
                            {language: 'sql', label: 'SQL'},
                            {language: 'python', label: 'Python'},
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
                },
            }
        },
        methods:{
            updateSetting(){
                let url=this.baseUrl+"/admin/setting/all"
                axios.put(url,this.settings,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        Notification({
                            title:"提示",
                            message:'保存设置成功！',
                            type:'success'
                        })
                    }else{
                        Notification({
                            title:"提示",
                            message:'保存设置失败！',
                            type:'error'
                        })
                    }
                })
            },
            getSettingAll(){
                let url=this.baseUrl+"/admin/setting/all"
                axios.get(url,this.headerConfig).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        let data =result.data;
                        this.settings=data;
                    }else{
                        Notification({
                            title:'提示',
                            message:'获取设置项错误！',
                            type:'error'
                        })
                    }
                })

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
            this.getToken()
            this.getSettingAll()
            document.title="Blog后台|其他设置"
        }
    }
</script>

<style scoped>

</style>