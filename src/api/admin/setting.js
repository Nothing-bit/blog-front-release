import ajax from '@/interceptor/http'
import assetProxyUtils from "@/utils/assetProxy";
import messageUtil from "@/utils/message";
const settingAPI = {
    getSettingAll(token) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url = "/admin/setting/all"
                ajax.get(url, {headers:{Authorization: token}}).then(data=> {
                    data.myInfo = assetProxyUtils.imageAddProxy(data.myInfo)
                    resolve(data)
                }, reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    },
    updateSetting(token, settings) {
        if(token!=null){
            return new Promise((resolve, reject) => {
                let url="/admin/setting/all"
                settings.myInfo = assetProxyUtils.imageRemoveProxy(settings.myInfo)
                ajax.put(url, settings,{headers:{Authorization: token}}).then(data=> {
                    messageUtil.success("更新设置成功！")
                    resolve(data)
                }, reason => reject(reason))
            })
        }else{
            return Promise.reject("no token")
        }
    }
}

export default settingAPI