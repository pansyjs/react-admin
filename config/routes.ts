import {  } from 'umi';

export const routes = [
  {
    path: '/dashboard',
    component: 'dashboard',
    menu: {
      name: '首页',
      icon: 'dashboard',
    },
  },
  {
    path: '/login',
    component: 'login',
    layout: false
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/nested',
    menu: {
      name: '路由嵌套',
      icon: 'bars',
    },
    routes: [
      {
        path: '/nested/menu1',
        menu: {
          name: '菜单1'
        },
        routes: [
          {
            path: '/nested/menu1/menu1-1',
            menu: {
              name: '菜单1-1'
            },
            component: '@/pages/nested/menu1/menu1-1'
          },
          {
            path: '/nested/menu1/menu1-2',
            menu: {
              name: '菜单1-2'
            },
            routes: [
              {
                path: '/nested/menu1/menu1-2',
                redirect: '/nested/menu1/menu1-2/menu1-2-1',
              },
              {
                path: '/nested/menu1/menu1-2/menu1-2-1',
                menu: {
                  name: '菜单1-2-1'
                },
                component: '@/pages/nested/menu1/menu1-2/menu1-2-1'
              },
              {
                path: '/nested/menu1/menu1-2/menu1-2-2',
                menu: {
                  name: '菜单1-2-2'
                },
                component: '@/pages/nested/menu1/menu1-2/menu1-2-2'
              }
            ]
          },
          {
            path: '/nested/menu1/menu1-3',
            menu: {
              name: '菜单1-3'
            },
            component: '@/pages/nested/menu1/menu1-3'
          },
          {
            path: '/nested/menu1',
            redirect: '/nested/menu1/menu1-1',
          }
        ]
      },
      {
        path: '/nested/menu2',
        menu: {
          name: '菜单2'
        },
        component: '@/pages/nested/menu2'
      },
      {
        path: '/nested',
        redirect: '/nested/menu1',
      }
    ]
  },
  {
    path: '/permission',
    menu: {
      name: '权限管理',
      icon: 'lock',
    },
    routes: [
      {
        path: '/permission',
        redirect: '/permission/action',
      },
      {
        path: '/permission/action',
        menu: {
          name: '操作管理'
        },
        component: '@/pages/permission/action'
      },
      {
        path: '/permission/policy',
        menu: {
          name: '策略管理'
        },
        component: '@/pages/permission/policy'
      },
    ]
  },
  {
    path: '/system',
    menu: {
      name: '系统管理',
      icon: 'desktop',
    },
    routes: [
      {
        path: '/system',
        redirect: '/system/user',
      },
      {
        path: '/system/user',
        menu: {
          name: '用户管理'
        },
        component: '@/pages/system/user'
      },
      {
        path: '/system/role',
        menu: {
          name: '角色管理'
        },
        component: '@/pages/system/role'
      }
    ]
  },
  {
    component: './404',
  }
]
