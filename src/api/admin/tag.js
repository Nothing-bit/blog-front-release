import ajax from '@/interceptor/http'
import messageUtil from "@/utils/message";
const tagAPI = {
    /**
     * 获取所有标签
     * @param token
     * @returns {Promise<never>|Promise<unknown>}
     */
    getTagAll(token) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/tag/all"
                ajax.get(url, {headers:{Authorization: token}}).then(data=>resolve(data), reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }

    },
    deleteTag(token, tagId){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/tag?id="+tagId
                ajax.delete(url,{headers:{Authorization:token}}).then(
                ()=>{
                    messageUtil.success("删除标签成功!")
                    resolve()
                },reason => reject(reason)
            )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    updateTag(token, tag){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/tag"
                ajax.put(url, tag, {headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("更新标签成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    addTag(token, tag){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/tag"
                ajax.post(url, tag, {headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("新增标签成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 分页查看标签
     * @param token
     * @param pageNum
     * @param pageSize
     * @param searchValue
     * @param orderProperty
     * @param orderDirection
     * @returns {Promise<never>|Promise<unknown>}
     */
    getTagList(token, pageNum, pageSize, searchValue, orderProperty, orderDirection){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/tag/list?pageNum="+ pageNum+
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
    deleteArticleTag(token, title, articleId, tagId) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url = "/admin/article/tag?articleId=" + articleId + "&tagId=" + tagId;
                ajax.delete(url, {headers: {Authorization: token}}).then(
                    () => {
                        messageUtil.success("删除标签成功!")
                        resolve()
                    }, reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    }
}

export default tagAPI