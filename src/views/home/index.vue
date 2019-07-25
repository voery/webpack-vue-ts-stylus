<template>
  <div class="">
    {{msg}}
    {{gData}}
    <CountTo :starVal='0' :endVal='100'/>
    <div>
      <ul v-if="sData.length > 0">
        <li v-for="(item, index) in sData">
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
//  namespace的参数为namespaced值
const someModule = namespace('home')
@Component
export default class Home extends Vue {
  msg: String = 'home'
  // 这里是vuex的应用
  // 获取全局的state
  @State('data') gData: any
  // 获取home下的state
  @State(state => state.home.data ) sData: any
  // 通过namespaced获取home下的state
  @someModule.State('data') hData: any
  // 设置全局的状态
  @Mutation('setData') setGData: any
  // 通过namespaced设置home的状态  getters 和 actions与其类似 
  @someModule.Mutation('setData') setHData: any
  // 异步获取全局的state
  @Getter('getData') getData: any
  //  异步设置全局的state
  @Action('actionsData') actionsData: any
  created () {
    this.actionsData('action')
    this.setGData('data')
    this.setHData(['a','b','c'])
  }
}
</script>
<style lang="less" scoped>
</style>