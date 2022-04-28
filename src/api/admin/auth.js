import ajax from '@/interceptor/http'

const auth = {

    login(adminUser){
        let url="/admin/login"
        return new Promise((resolve, reject) => {
            ajax.post(url, adminUser).then(data=>resolve(data), reason => reject(reason))
        })
    },
    check(token){
        if(token!=null){
            let url="/admin/check"
            return new Promise((resolve, reject) => {
                ajax.get(url,{headers:{Authorization:token}}).then(data=>resolve(data),()=>reject())
            })
        }else{
            return Promise.reject("no token")
        }
    }
}
export default auth