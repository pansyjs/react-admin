import {  } from 'umi';

export const routes =  [
  {
    path: '/dashboard',
    component: 'dashboard',
    menu: {
      name: '首页', // 兼容此写法
      icon: 'testicon',
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
    component: './404',
  }
]
