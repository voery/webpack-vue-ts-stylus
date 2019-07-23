<template>
  <div class="">
    {{msg}}
    {{gData}}
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
  @State('data') gData
  // 获取home下的state
  @State(state => state.home.data ) sData
  // 通过namespaced获取home下的state
  @someModule.State('data') hData
  // 设置全局的状态
  @Mutation('setData') setGData
  // 通过namespaced设置home的状态  getters 和 actions与其类似 
  @someModule.Mutation('setData') setHData
  // 异步获取全局的state
  @Getter('getData') getData
  //  异步设置全局的state
  @Action('actionsData') actionsData
  created () {
    this.actionsData('action')
    this.setGData('data')
    this.setHData(['a','b','c'])
  }
}
</script>
<style lang="less" scoped>
</style>