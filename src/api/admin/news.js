import ajax from '@/interceptor/http'
import messageUtil from "@/utils/message";
import assetProxyUtils from "@/utils/assetProxy";
const newsAPI = {
    deleteNews(token, id){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/news?id="+id
                ajax.delete(url,{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("删除随说成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    updateNews(token, news){
        if(token!=null){
            news.content = assetProxyUtils.imageRemoveProxy(news.content)
            return new Promise((resolve, reject) => {
                let url="/admin/news"
                ajax.put(url, news, {headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("更新随说成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    addNews(token, news){
        if(token!=null){
            news.content = assetProxyUtils.imageRemoveProxy(news.content)
            return new Promise((resolve, reject) => {
                let url="/admin/news"
                ajax.post(url, news, {headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("新增随说成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 分页查看随说
     * @param token
     * @param pageNum
     * @param pageSize
     * @param searchValue
     * @param orderProperty
     * @param orderDirection
     * @returns {Promise<never>|Promise<unknown>}
     */
    getNewsList(token, pageNum, pageSize, searchValue, orderProperty, orderDirection){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/news/list?pageNum="+ pageNum+
                    "&pageSize="+ pageSize+
                    "&searchValue="+ searchValue+
                    "&orderProperty="+orderProperty+
                    "&orderDirection="+orderDirection
                ajax.get(url,{headers:{Authorization:token}}).then(data=> {
                    data.list.forEach(item=>{
                        item.content = assetProxyUtils.imageAddProxy(item.content)
                    })
                    resolve(data)
                },reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
}

export default newsAPI