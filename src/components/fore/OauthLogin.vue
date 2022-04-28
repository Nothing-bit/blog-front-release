<template>
    <p>{{info}}</p>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "OauthLogin",
        data(){
            return {
                info:'验证第三方登录中，请稍后~~~'
            }
        },
        methods:{

        },
        created(){
            let platform = this.$route.params.platform
            let code = this.$route.query.code
            let state = this.$route.query.state
            let url = this.baseUrl+"/oauth/callback/"+platform
            axios.post(url,{
                code:code,
                state:state
            }).then(res=>{
                let result = res.data
                if(result.code==200){
                    this.info = "验证成功，即将跳转回首页！"
                    this.$parent.getUserInfo()
                }
            })
        }
    }
</script>

<style scoped>
</style>