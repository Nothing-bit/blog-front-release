import {Message} from "element-ui";
const messageUtil = {
    success(content){
        Message.success({
            message:content,
            offset:100
        })
    },
    warn(content){
      Message.warning({
          message:content,
          offset:100
      })
    },
    error(content){
        Message.error({
            message:content,
            offset:100
        })
    }
}

export default messageUtil