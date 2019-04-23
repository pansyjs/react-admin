export default [
  // user
  {
    path: '/user',
    name: 'user',
    component: '../layouts/user-layout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      {
        path: '/user/login',
        name: 'login',
        component: './user/login'
      },
      {
        path: '/user/password-reset',
        name: 'password-reset',
        component: './user/password-reset'
      }
    ]
  },
  // app
  {
    path: '/',
    component: '../layouts/basic-layout',
    Routes: ['src/pages/authorized'],
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
            component: './dashboard/analysis'
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './dashboard/workplace'
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
            component: './exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './exception/500',
          }
        ],
      },
      {
        name: 'permission',
        icon: 'lock',
        path: '/permission',
        routes: [
          {
            path: '/permission/actions',
            name: 'actions',
            component: './permission/actions/actions'
          },
          {
            path: '/permission/policies',
            name: 'policies',
            component: './permission/policies/policies',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/permission/policies/create',
                name: 'create',
                component: './permission/policies/create',
              },
            ]
          }
        ],
      },
    ]
  }
];
