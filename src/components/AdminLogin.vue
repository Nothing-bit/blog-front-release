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
                            <el-checkbox v-model="adminUser.trusted">记住我</el-checkbox>
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
    import userInfoAPI from "@/api/fore/auth";
    import tokenName from "@/config/tokenName";
    import messageUtil from "@/utils/message";
    import notifyUtil from "@/utils/notify";
    import authAPI from "@/api/admin/auth";
    export default {
        name: "Login",
        data(){
            return{
                adminUser:{
                    username:'',
                    password:'',
                    trusted:false,
                },

            }
        },
        components:{
        },
        methods:{
            login(){
                // console.log(this.adminUser)
                authAPI.login(this.adminUser).then(data=>{
                    messageUtil.success("登录成功！")
                    this.$router.push("/admin/article/list")
                    this.$cookies.set(tokenName.admin,data.token,60*60*24*data.expire)
                },reason => console.error(reason))
            }
        },
        created(){
            authAPI.check(this.$cookies.get(tokenName.admin)).then(data=>{
                notifyUtil.success("Hello", "欢迎回来，管理员<strong>"+data.username+"</strong>")
                this.$router.push("/admin/article/list")
            })
        }
    }
</script>

<style scoped>

</style>