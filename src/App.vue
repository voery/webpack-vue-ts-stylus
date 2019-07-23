<template>
  <div class="">
    <Home/>
    {{msg}}
  </div>
</template>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator'
import Home from '@/views/home/index.vue'
@Component({
  components: {
    Home
  }
})
export default class App extends Vue{
  msg:String = 'hello world'
}
</script>
<style lang="less" scoped>
</style>