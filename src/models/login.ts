import { Effect } from 'dva';
import { Reducer } from 'redux';
import store from 'store';
import { routerRedux } from 'dva/router';
import { fetchLogin, fetchLogout } from '@/services/user';
import { parseQuery } from '@/utils/url';
import { setCookie } from '@/utils/cookie';
import { STORAGE_KEY_DEFAULT_CONFIG } from '@/config';

export type TLoginType = 'password' | 'sms';

export interface ILoginModel {
  namespace: 'login',
  state: {
    status: boolean;
    type: TLoginType;
  },
  effects: {
    // 用户登录
    fetchLogin: Effect;
    fetchLogout: Effect;
  },
  reducers: {
    changeStatus: Reducer<any>;
    changeLoginType: Reducer<any>;
  }
}

const { loginType } = STORAGE_KEY_DEFAULT_CONFIG;

const Login: ILoginModel = {
  namespace: 'login',
  state: {
    status: false,
    type: store.get(loginType, 'password')
  },
  effects: {
    *fetchLogin({ payload }, { call, put }) {
      console.log(payload);
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
    },
    *fetchLogout({ payload }, { call, put }) {
      const response = yield call(fetchLogout, payload);

    }
  },
  reducers: {
    changeStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status
      };
    },
    changeLoginType(state, { payload }) {
      return {
        ...state,
        type: payload
      };
    }
  }
};

export default Login;
