import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import baseContainer from '@/layout/baseContainer.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * qiankunConfig: truly           truly: it will render by qiankun, falsy: it will render by vue-router
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // 刷新和重定向
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/chat_archive',
    name: 'weiteng-app-chat-archive',
    meta: {
      title: '会话存档',
      icon: 'guide'
    },
    alwaysShow: true,
    component: baseContainer,
    children: [
      {
        path: '/chat_archive/client_Retrieve',
        name: 'weiteng-app-chat-client-archive',
        qiankunConfig: {
          entry: 'http://localhost:9527/#/chat_archive/client_Retrieve',
          container: '#subAppContainer'
        },
        meta: {
          title: '按客户检索',
          icon: 'guide',
          roles: ['admin', 'editor']
        }
      },
      {
        path: '/chat_archive/employees_Retrieve',
        name: 'weiteng-app-chat-employees-archive',
        qiankunConfig: {
          entry: 'http://localhost:9527/#/chat_archive/employees_Retrieve',
          container: '#subAppContainer'
        },
        meta: {
          title: '按员工检索',
          icon: 'guide',
          roles: ['admin', 'editor']
        }
      },
      {
        path: '/chat_archive/white_List',
        name: 'weiteng-app-chat-white-list',
        qiankunConfig: {
          entry: 'http://localhost:9527/#/chat_archive/white_List',
          container: '#subAppContainer'
        },
        meta: {
          title: '会话白名单检索',
          icon: 'guide',
          roles: ['admin', 'editor']
        }
      }
    ]
  },

  {
    path: '/enterpriseMicroAssistant/welcome_msg',
    name: 'weiteng-app-enterprise-microAssistant-welcome-msg',
    entry: 'http://localhost:9527/#enterpriseMicroAssistant/welcome_msg',
    container: '#subAppContainer',
    qiankunConfig: {
      entry: 'http://localhost:9527/#/chat_archive/white_List',
      container: '#subAppContainer'
    },
    meta: {
      title: '欢迎语',
      icon: 'guide',
      roles: ['admin', 'editor']
    },
    component: baseContainer
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
