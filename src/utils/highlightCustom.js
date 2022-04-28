import hljs from "highlight.js/lib/core";
import {lineNumbersBlock} from "@/utils/highlight-line-number";
import copy from "copy-to-clipboard";
import {Message} from "element-ui";

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

const highlightCustom = function(el){
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


export default highlightCustom