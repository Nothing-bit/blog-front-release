import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import vueCookie from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'
import hljs from "highlight.js/lib/core"
import 'highlight.js/styles/atom-one-light.css'
import {lineNumbersBlock} from "@/assets/js/highlight-line-number"
import { Message } from 'element-ui';
import copy from 'copy-to-clipboard';
//按需加载代码高亮组件
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
hljs.registerLanguage('html', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('c', require('highlight.js/lib/languages/c'))
hljs.registerLanguage('c++', require('highlight.js/lib/languages/cpp'))
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
//富文本插件代码块的配置属性
Vue.prototype.languages=[
    {language: 'bash', label: 'Bash'},
    {language: 'java',label: 'Java'},
    {language: 'javascript',label: 'JavaScript'},
    {language: 'python', label: 'Python'},
    {language: 'sql', label: 'SQL'},
    {language: 'html',label: 'HTML'},
    {language: 'css',label: 'CSS'},
    {language: 'xml',label: 'XML'},
    { language: 'c', label: 'C' },
    {language: 'c++', label: 'C++'},
    {language: 'json',label: 'JSON'}
]
Vue.use(ElementUI)
Vue.use(vueCookie)
//过滤所有的高亮模块
Vue.directive('highlight', {
    update(el){
        let blocks = el.querySelectorAll('pre code');
        blocks.forEach((block)=>{
            if(block.hasAttribute("highlighted")){
                return
            }
            block.setAttribute("highlighted","")
            let code = block.innerHTML// block.innerHTML="<div><span style='margin-right: 10px;padding: 3px;border: #107ded solid 1px;color:#107ded;border-radius: 5px'>"+ "test"+"</span><button>复制</button>"+block.innerHTML+"</div>"
            hljs.highlightElement(block)
            lineNumbersBlock(block)
            block.innerHTML="<div><div style='padding: 5px 0px 10px 20px; vertical-align: center'><button class='el-button el-button--default el-button--mini' style='border-radius: 5px'>复制</button></div>"+block.innerHTML+"</div>"
            let copyButton = block.querySelector('button')
            if(copyButton!=null){
                copyButton.onclick = function (){
                    copy(code)
                    Message.success({message:"复制成功！", offset:100})
                }
            }
        })
    }
})
// //过滤所有ck content的区域，为图片添加baseURL
// Vue.directive('proxy',{
//     watch(el){
//         let images = el.querySelectorAll('img');
//         images.forEach((image)=>{
//             if(image.hasAttribute('acted')){
//                 return
//             }
//             // console.log(image)
//             let url=image.getAttribute("src")
//             //非外部资源图片需要代理
//             if(url.indexOf("http")==-1){
//                 url=Vue.prototype.baseUrl+url
//             }
//             image.setAttribute("src",url)
//             image.setAttribute('acted','')
//         })
//     }
// })

import router from "./router.js";

// Vue.config.devtools = true;
Vue.prototype.baseUrl="https://www.zhoujianguo.ltd:8080"
new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount("#app")
