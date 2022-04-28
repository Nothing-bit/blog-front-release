import ajax from "@/interceptor/http"
const friendLinkAPI = {
    /**
     * 获取全部的友链
     * @returns {Promise<unknown>}
     */
    getAllFriendLink(){
        let url="/fore/friend/link/all"
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), reason => reject(reason))
        })
    }
}
export default  friendLinkAPI