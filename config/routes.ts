export default [
  {
    path: '/login',
    component: 'login',
    layout: false
  },
  {
    path: '/libraries',
    name: 'libraries',
    icon: 'appstore',
    routes: [
      {
        path: '/libraries/watermark',
        name: 'watermark',
        component: './libraries/watermark',
      },
      {
        path: '/libraries/amap',
        name: 'amap',
        component: './libraries/amap',
      }
    ],
  },
  {
    path: '/exception',
    name: 'exception',
    icon: 'warning',
    routes: [
      {
        path: '/exception/403',
        name: '403',
        component: './exception/403'
      },
      {
        path: '/exception/404',
        name: '404',
        component: './exception/404'
      },
      {
        path: '/exception/500',
        name: '500',
        component: './exception/500'
      },
    ]
  },
];
