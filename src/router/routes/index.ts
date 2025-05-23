import type { RouteRecordRaw } from 'vue-router'

// 常量路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    name: 'Layout',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'homepage',
        meta: {
          title: '首页',
          isShow: true,
          // 菜单图标
          icon: 'HomeFilled',
        },
      },
    ],
    meta: {
      title: '布局页',
      isShow: false,
    },
  },
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      isShow: true,
      icon: 'Platform',
    },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录页',
      isShow: false,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '错误页',
      isShow: false,
    },
  },
]

// 动态路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    name: 'Acl',
    path: '/acl',
    redirect: '/acl/user',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          icon: 'User',
          isShow: true,
          title: '用户管理',
        },
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          icon: 'Avatar',
          isShow: true,
          title: '角色管理',
        },
      },
      {
        name: 'Permission',
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          icon: 'Memo',
          isShow: true,
          title: '菜单管理',
        },
      },
    ],
    meta: {
      icon: 'Lock',
      isShow: true,
      title: '权限管理',
    },
  },
  {
    name: 'Prod',
    path: '/prod',
    redirect: '/prod/trademark',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'Trademark',
        path: '/prod/trademark',
        component: () => import('@/views/prod/trademark/index.vue'),
        meta: {
          icon: 'ShoppingCartFull',
          isShow: true,
          title: '品牌管理',
        },
      },
      {
        name: 'Attr',
        path: '/prod/attr',
        component: () => import('@/views/prod/attr/index.vue'),
        meta: {
          icon: 'ChromeFilled',
          isShow: true,
          title: '属性管理',
        },
      },
      {
        name: 'Spu',
        path: '/prod/spu',
        component: () => import('@/views/prod/spu/index.vue'),
        meta: {
          icon: 'Calendar',
          isShow: true,
          title: 'SPU管理',
        },
      },
      {
        name: 'Sku',
        path: '/prod/sku',
        component: () => import('@/views/prod/sku/index.vue'),
        meta: {
          icon: 'Orange',
          isShow: true,
          title: 'SKU管理',
        },
      },
    ],
    meta: {
      icon: 'ShoppingBag',
      isShow: true,
      title: '商品管理',
    },
  },
]

// 任意路由
export const anyRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意页',
      isShow: false,
    },
  },
]
