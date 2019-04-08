// https://umijs.org/zh/guide/runtime-config.html
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import router from 'umi/router';
import { APP_DEFAULT_CONFIG } from '@/config';
import { getCookie } from '@/utils/cookie';

const { whiteList } = APP_DEFAULT_CONFIG;

// 用于在初始加载和路由切换时做一些事情
// 以token是否存在判断用户是否登录
export function onRouteChange({ location, routes, action }) {
  const token = getCookie();
  let isLogin = true;

  whiteList.forEach(item => {
    if (pathToRegexp(whiteList[0]).test(location.pathname)) {
      isLogin = false;
    }
  });

  // token不存在 且 需登录
  if (!token && isLogin) {
    message.warning('登录已过期，请重新登录！');
    router.push('/user/login');
    return;
  }

  if (token && !isLogin) {
    // 请根据需求开启
    // router.push('/dashboard');
  }
}

// 用于改写把整个应用 render 到 dom 树里的方法。
export function render(oldRender) {
  console.log(123);
  oldRender();
}
