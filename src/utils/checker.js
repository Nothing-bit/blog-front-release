import messageUtil from "@/utils/message";
const checkerUtil = {
    emailChecker(email){
        let filter = /^\w{3,}@\w{2,}\.(com|cn|net|com\.cn)$/;
        if(filter.test(email)==false){
            messageUtil.error("请输入格式正确的邮件地址!")
            return false;
        }else{
            return true;
        }
    },
    contentChecker(content){
        return content.trim().length>2
    },
    articleChecker(article){
        if(article.title.trim().length==0){
            messageUtil.warn("请填写标题")
        }else if(article.summary.trim().length==0){
            messageUtil.warn("请填写内容")
        }else if(article.categoryId==''){
            messageUtil.warn("请选择分类")
        }else if(article.pictureUrl.trim().length==0){
            messageUtil.warn('请上传封面')
        }else if(article.content.trim().length==0){
            messageUtil.warn('请填写内容')
        }else if(article.tagList.length==0){
            messageUtil.warn('请选择标签')
        }else{
            return true
        }
        return false
    },
    categoryChecker(category){
        if(category.name.trim().length==0){
            messageUtil.warn("请填写有效的分类名")
        }else{
            return true
        }
        return false
    },
    tagChecker(tag){
        if(tag.name.trim().length==0){
            messageUtil.warn("请填写有效的标签名")
        }else{
            return true
        }
        return false
    },
    friendLinkChecker(friendLink){
        if(friendLink.name.trim().length==0){
            messageUtil.warn("请填写有效的友链名称")
        }else if(/(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(friendLink.url.trim())==false){
            messageUtil.warn("请填写有效的URL路径")
        }else{
            return true
        }
        return false
    },
    newsChecker(news){
        if(news.content.toString().trim().length==0){
            messageUtil.warn('请填写内容')
        }else{
            return true
        }
        return false
    }
}

export  default  checkerUtil