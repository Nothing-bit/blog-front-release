import ajax from '@/interceptor/http'
import assetProxyUtils from "@/utils/assetProxy";
const indexAPI = {
    /**
     * 初始化首页数据
     * @returns {Promise<unknown>}
     */
    initIndexData(){
        let url="/fore/index/data"
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>{
                data.tagList=data.tagList.sort((a,b)=>b.value-a.value)
                resolve(data)
            },reason => reject(reason))
        })
    },
    /**
     * 获取关于页的自我介绍信息
     * @returns {Promise<unknown>}
     */
    getMyInfo() {
        let url="/fore/myInfo"
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>{
                data = assetProxyUtils.imageAddProxy(data)
                resolve(data)
            },reason => reject(reason))
        })
    }
}
export default indexAPI