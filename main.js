import App from './App'
import Vue from 'vue'
import store from '@/store/store'
import {
    REQUEST
} from 'miniprogram-request'
uni.$http = REQUEST
uni.$showMsg = function( title = '请求错误', duration = 1500, icon = 'error' ) {
    uni.showToast( {
        title,
        duration,
        icon
    } )
}
REQUEST.beforeRequest = function( options ) {
    uni.showLoading( {
        title: '加载中...'
    } )
}
REQUEST.afterRequest = function() {
    uni.hideLoading()
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue( {
    ...App,
    store
} )
app.$mount()
