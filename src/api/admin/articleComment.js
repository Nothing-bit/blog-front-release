import ajax from "@/interceptor/http"
import messageUtil from "@/utils/message";

const articleCommentAPI = {
    submitReply(token, reply){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/article/comment/reply"
                ajax.post(url, reply,{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("回复评论成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    disableArticleComment(token, id) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/article/comment/disable?id="+id
                ajax.put(url, {},{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("隐藏评论成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    enableArticleComment(token, id) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/article/comment/enable?id="+id
                ajax.put(url,{},{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("展示评论成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    deleteArticleComment(token, id) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/article/comment?id="+id
                ajax.delete(url,{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("删除评论成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    getArticleCommentList(token, pageNum, pageSize, searchValue, orderProperty, orderDirection){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url = "/admin/article/comment/list?pageNum="+ pageNum+
                    "&pageSize="+ pageSize+
                    "&searchValue="+ searchValue+
                    "&orderProperty="+orderProperty+
                    "&orderDirection="+orderDirection
                ajax.get(url,{headers:{Authorization:token}}).then(data=>resolve(data),reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    }
}
export default articleCommentAPI