<template>
  <div class="">
    {{msg}}
  </div>
</template>

<script lang='ts'>
import {Component, Vue} from 'vue-property-decorator'
@Component
export default class Home extends Vue {
  msg: String = 'home'
}
</script>
<style lang="less" scoped>
</style>