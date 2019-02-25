export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' }
    ]
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    auth: 'on',
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis'
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor'
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace'
          }
        ]
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403'
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404'
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500'
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException'
          }
        ]
      },
      // 系统管理模块
      {
        name: 'system',
        icon: 'desktop',
        path: '/system',
        routes: [
          {
            path: '/system/user',
            name: 'user',
            component: '../layouts/BlankLayout',
            routes: [
              {
                path: '/system/user/groups',
                name: 'groups',
                component: './system/user/groups'
              },
              {
                path: '/system/user/users',
                name: 'users',
                component: './system/user/users'
              },
            ]
          },
          {
            path: '/system/permission',
            name: 'permission',
            component: '../layouts/BlankLayout',
            routes: [
              {
                path: '/system/permission/permissions',
                name: 'permissions',
                component: './system/permission/permissions'
              },
              {
                path: '/system/permission/policies',
                name: 'policies',
                component: './system/permission/policies',
              },
            ]
          }
        ]
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Layout',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles'
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles'
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications'
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects'
              }
            ]
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Layout',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base'
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView'
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView'
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView'
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView'
              }
            ]
          }
        ]
      }
    ]
  }
];
