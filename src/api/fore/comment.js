import ajax from '@/interceptor/http'
import messageUtil from "@/utils/message";
const commentAPI = {
    /**
     * 提交留言
     * @param token
     * @param content
     * @returns {Promise<unknown>}
     */
    submitComment(token, content){
        if(token!=null){
            let url = '/fore/comment'
            return new Promise((resolve, reject) => {
                ajax.post(url, content, {headers:{Authorization:token}}).then(data=>{
                    messageUtil.success('已成功提交留言，待审核后将会予以展示。')
                    resolve(data)
                },reason => reject(reason))
            })
        }else{
            messageUtil.error("请先登录，登录后再发表留言！")
            return Promise.reject("no token")
        }
    },
    /**
     * 分页获取留言列表
     * @param pageNum
     * @param pageSize
     * @returns {Promise<unknown>}
     */
    getCommentList(pageNum, pageSize){
        let url = "/fore/comment/list?pageNum="+pageNum+"&pageSize="+pageSize
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), reason => reject(reason))
        })
    }

}

export default commentAPI