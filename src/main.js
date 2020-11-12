import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd, { FormModel } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import server from './axios/api'

Vue.prototype.$server = server
Vue.use(antd)
Vue.use(FormModel)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root')
