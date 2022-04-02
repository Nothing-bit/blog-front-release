import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import vueCookie from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'
import hljs from "highlight.js"
import  'highlight.js/styles/vs.css'
import { Message } from 'element-ui';
import copy from 'copy-to-clipboard';
Vue.use(ElementUI)
Vue.use(vueCookie)
Vue.use(hljs)
Vue.directive('highlight',function (el){
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
    // hljs.highlightElement(block)
        //判断是否已经加过行号
        if(block.innerHTML.indexOf("<ol>") == -1){
            let code = block.innerHTML
            // console.log(code)
            // block.innerHTML = block.innerHTML.replace(/(?<!\/\**) +\*(?!\*\/)/g,"//")
            hljs.highlightElement(block)
            // console.log(block.innerHTML)
            block.innerHTML = "<ol><li style='border-left:1px solid rgb(75,75,75);padding-left: 15px;'>"+block.innerHTML.replace(/\n/g,"\n</li><li style='border-left:1px solid rgb(75,75,75);padding-left: 15px;'>")+"</li></ol>";
            block.innerHTML = "<span style='margin-right: 10px;padding: 3px;border: #107ded solid 1px;color:#107ded;border-radius: 5px'>"+block.className.match(/(?<=language-).*(?= hljs)/).toString()+"</span><button>复制</button>"+block.innerHTML
            // block.innerHTML = block.innerHTML.replace(/(?<=/\*)(.)+?(?=\*/)/g,"<span class='hljs-comment'>*</span>")
            let copyButton = block.querySelector('button')
            copyButton.onclick = function (){
              copy(code)
              Message.success({message:"复制成功！", offset:100})
            }
        }
    })
})

import router from "./router.js";
// Vue.config.devtools = true;
Vue.prototype.baseUrl="https://www.zhoujianguo.ltd:8080"
new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount("#app")
