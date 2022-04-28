import ajax from '@/interceptor/http'
import messageUtil from "@/utils/message";
const articleCommentAPI = {
    /**
     * 分页获取评论列表
     * @param articleId
     * @param pageNum
     * @param pageSize
     */
    getArticleCommentList(articleId, pageNum, pageSize) {
        let url="/fore/article/comment/list?articleId="+articleId+"&pageNum="+pageNum+"&pageSize="+pageSize
        return new Promise((resolve,reject) => {
            ajax.get(url).then(data=>{
                resolve(data)
            },error=>{
                reject(error)
            })
        })
    },
    /**
     * 提交评论
     * @param token
     * @param content
     * @returns {Promise<unknown>}
     */
    submitArticleComment(token, content) {
        if (token != null) {
            let url = "/fore/article/comment"
            return new Promise((resolve, reject) => {
                ajax.post(url, content, {headers: {Authorization: token}}).then(data => {
                    messageUtil.success('已成功提交评论，待审核后将会予以展示。')
                    resolve(data)
                },error=>{
                    reject(error)
                })
            })
        }else{
            messageUtil.error("请先登录，登录后再发表评论！")
            return Promise.reject("no token")
        }
    }
}

export default articleCommentAPI