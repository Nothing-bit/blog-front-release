import {Notification} from "element-ui";

/**
 * 封装消息通知函数
 * @type {{}}
 */
const notifyUtil = {
    success(title, content){
        Notification({
            title: title,
            message: content,
            dangerouslyUseHTMLString: true,
            type:'success',
            offset: 60
        })
    },
    error(title, content){
        Notification({
            title: title,
            message: content,
            dangerouslyUseHTMLString: true,
            type:'error',
            offset: 60
        })
    }
}
export default notifyUtil