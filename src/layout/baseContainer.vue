<template>
  <layoutWrap>
    <AppMain :is-not-qiankun="false" />
  </layoutWrap>
</template>

<script>
import { registerMicroApps, start } from 'qiankun'
import { AppMain } from './components/index.js'
import layoutWrap from './components/layoutWrap/index.vue'
import { asyncRoutes } from '@/router/index.js'
export default {
  name: 'Layout',
  components: {
    AppMain,
    layoutWrap
  },
  beforeRouteEnter(form, to, next) {
    // Filter asynchronous qiankun routing tables by recursion
    function makeQiankunRoutes(routes, qiankunSubsArr) {
      for (let index = 0; index < routes.length; index++) {
        const element = routes[index]
        if (element.qiankunConfig) {
          qiankunSubsArr.push({
            activeRule: `/#${element.path}`,
            entry: element.qiankunConfig.entry,
            container: element.qiankunConfig.container,
            name: element.name
          })
        }
        if (element.children && element.children.length > 0) {
          makeQiankunRoutes(element.children, qiankunSubsArr)
        }
      }
    }
    // 没有注册过
    console.log(window.__POWERED_BY_QIANKUN__)
    if (!window.__POWERED_BY_QIANKUN__) {
      console.log('should init qiankun')
      const qianKunRouter = []
      makeQiankunRoutes(asyncRoutes, qianKunRouter)
      console.log(qianKunRouter)
      registerMicroApps(qianKunRouter)

      start()
    }
    next()
  }
}
</script>

<style>

</style>
