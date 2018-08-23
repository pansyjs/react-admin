import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * 请求拦截器 - 成功
 * @param config
 */
export function requestSuccess(config) {
  // 请求开始，开启进度条
  NProgress.start();
  return config;
}

/**
 * 请求拦截器 - 失败
 * @param error
 */
export function requestFail(error) {
  return Promise.reject(error);
}

/**
 * 返回拦截器 - 成功
 * @param response
 */
export function responseSuccess(response) {
  // 请求结束，关闭进度条
  NProgress.done();
  return response.data;
}

/**
 * 返回拦截器 - 失败
 * @param error
 */
export function responseFail(error) {
  // 请求失败，也应关闭进度条
  NProgress.done();
  return Promise.reject(error);
}
