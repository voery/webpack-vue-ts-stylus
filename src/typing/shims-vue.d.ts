declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module 'vue/types/vue' {
  interface Vue {
    // 这里可以定义通过Vue.prototype指定的方法和属性的类型
    $getApi: any,
    $axios: any
  }
}