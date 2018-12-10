import { fetchCurrentUser, fetchLogout } from '@/services/user';
import { stringify } from 'qs';
import { routerRedux } from 'dva/router';

export default {
  name: 'user',

  state: {
    currentUser: {},
    isSuperAdmin: false
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(fetchCurrentUser);
      if (response && response.code === 200) {
        const userInfo = response.data;
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name: userInfo.name,
            avatar: userInfo.avatar,
            unreadCount: userInfo.unreadCount
          }
        });
      }
    },
    *fetchLogout(_, { call, put }) {
      const response = yield call(fetchLogout);
      if (response && response.code === 200) {
        yield put({
          type: 'saveCurrentUser',
          payload: {}
        });
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href
            })
          })
        );
      }
    }
  },

  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
