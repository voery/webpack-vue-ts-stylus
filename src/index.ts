import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//  对vue-count-to的全局引入
import CountTo from 'vue-count-to'
// declare module 'vue/types/vue' {
//   interface Vue {
//     // 这里可以定义通过Vue.prototype指定的方法和属性的类型
//     $getApi: any,
//     $axios: any    
//   }
// }
Vue.component('CountTo', CountTo)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
