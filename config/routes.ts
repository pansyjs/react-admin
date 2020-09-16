import {  } from 'umi';

export const routes =  [
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
        title: '用户管理',
        component: '@/pages/system/user'
      }
    ]
  },
  {
    component: './404',
  }
]
