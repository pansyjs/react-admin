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
        icon: 'smile',
        component: './libraries/watermark',
      },
      {
        path: '/libraries/amap',
        name: 'amap',
        icon: 'smile',
        component: './libraries/amap',
      }
    ],
  },
];
