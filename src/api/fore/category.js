import ajax from '@/interceptor/http'
const categoryAPI = {
    getCategoryList(pageNum, pageSize){
        let url="/fore/category/list?pageNum="+pageNum+"&pageSize="+pageSize;
        return new Promise((resolve, reject) => {
            ajax.get(url).then(data=>resolve(data), error=>reject(error))
        })
    }
}

export default categoryAPI