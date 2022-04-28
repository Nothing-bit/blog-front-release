import ajax from '@/interceptor/http'
import messageUtil from "@/utils/message";
const categoryAPI = {
    /**
     * 获取全部分类
     * @param token
     * @returns {Promise<never>|Promise<unknown>}
     */
    getCategoryAll(token){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/category/all"
                ajax.get(url, {headers:{Authorization: token}}).then(data=>resolve(data), reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    updateCategory(token, category) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/category"
                ajax.put(url, category, {headers:{Authorization:token}}).then(()=>{
                    messageUtil.success("更新分类内容成功!")
                    resolve()
                }, reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 分页获取分类
     * @param token
     * @param pageNum
     * @param pageSize
     * @param searchValue
     * @param orderProperty
     * @param orderDirection
     * @returns {Promise<never>|Promise<unknown>}
     */
    getCategoryList(token, pageNum, pageSize, searchValue, orderProperty, orderDirection){
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url = "/admin/category/list?pageNum="+ pageNum+
                    "&pageSize="+ pageSize+
                    "&searchValue="+ searchValue.trim()+
                    "&orderProperty="+orderProperty+
                    "&orderDirection="+orderDirection
                ajax.get(url, {headers:{Authorization: token}}).then(data=>resolve(data), reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 添加新分类
     * @param token
     * @param category
     * @returns {Promise<never>|Promise<unknown>}
     */
    addCategory(token, category) {
        if(token!=null){
            let url = "/admin/category"
            return new Promise((resolve, reject) => {
                ajax.post(url, category, {headers:{Authorization:token}}).then(()=>{
                    messageUtil.success("新增分类成功!")
                    resolve()
                },reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    /**
     * 删除分类
     * @param token
     * @param categoryId
     * @returns {Promise<never>|Promise<unknown>}
     */
    deleteCategory(token, categoryId) {
        if(token!=null){
            let url = "/admin/category?id="+categoryId
            return new Promise((resolve, reject) => {
                ajax.delete(url, {headers:{Authorization:token}}).then(()=>{
                    messageUtil.success("删除分类成功!")
                    resolve()
                },reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    }
}
export default categoryAPI