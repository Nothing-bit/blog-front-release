import axios from 'axios'
import messageUtil from "@/utils/message";
import baseURL from "@/config/baseURL";
const ajax = axios.create(
    {
        baseURL:baseURL,
        timeout: 1000 * 15 // 请求超时时间
    }
)
/**
 * 拦截器
 */
ajax.interceptors.response.use(
    response=>{
        let result = response.data
        if(result.code !== 200){
            messageUtil.error(result.msgCN)
            return Promise.reject(result.msgCN)
        }else{
            if(result.data==null){
                return Promise.resolve(result)
            }
            return Promise.resolve(result.data)
        }
    },error => {
        return Promise.reject(error)
    }
)
export default ajax