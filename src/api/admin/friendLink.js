import ajax from '@/interceptor/http'
import messageUtil from "@/utils/message";
const friendAPI = {
    deleteFriendLink(token, id){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/friend/link?id="+id
                ajax.delete(url,{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("删除友链成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    updateFriendLink(token, friendLink){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/friend/link"
                ajax.put(url, friendLink, {headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("更新友链成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    addFriendLink(token, friendLink){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/friend/link"
                ajax.post(url, friendLink, {headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("新增友链成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 分页查看友链
     * @param token
     * @param pageNum
     * @param pageSize
     * @param searchValue
     * @param orderProperty
     * @param orderDirection
     * @returns {Promise<never>|Promise<unknown>}
     */
    getFriendLinkList(token, pageNum, pageSize, searchValue, orderProperty, orderDirection){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/friend/link/list?pageNum="+ pageNum+
                    "&pageSize="+ pageSize+
                    "&searchValue="+ searchValue+
                    "&orderProperty="+orderProperty+
                    "&orderDirection="+orderDirection
                ajax.get(url,{headers:{Authorization:token}}).then(data=>resolve(data),reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
}

export default friendAPI