import App from './App'
import Vue from 'vue'
import store from './store'
import {
  $http
} from '@escook/request-miniprogram'
uni.$showMsg = function(title = '请求错误', duration = 1500, icon = 'error') {
  uni.showToast({
    title,
    duration,
    icon
  })
}
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '加载中...'
  })
  // 判断请求的是否为有权限的 API 接口
  if (options.url.indexOf('/my/') !== -1) {
    // 为请求头添加身份认证字段
    options.header = {
      // 字段的值可以直接从 vuex 中进行获取
      Authorization: store.state.user.token ,
    }
  }
}
$http.afterRequest = function() {
  uni.hideLoading()
}
uni.$http = $http
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
