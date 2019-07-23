import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
declare module 'vue/types/vue' {
  interface Vue {
    // 这里可以定义通过Vue.prototype指定的方法和属性的类型
    $getApi: any,
    $axios: any    
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
