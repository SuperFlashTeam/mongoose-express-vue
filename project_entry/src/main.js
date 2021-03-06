// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Es6Promise from 'es6-promise'
import App from './App'
import router from './router'
import '@/assets/css/reset.css' // 引入公共样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getRequest, postRequest, deleteRequest, putRequest} from './components/api/api.js'
import axios from 'axios'

require('es6-promise').polyfill()

Es6Promise.polyfill()

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
