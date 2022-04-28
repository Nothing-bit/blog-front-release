import ajax from '@/interceptor/http'
const archiveAPI = {
    getArchiveList(pageNum, pageSize) {
        let url="/fore/archive/list?pageNum="+pageNum+"&pageSize="+pageSize;
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), error=>reject(error))
        })

    }
}
export default archiveAPI