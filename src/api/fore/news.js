import ajax from '@/interceptor/http'
import assetProxyUtils from "@/utils/assetProxy";
const newsAPI = {
    /**
     *
     * @param pageNum
     * @param pageSize
     * @returns {Promise<unknown>}
     */
    getNews(pageNum, pageSize){
        let url="/fore/news/list?pageNum="+pageNum+"&pageSize="+pageSize
        return new Promise(((resolve, reject) => {
            ajax.get(url).then(data=>{
                data.list.forEach(value => {
                    value.content = assetProxyUtils.imageAddProxy(value.content)
                })
                resolve(data)
            },error=>reject(error))
        }))
    }
}
export default newsAPI