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
<!--                    <el-form>-->
<!--                        <el-form-item label="邮件通知地址">-->
<!--                            <el-tooltip content="当有新回复、评论和留言将会发送邮件到配置地址进行提醒">-->
<!--                                <el-input v-model="settings.mailAddress"></el-input>-->
<!--                            </el-tooltip>-->
<!--                        </el-form-item>-->
<!--                    </el-form>-->
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
                <el-button class="el-button--primary" @click="updateSettingAll">保存</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import CKEditor from "@ckeditor/ckeditor5-vue";
    import Editor from "@ckeditor/ckeditor5-build-classic";
    import tokenName from "@/config/tokenName";
    import settingAPI from "@/api/admin/setting";
    import baseURL from "@/config/baseURL";
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
                editorConfig:{
                    language:'zh-cn',
                    codeBlock:{
                        languages:this.languages
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
                        //上传图片配置
                        uploadUrl:baseURL+"/admin/upload/images",
                        headers:{
                            Authorization:'',
                            baseURL:baseURL
                        }
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
            updateSettingAll(){
              settingAPI.updateSetting(this.token, this.settings).then(()=>{
                  this.$router.back()
              },reason => console.error(reason))
            },
            getSettingAll(){
                settingAPI.getSettingAll(this.token).then(data=>{
                    this.settings = data
                },reason => console.error(reason))
            },
            getToken(){
                let token = this.$cookies.get(tokenName.admin)
                if(token==null){
                    this.$router.push("/admin/login")
                }else{
                    this.editorConfig.simpleUpload.headers.Authorization=token
                    this.token = token
                }
            }
        },
        components:{
            ckeditor:CKEditor.component
        },
        created(){
            this.getToken()
            this.getSettingAll()
        }
    }
</script>

<style scoped>

</style>