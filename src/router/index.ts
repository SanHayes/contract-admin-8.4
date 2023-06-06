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
      {
        path: 'address',
        name: 'Address',
        component: () => import('@/views/business/address/index.vue'),
        meta: {
          title: '地址列表',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'balance',
        name: 'Balance',
        component: () => import('@/views/business/balance/index.vue'),
        meta: {
          title: '资产变动记录',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'platform_issue',
        name: 'PlatformIssue',
        component: () => import('@/views/business/platform_issue/index.vue'),
        meta: {
          title: '平台收益发放记录',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'pledge_activity',
        name: 'PledgeActivity',
        component: () => import('@/views/business/pledge_activity/index.vue'),
        meta: {
          title: '用户活动质押管理',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'reward',
        name: 'Reward',
        component: () => import('@/views/business/reward/index.vue'),
        meta: {
          title: '奖励发放记录',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/business/message/index.vue'),
        meta: {
          title: '站内信',
          icon: 'menu-2-fill',
        },
      },
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
  // {
  //   path: '/vab',
  //   name: 'Vab',
  //   component: Layout,
  //   meta: {
  //     title: '组件',
  //     icon: 'code-box-line',
  //   },
  //   children: [
  //     {
  //       path: 'icon',
  //       name: 'Icon',
  //       meta: {
  //         title: '图标',
  //         icon: 'remixicon-line',
  //       },
  //       children: [
  //         {
  //           path: 'remixIcon',
  //           name: 'RemixIcon',
  //           component: () => import('@/views/vab/icon/remixIcon.vue'),
  //           meta: {
  //             title: '小清新图标',
  //           },
  //         },
  //         {
  //           path: 'iconSelector',
  //           name: 'IconSelector',
  //           component: () => import('@/views/vab/icon/iconSelector.vue'),
  //           meta: {
  //             title: '图标选择器',
  //           },
  //         },
  //         {
  //           path: 'customSvg',
  //           name: 'CustomSvg',
  //           component: () => import('@/views/vab/icon/customSvg.vue'),
  //           meta: {
  //             title: '自定义图标',
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'permission',
  //       name: 'Permission',
  //       component: () => import('@/views/vab/permission/index.vue'),
  //       meta: {
  //         title: '角色权限',
  //         icon: 'user-3-line',
  //         badge: 'Pro',
  //       },
  //     },
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       meta: {
  //         title: '表格',
  //         // 非editor角色的用户可见
  //         guard: {
  //           role: ['Editor'],
  //           mode: 'except',
  //         },
  //         icon: 'table-2',
  //       },
  //       children: [
  //         {
  //           path: 'comprehensiveTable',
  //           name: 'ComprehensiveTable',
  //           component: () => import('@/views/vab/table/comprehensiveTable.vue'),
  //           meta: {
  //             title: '综合表格',
  //           },
  //         },
  //         {
  //           path: 'detail',
  //           name: 'Detail',
  //           component: () => import('@/views/vab/table/detail.vue'),
  //           meta: {
  //             hidden: true,
  //             title: '详情页',
  //             activeMenu: '/vab/table/comprehensiveTable',
  //             dynamicNewTab: true, //详情页根据id传参不同可打开多个
  //           },
  //         },
  //         {
  //           path: 'inlineEditTable',
  //           name: 'InlineEditTable',
  //           component: () => import('@/views/vab/table/inlineEditTable.vue'),
  //           meta: {
  //             title: '行内编辑表格',
  //             noKeepAlive: true,
  //           },
  //         },
  //         {
  //           path: 'customTable',
  //           name: 'CustomTable',
  //           component: () => import('@/views/vab/table/customTable.vue'),
  //           meta: {
  //             title: '自定义表格',
  //           },
  //         },
  //         {
  //           path: 'dynamicTable',
  //           name: 'DynamicTable',
  //           component: () => import('@/views/vab/table/dynamicTable.vue'),
  //           meta: {
  //             title: '动态表格',
  //             badge: 'New',
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'list',
  //       name: 'List',
  //       component: () => import('@/views/vab/list/index.vue'),
  //       meta: {
  //         title: '列表',
  //         guard: ['Admin'],
  //         icon: 'list-check-2',
  //       },
  //     },
  //     {
  //       path: 'description',
  //       name: 'Description',
  //       component: () => import('@/views/vab/description/index.vue'),
  //       meta: {
  //         title: '描述',
  //         guard: ['Admin'],
  //         icon: 'slideshow-line',
  //       },
  //     },
  //     {
  //       path: 'calendar',
  //       name: 'Calendar',
  //       component: () => import('@/views/vab/calendar/index.vue'),
  //       meta: {
  //         title: '日历',
  //         guard: ['Admin'],
  //         icon: 'calendar-check-line',
  //         dot: true,
  //       },
  //     },
  //     {
  //       path: 'editor',
  //       name: 'Editor',
  //       meta: {
  //         title: '编辑器',
  //         guard: ['Admin'],
  //         icon: 'edit-2-line',
  //       },
  //       children: [
  //         {
  //           path: 'wangEditor',
  //           name: 'WangEditor',
  //           component: () => import('@/views/vab/editor/wangEditor.vue'),
  //           meta: {
  //             title: '腾讯文档',
  //             guard: ['Admin'],
  //             dot: true,
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       path: 'form',
  //       name: 'Form',
  //       meta: {
  //         title: '表单',
  //         guard: ['Admin'],
  //         icon: 'file-list-2-line',
  //       },
  //       children: [
  //         {
  //           path: 'comprehensiveForm',
  //           name: 'ComprehensiveForm',
  //           component: () => import('@/views/vab/form/comprehensiveForm.vue'),
  //           meta: {
  //             title: '综合表单',
  //           },
  //         },
  //         {
  //           path: 'stepForm',
  //           name: 'StepForm',
  //           component: () => import('@/views/vab/form/stepForm.vue'),
  //           meta: {
  //             title: '分步表单',
  //           },
  //         },
  //         {
  //           path: 'button',
  //           name: 'Button',
  //           component: () => import('@/views/vab/form/button.vue'),
  //           meta: {
  //             title: '按钮',
  //           },
  //         },
  //         {
  //           path: 'link',
  //           name: 'Link',
  //           component: () => import('@/views/vab/form/link.vue'),
  //           meta: {
  //             title: '文字链接',
  //           },
  //         },
  //         {
  //           path: 'radio',
  //           name: 'Radio',
  //           component: () => import('@/views/vab/form/radio.vue'),
  //           meta: {
  //             title: '单选框',
  //           },
  //         },
  //         {
  //           path: 'checkbox',
  //           name: 'Checkbox',
  //           component: () => import('@/views/vab/form/checkbox.vue'),
  //           meta: {
  //             title: '多选框',
  //           },
  //         },
  //         {
  //           path: 'input',
  //           name: 'Input',
  //           component: () => import('@/views/vab/form/input.vue'),
  //           meta: {
  //             title: '输入框',
  //           },
  //         },
  //         {
  //           path: 'inputNumber',
  //           name: 'InputNumber',
  //           component: () => import('@/views/vab/form/inputNumber.vue'),
  //           meta: {
  //             title: '计数器',
  //           },
  //         },
  //         {
  //           path: 'select',
  //           name: 'Select',
  //           component: () => import('@/views/vab/form/select.vue'),
  //           meta: {
  //             title: '选择器',
  //             dot: true,
  //           },
  //         },
  //         {
  //           path: 'switch',
  //           name: 'Switch',
  //           component: () => import('@/views/vab/form/switch.vue'),
  //           meta: {
  //             title: '开关',
  //           },
  //         },
  //         {
  //           path: 'slider',
  //           name: 'Slider',
  //           component: () => import('@/views/vab/form/slider.vue'),
  //           meta: {
  //             title: '滑块',
  //           },
  //         },
  //         {
  //           path: 'timePicker',
  //           name: 'TimePicker',
  //           component: () => import('@/views/vab/form/timePicker.vue'),
  //           meta: {
  //             title: '时间选择器',
  //           },
  //         },
  //         {
  //           path: 'datePicker',
  //           name: 'DatePicker',
  //           component: () => import('@/views/vab/form/datePicker.vue'),
  //           meta: {
  //             title: '日期选择器',
  //           },
  //         },
  //         {
  //           path: 'dateTimePicker',
  //           name: 'DateTimePicker',
  //           component: () => import('@/views/vab/form/dateTimePicker.vue'),
  //           meta: {
  //             title: '日期时间选择器',
  //           },
  //         },
  //         {
  //           path: 'rate',
  //           name: 'Rate',
  //           component: () => import('@/views/vab/form/rate.vue'),
  //           meta: {
  //             title: '评分',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: '/other',
  //   name: 'Other',
  //   component: Layout,
  //   meta: {
  //     title: '其他',
  //     icon: 'archive-line',
  //     guard: ['Admin'],
  //   },
  // children: [
  // {
  //   path: 'workflow',
  //   name: 'Workflow',
  //   component: () => import('@/views/other/workflow/index.vue'),
  //   meta: {
  //     title: '工作流',
  //     guard: ['Admin'],
  //     icon: 'flow-chart',
  //   },
  // },
  // {
  //   path: 'echarts',
  //   name: 'Echarts',
  //   component: () => import('@/views/other/echarts/index.vue'),
  //   meta: {
  //     title: '图表',
  //     guard: ['Admin'],
  //     icon: 'bubble-chart-line',
  //   },
  // },
  // {
  //   path: 'print',
  //   name: 'Print',
  //   component: () => import('@/views/other/print/index.vue'),
  //   meta: {
  //     title: '打印',
  //     guard: ['Admin'],
  //     icon: 'printer-line',
  //   },
  // },
  // {
  //   path: 'notice',
  //   name: 'Notice',
  //   component: () => import('@/views/other/notice/index.vue'),
  //   meta: {
  //     title: '通知',
  //     guard: ['Admin'],
  //     icon: 'message-2-line',
  //   },
  // },
  // {
  //   path: 'tabs',
  //   name: 'Tabs',
  //   component: () => import('@/views/other/tabs/index.vue'),
  //   meta: {
  //     title: '多标签',
  //     guard: ['Admin'],
  //     icon: 'bank-card-line',
  //   },
  // },
  // {
  //   path: 'watermark',
  //   name: 'Watermark',
  //   component: () => import('@/views/other/watermark/index.vue'),
  //   meta: {
  //     title: '水印',
  //     guard: ['Admin'],
  //     icon: 'water-flash-line',
  //     dot: true,
  //   },
  // },
  // {
  //   path: 'cssfx',
  //   name: 'Cssfx',
  //   component: () => import('@/views/other/cssfx/index.vue'),
  //   meta: {
  //     title: 'Css动画',
  //     guard: ['Admin'],
  //     icon: 'css3-line',
  //   },
  // },
  // {
  //   path: 'excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     guard: ['Admin'],
  //     icon: 'file-excel-2-line',
  //   },
  //   children: [
  //     {
  //       path: 'exportExcel',
  //       name: 'ExportExcel',
  //       component: () => import('@/views/other/excel/exportExcel.vue'),
  //       meta: {
  //         title: '导出Excel',
  //       },
  //     },
  //     {
  //       path: 'exportSelectedExcel',
  //       name: 'SelectExcel',
  //       component: () =>
  //         import('@/views/other/excel/exportSelectExcel.vue'),
  //       meta: {
  //         title: '导出选中行Excel',
  //       },
  //     },
  //     {
  //       path: 'exportMergeHeaderExcel',
  //       name: 'MergeHeaderExcel',
  //       component: () =>
  //         import('@/views/other/excel/exportMergeHeaderExcel.vue'),
  //       meta: {
  //         title: '导出合并Excel',
  //       },
  //     },
  //   ],
  // },
  // ],
  // },
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
      guard: ['Admin'],
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
