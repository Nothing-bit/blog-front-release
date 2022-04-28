import baseURL from "@/config/baseURL";

/**
 * 静态资源代理类，为静态资源的相对路径补齐为绝对路径
 * @type {{imageProxy(*): *}}
 */
const assetProxyUtils={
    /**
     * 为图片资源添加baseURL
     * @param content
     * @returns {*}
     */
    imageAddProxy(content){
        return content.replace(/(?<=src=")\/images\//g,baseURL+'/images/')
        // return content
    },
    /**
     * 上传到后端前先去除baseURL
     * @param content
     * @returns {*}
     */
    imageRemoveProxy(content){
        let re = new RegExp("(?<=src=\")"+baseURL+"/images/","g")
        return content.replace(re,'/images/')
    }
}

export default assetProxyUtils