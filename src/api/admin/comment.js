import ajax from "@/interceptor/http"
import messageUtil from "@/utils/message";

const commentAPI = {
    submitReply(token, reply){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/comment/reply"
                ajax.post(url, reply,{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("回复留言成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    disableComment(token, id) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/comment/disable?id="+id
                ajax.put(url, {},{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("隐藏留言成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    enableComment(token, id) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/comment/enable?id="+id
                ajax.put(url,{},{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("展示留言成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    deleteComment(token, id) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/comment?id="+id
                ajax.delete(url,{headers:{Authorization:token}}).then(
                    ()=>{
                        messageUtil.success("删除留言成功!")
                        resolve()
                    },reason => reject(reason)
                )
            })
        }else{
            return Promise.reject("no token")
        }
    },
    getCommentList(token, pageNum, pageSize, searchValue, orderProperty, orderDirection){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url = "/admin/comment/list?pageNum="+ pageNum+
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
export default commentAPI