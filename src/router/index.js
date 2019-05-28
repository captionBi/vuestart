import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
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
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 派件管理模块
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '派件管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '手动入库', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'signin',
        name: 'signin',
        component: () => import('@/views/table/signfor'),
        meta: { title: '签收入库', icon: 'tree' }
      },
      {
        path: 'waitting',
        name: 'waitting',
        component: () => import('@/views/Important/waitting'),
        meta: { title: '待完善', icon: 'tree' }
      }
    ]
  },
  // 服务管理模块
  {
    path: '/server',
    component: Layout,
    redirect: '/server/RackManage',
    name: 'server',
    meta: { title: '服务管理', icon: 'example' },
    children: [
      {
        path: 'RackManage',
        name: 'Form',
        component: () => import('@/views/servers/RackManage'),
        meta: { title: '货架管理', icon: 'form' }
      },

      {
        path: 'DeliveryManage',
        name: 'DeliveryManage',
        component: () => import('@/views/servers/DeliveryManage'),
        meta: { title: '派费设置', icon: 'form' }
      }
    ]
  },

  {
    path: '/ceshi',
    component: Layout,
    redirect: '/ceshi/index',
    // name: 'ceshi',
    // meta: { title: '测试页面', icon: 'example' },
    children: [
      {
        path: 'ceshi',
        name: 'ceshi',
        component: () => import('@/views/ceshi/index'),
        meta: { title: '测试页面', icon: 'form' }
      }
    ]
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
