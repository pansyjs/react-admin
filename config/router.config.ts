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
            component: './dashboard/analysis'
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './dashboard/workplace'
          }
        ]
      }
    ]
  }
];
