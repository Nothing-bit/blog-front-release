import ajax from '@/interceptor/http'
import messageUtil from "@/utils/message";
import assetProxyUtils from "@/utils/assetProxy";
import baseURL from "@/config/baseURL";
const articleAPI = {
    /**
     * 后台管理分页获取日志列表
     * @param token
     * @param pageNum
     * @param pageSize
     * @param searchValue
     * @param orderProperty
     * @param orderDirection
     * @returns {Promise<never>|Promise<unknown>}
     */
    getArticleList(token, pageNum, pageSize, searchValue, orderProperty, orderDirection){
        if(token != null){
            let url="/admin/article/list?pageNum="+pageNum+
                "&pageSize="+pageSize+
                "&searchValue="+searchValue+
                "&orderProperty="+orderProperty+
                "&orderDirection="+orderDirection
            return new Promise((resolve, reject) => {
                ajax.get(url, {
                    headers:{
                        Authorization: token
                    }
                }).then(data=>{
                    data.list.forEach(value => {
                        value.pictureUrl = baseURL+value.pictureUrl
                    })
                    resolve(data)
                },reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 后台管理删除日志
     * @param token
     * @param articleId
     * @returns {Promise<never>|Promise<unknown>}
     */
    deleteArticle(token, articleId){
        if(token!=null) {
            let url = "/admin/article?id=" + articleId;
            return new Promise((resolve, reject) => {
                ajax.delete(url, {headers: {Authorization: token}}).then(data => {
                    messageUtil.success('id为：' + articleId + '的日志已被成功删除！')
                    resolve(data)
                }, error=>reject(error))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    addArticle(token, article) {
        if(token!=null) {
            let url = "/admin/article";
            article.pictureUrl = article.pictureUrl.replace(baseURL,"")
            article.content = assetProxyUtils.imageRemoveProxy(article.content)
            return new Promise((resolve, reject) => {
                ajax.post(url, article, {headers:{Authorization:token}}).then(()=>{
                    messageUtil.success("新增日志成功！")
                    resolve()
                },reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 获取日志内容
     * @param token
     * @param articleId
     * @returns {Promise<never>|Promise<unknown>}
     */
    getArticleDetail(token, articleId){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url = "/admin/article/detail?id="+articleId
                ajax.get(url,{headers:{Authorization: token}}).then(data=>{
                    data.pictureUrl = baseURL + data.pictureUrl
                    data.content = assetProxyUtils.imageAddProxy(data.content)
                    resolve(data)
                }, reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 上传封面
     * @param token
     * @param param
     * @returns {Promise<never>|Promise<unknown>}
     */
    uploadCover(token, param){
        if(token!=null){
            let url=param.action
            let formData=new FormData();
            let file=param.file
            formData.append("upload",file)
            return new Promise((resolve, reject) => {
                ajax.post(url,formData,{headers:{Authorization: token, baseURL:baseURL}}).then(data=>{
                    messageUtil.success("上传封面成功！")
                    resolve(data)
                },reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 更新日志
     * @param token
     * @param article
     * @returns {Promise<never>|Promise<unknown>}
     */
    updateArticle(token, article){
        if(token!=null){
            let url="/admin/article"
            article.pictureUrl = article.pictureUrl.replace(baseURL,"")
            article.content = assetProxyUtils.imageRemoveProxy(article.content)
            return new Promise((resolve, reject) => {
                ajax.put(url, article, {headers:{Authorization:token}}).then(()=>{
                    messageUtil.success("日志更新成功！")
                    resolve()
                },reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 自动更新
     * @param token
     * @param articleId
     * @param content
     * @returns {Promise<never>|Promise<unknown>}
     */
    autoSave(token, articleId, content){
        if(token!=null) {
            let url="/admin/article/content?id="+articleId
            content = assetProxyUtils.imageRemoveProxy(content)
            return new Promise((resolve, reject) => {
                ajax.put(url,content, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "text/plain"
                    }
                }).then(()=>{
                    messageUtil.success("内容已成功保存到服务器！")
                }, reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    }
}

export default articleAPI