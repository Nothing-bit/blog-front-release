import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
import vueCookie from 'vue-cookies'
// import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/atom-one-light.css'
import router from "./router.js";
import highlightCustom from "@/utils/highlightCustom";


// Vue.use(ElementUI)
Vue.use(vueCookie)
//过滤所有的高亮模块
Vue.directive('highlight', {
    update(el){
        highlightCustom(el)
    }
})

new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount("#app")
