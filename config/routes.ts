export default [
  {
    path: '/login',
    component: 'login',
    layout: false
  },
  {
    path: '/libraries',
    name: 'libraries',
    icon: 'crown',
    routes: [
      {
        path: '/libraries/watermark',
        name: 'watermark',
        icon: 'smile',
        component: './libraries/watermark',
      }
    ],
  },
];
