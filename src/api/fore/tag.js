import ajax from '@/interceptor/http'
const tagAPI = {
    /**
     * 获取全部的标签
     * @returns {Promise<unknown>}
     */
    getTagAll(){
        let url="/fore/tag/cloud"
        return new Promise(((resolve, reject) => {
            ajax.get(url).then(data => resolve(data), error=>reject(error))
        }))
    }
}

export default tagAPI