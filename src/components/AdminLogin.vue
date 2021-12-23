<template>
    <div @keypress.enter="login">
        <el-row :gutter="10">
            <el-col :lg="{span:8,offset:8}">
                <el-card >
                    <h2>后台管理登录</h2>
                    <el-form>
                        <el-form-item  label="用户名">
                            <el-input v-model="adminUser.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="adminUser.password" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox v-model="save">记住我</el-checkbox>
                        </el-form-item>
                    </el-form>
                    <div style="text-align: center;">
                        <el-button class="el-button--primary" @click="login">登录</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Login",
        data(){
            return{
                adminUser:{
                    username:'',
                    password:''
                },
                save:false,

            }
        },
        components:{
        },
        methods:{
            getSave(){
                if(this.$cookies.get('zBlogAdminSave')!=null)
                    this.adminUser=this.$cookies.get('zBlogAdminSave')
            },
            login(){
                if(this.save){
                    this.$cookies.set('zBlogAdminSave',this.adminUser,60*60*24*7)
                }else{
                    this.$cookies.remove('zBlogAdminSave')
                }
                let url=this.baseUrl+"/admin/login"
                axios.post(url,this.adminUser).then(res=>{
                    let result=res.data;
                    if(result.code==200){
                        let data=result.data;
                        this.$cookies.set('zBlogAdminToken',data.token,60*60*24*7)
                        this.$message({
                            type:'success',
                            message:'登录成功!'
                        })
                        this.$router.push('/admin/article/list')
                    }else{
                        this.$message({
                            type:'error',
                            message:'登录失败，检查用户名或者密码！'
                        })
                    }
                })
            }
        },
        created(){
            this.getSave()
        }
    }
</script>

<style scoped>

</style>