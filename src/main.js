import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import vueCookie from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css'
import hljs from "highlight.js"
import  'highlight.js/styles/idea.css'

Vue.use(ElementUI)
Vue.use(vueCookie)
Vue.use(hljs)

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
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
