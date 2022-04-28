import ajax from '@/interceptor/http'
const authAPI = {
    /**
     * 根据token获取用户信息
     * @param token
     * @returns {Promise<unknown>}
     */
    check(token){
        if(token!=null){
            let url="/oauth/check"
            return new Promise((resolve, reject) => {
                ajax.get(url,{headers:{Authorization:token}}).then(data=>resolve(data),()=>reject())
            })
        }else{
            return Promise.reject("no token")
        }
    }
}
export default authAPI