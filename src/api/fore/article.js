import ajax from '@/interceptor/http'
import assetProxyUtils from "@/utils/assetProxy";

const articleAPI = {
    /**
     * 分页获取日志列表
     * @param pageNum
     * @param pageSize
     * @returns {Promise<unknown>}
     */
    getArticleList(pageNum, pageSize){
        let url = "/fore/article/list?pageNum="+pageNum+"&pageSize="+pageSize;
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), error => reject(error))
        })
    },
    /**
     * 按照分类id分页获取日志列表
     * @param categoryId
     * @param pageNum
     * @param pageSize
     * @returns {Promise<unknown>}
     */
    getArticleListByCategoryId(categoryId, pageNum, pageSize){
        let url = "/fore/category/article/list?categoryId="+categoryId+"&pageNum="+pageNum+"&pageSize="+pageSize
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), reason => reject(reason))
        })
    },
    /**
     * 按照月份获取日志列表
     * @param month
     * @param pageNum
     * @param pageSize
     */
    getArticleListByMonth(month, pageNum, pageSize) {
        let url = "/fore/archive/article/list?month=" +month+"&pageNum="+pageNum+"&pageSize="+pageSize;
        return new Promise(((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), reason => reject(reason))
        }))
    },
    /**
     * 按照标签名获取日志列表
     * @param tagName
     * @param pageNum
     * @param pageSize
     * @returns {Promise<unknown>}
     */
    getArticleListByTagName(tagName, pageNum, pageSize){
        let url = "/fore/tag/article/list?tagName="+tagName+"&pageNum="+pageNum+"&pageSize="+pageSize
        return new Promise(((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), reason => reject(reason))
        }))
    },
    /**
     * 获取日志具体信息
     * @param articleId
     * @returns {Promise<unknown>}
     */
    getArticleDetail(articleId){
        let url = "/fore/article/detail?id="+articleId
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>{
                data.content = assetProxyUtils.imageAddProxy(data.content)
                resolve(data)
            }, reason => reject(reason))
        })
    },
    /**
     * 按照标题搜索内容
     * @param value
     * @returns {Promise<unknown>}
     */
    queryArticle(value) {
        let url = "/fore/article/all?searchValue="+value
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), reason => reject(reason))
        })
    }
}

export default articleAPI;