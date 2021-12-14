<template>
  <layoutWrap>
    <AppMain :is-not-qiankun="false" />
  </layoutWrap>
</template>

<script>
import { AppMain } from './components/index.js'
import layoutWrap from './components/layoutWrap/index.vue'
export default {
  name: 'Layout',
  components: {
    AppMain,
    layoutWrap
  }
}
</script>

<style>

</style>
