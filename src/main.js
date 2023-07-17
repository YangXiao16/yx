import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store';
import App from './App.vue'


Vue.config.productionTip = false
//elementui 全局引入
Vue.use(ElementUI)
new Vue({
  store,
  router,  //引入router 路由
  render: h => h(App),
}).$mount('#app')
