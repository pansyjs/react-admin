import { routerRedux } from 'dva/router';
import { fetchLogin } from '@/services/user';
import { parseQuery } from '@/utils/url';
import { setCookie } from '@/utils/cookie';

export default {
  namespace: 'login',

  state: {},

  effects: {
    *fetchLogin({ payload }, { call, put }) {
      const response = yield call(fetchLogin, payload);
      // login success
      if (response && response.code === 200) {
        const { token } = response.data;
        if (token) {
          setCookie('', token);
        }
        const urlParams = new URL(window.location.href);
        const params = parseQuery();
        let { redirect } = params;
        // 处理登录重定向
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    }
  }
};
