<template>
  <section class="app-main">
    <transition v-if="isNotQiankun" name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
    <div v-else id="subAppContainer" class="app-qiankun-wrap">
      <!-- qiankun容器 -->
    </div>
  </section>
</template>

<script>
import { asyncRoutes } from '@/router/index.js'
import { registerMicroApps, start } from 'qiankun'
export default {
  name: 'AppMain',
  props: {
    isNotQiankun: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  mounted() {
    // 是qiankun页面且没有注册过
    console.log(window.__POWERED_BY_QIANKUN__)
    if (!this.isNotQiankun && !window.__POWERED_BY_QIANKUN__) {
      console.log('should init qiankun')
      this.initQiankun()
    }
  },
  methods: {
    initQiankun() {
      const qianKunRouter = []
      for (let index = 0; index < asyncRoutes.length; index++) {
        const element = asyncRoutes[index]
        if (element.isQianKunRouter) {
          qianKunRouter.push({
            activeRule: element.path,
            entry: element.entry,
            container: element.container,
            name: element.name
          })
        }
      }
      console.log(qianKunRouter)
      registerMicroApps(qianKunRouter)

      start()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
