/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标，具体配置请查看vip群文档
 */
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import type { VabRouteRecord } from '/#/router'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import Layout from '@vab/layouts/index.vue'
import { setupPermissions } from './permissions'
import { authentication, isHashRouterMode, publicPath } from '@/config'
import type { App } from 'vue'

export const constantRoutes: VabRouteRecord[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/callback',
    name: 'Callback',
    component: () => import('@/views/callback/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      hidden: true,
    },
  },
]

export const asyncRoutes: VabRouteRecord[] = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'home-2-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-2-line',
          noClosable: true,
        },
      },
    ],
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: Layout,
    meta: {
      title: '数据分析',
      icon: 'menu-2-fill',
    },
    children: [
      {
        path: 'data',
        name: 'Data',
        component: () => import('@/views/analysis/index.vue'),
        meta: {
          title: '数据分析',
          icon: 'menu-2-fill',
        },
      },
    ],
  },
  {
    path: '/business',
    name: 'Business',
    component: Layout,
    meta: {
      title: '业务管理',
      icon: 'menu-2-fill',
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/business/user/index.vue'),
        meta: {
          title: '用户信息',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'contract',
        name: 'Contract',
        component: () => import('@/views/business/contract/index.vue'),
        meta: {
          title: '合约列表',
          icon: 'menu-2-fill',
        },
      },
      // {
      //   path: 'balance',
      //   name: 'Balance',
      //   component: () => import('@/views/business/balance/index.vue'),
      //   meta: {
      //     title: '资产变动记录',
      //     icon: 'menu-2-fill',
      //   },
      // },
      // {
      //   path: 'platform_issue',
      //   name: 'PlatformIssue',
      //   component: () => import('@/views/business/platform_issue/index.vue'),
      //   meta: {
      //     title: '平台收益发放记录',
      //     icon: 'menu-2-fill',
      //   },
      // },
      // {
      //   path: 'pledge_activity',
      //   name: 'PledgeActivity',
      //   component: () => import('@/views/business/pledge_activity/index.vue'),
      //   meta: {
      //     title: '用户活动质押管理',
      //     icon: 'menu-2-fill',
      //   },
      // },
      // {
      //   path: 'reward',
      //   name: 'Reward',
      //   component: () => import('@/views/business/reward/index.vue'),
      //   meta: {
      //     title: '奖励发放记录',
      //     icon: 'menu-2-fill',
      //   },
      // },
      // {
      //   path: 'message',
      //   name: 'Message',
      //   component: () => import('@/views/business/message/index.vue'),
      //   meta: {
      //     title: '站内信',
      //     icon: 'menu-2-fill',
      //   },
      // },
    ],
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'menu-2-fill',
    },
    children: [
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('@/views/system/employees/index.vue'),
        meta: {
          title: '员工账户管理',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'remind',
        name: 'Remind',
        component: () => import('@/views/system/remind/index.vue'),
        meta: {
          title: '前台公告设置',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'shareSetting',
        name: 'ShareSetting',
        component: () => import('@/views/system/shareSetting/index.vue'),
        meta: {
          title: '推荐奖励设置',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'platform_of_gold',
        name: 'PlatformOfGold',
        component: () => import('@/views/system/platform_of_gold/index.vue'),
        meta: {
          title: '盘口出金',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'sys_setting',
        name: 'SysSetting',
        component: () => import('@/views/system/sys_setting/index.vue'),
        meta: {
          title: '系统设置',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'user_tags',
        name: 'UserTags',
        component: () => import('@/views/system/user_tags/index.vue'),
        meta: {
          title: '用户标签',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'whitepaper',
        name: 'Whitepaper',
        component: () => import('@/views/system/whitepaper/index.vue'),
        meta: {
          title: '白皮书设置',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'dig_vip_day',
        name: 'DigVipDay',
        component: () => import('@/views/system/dig_vip_day/index.vue'),
        meta: {
          title: '挖矿天数设置',
          icon: 'menu-2-fill',
        },
      },
    ],
  },
  {
    path: '/platform',
    name: 'Platform',
    component: Layout,
    meta: {
      title: '开盘管理',
      icon: 'menu-2-fill',
    },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/platform/list/index.vue'),
        meta: {
          title: '我的开盘列表',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/platform/add/index.vue'),
        meta: {
          title: '请求开盘',
          icon: 'menu-2-fill',
        },
      },
    ],
  },
  {
    path: '/setting',
    name: 'PersonnelManagement',
    component: Layout,
    meta: {
      title: '配置',
      icon: 'user-settings-line',
      guard: ['Admin'],
    },
    children: [
      {
        path: 'personalCenter',
        name: 'PersonalCenter',
        component: () => import('@/views/setting/personalCenter/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'map-pin-user-line',
        },
      },
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/setting/userManagement/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'user-3-line',
        },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/setting/roleManagement/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'admin-line',
        },
      },
      {
        path: 'departmentManagement',
        name: 'DepartmentManagement',
        component: () =>
          import('@/views/setting/departmentManagement/index.vue'),
        meta: {
          title: '部门管理',
          icon: 'group-line',
        },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () => import('@/views/setting/menuManagement/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'dictionaryManagement',
        name: 'DictionaryManagement',
        component: () =>
          import('@/views/setting/dictionaryManagement/index.vue'),
        meta: {
          title: '字典管理',
          icon: 'book-2-line',
          dot: true,
        },
      },
    ],
  },
  {
    path: '/log',
    component: Layout,
    name: 'Logs',
    meta: {
      title: '日志管理',
      icon: 'user-settings-line',
    },
    children: [
      {
        path: 'admin_login_log',
        name: 'AdminLoginLog',
        component: () => import('@/views/logs/adminLoginLog/index.vue'),
        meta: {
          title: '登录日志',
          icon: 'file-shield-2-line',
        },
      },
      {
        path: 'operation_log',
        name: 'OperationLog',
        component: () => import('@/views/logs/operationLog/index.vue'),
        meta: {
          title: '操作日志',
          icon: 'file-shield-2-line',
        },
      },
      {
        path: 'user_login_log',
        name: 'UserLoginLog',
        component: () => import('@/views/logs/userLoginLog/index.vue'),
        meta: {
          title: '前台登录日志',
          icon: 'file-shield-2-line',
        },
      },
      {
        path: 'approve_log',
        name: 'ApproveLog',
        component: () => import('@/views/logs/approveLog/index.vue'),
        meta: {
          title: '用户授权记录',
          icon: 'file-shield-2-line',
        },
      },
    ],
  },
  {
    path: '/finance',
    name: 'Finance',
    component: Layout,
    meta: {
      title: '财务管理',
      icon: 'menu-2-fill',
    },
    children: [
      {
        path: 'collect_record',
        name: 'CollectRecord',
        component: () => import('@/views/finance/collect_record/index.vue'),
        meta: {
          title: '归集记录',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'platform_withdraw_record',
        name: 'PlatformWithdrawRecord',
        component: () =>
          import('@/views/finance/platform_withdraw_record/index.vue'),
        meta: {
          title: '出金记录',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'user_exchange',
        name: 'UserExchange',
        component: () => import('@/views/finance/user_exchange/index.vue'),
        meta: {
          title: '用户兑换记录',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'user_withdraw',
        name: 'UserWithdraw',
        component: () => import('@/views/finance/user_withdraw/index.vue'),
        meta: {
          title: '用户提现记录',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'financial_info',
        name: 'FinancialInfo',
        component: () => import('@/views/finance/financial_info/index.vue'),
        meta: {
          title: '财务信息展示',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'history_auth_address',
        name: 'HistoryAuthAddress',
        component: () =>
          import('@/views/finance/history_auth_address/index.vue'),
        meta: {
          title: '历史授权地址',
          icon: 'menu-2-fill',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'NotFound',
    meta: {
      hidden: true,
    },
  },
]

const router = createRouter({
  history: isHashRouterMode
    ? createWebHashHistory(publicPath)
    : createWebHistory(publicPath),
  routes: constantRoutes as RouteRecordRaw[],
})

function fatteningRoutes(routes: VabRouteRecord[]): VabRouteRecord[] {
  return routes.flatMap((route: VabRouteRecord) => {
    return route.children ? fatteningRoutes(route.children) : route
  })
}

function addRouter(routes: VabRouteRecord[]) {
  routes.forEach((route: VabRouteRecord) => {
    if (!router.hasRoute(route.name)) router.addRoute(route as RouteRecordRaw)
    if (route.children) addRouter(route.children)
  })
}

export function resetRouter(routes: VabRouteRecord[] = constantRoutes) {
  routes.map((route: VabRouteRecord) => {
    if (route.children) route.children = fatteningRoutes(route.children)
  })
  router.getRoutes().forEach(({ name }) => {
    router.hasRoute(<RouteRecordName>name) &&
      router.removeRoute(<RouteRecordName>name)
  })
  addRouter(routes)
}

export function setupRouter(app: App<Element>) {
  if (authentication === 'intelligence') addRouter(asyncRoutes)
  setupPermissions(router)
  app.use(router)
  return router
}

export default router
