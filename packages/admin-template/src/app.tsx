// https://umijs.org/zh/guide/runtime-config.html
import { pathToRegexp } from 'path-to-regexp';
import { APP_DEFAULT_CONFIG } from '@/config';
import { getCookie } from '@/utils/cookie';

const { whiteList } = APP_DEFAULT_CONFIG;

export function patchRoutes({ routes }) {
  console.log(routes);
}

// 用于在初始加载和路由切换时做一些事情
// 以token是否存在判断用户是否登录
export function onRouteChange({ location, matchedRoutes }) {
  const token = getCookie();
  let isLogin = true;

  console.log(matchedRoutes);

  // whiteList.forEach((item) => {
  //   if (pathToRegexp(item).test(location.pathname)) {
  //     isLogin = false;
  //   }
  // });

  // 需要登录页面 未登录状态不可访问
  // if (!token && isLogin) {
  //   message.warning('登录已过期，请重新登录！');
  //   router.push('/user/login');
  //   return;
  // }

  // 无需登录页面 登录状态不可访问
  // if (token && !isLogin) {
  //   // 请根据需求开启
  //   router.push('/dashboard');
  // }
}

// 用于改写把整个应用 render 到 dom 树里的方法。
export function render(oldRender) {
  oldRender();
}

export function getInitialState() {
  return {}
}
