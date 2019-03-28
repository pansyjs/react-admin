import { Effect } from 'dva';
import { Reducer } from 'redux';
import { stringify } from 'qs';
import { routerRedux } from 'dva/router';
import { fetchCurrentUser, fetchLogout } from '@/services/user.service';

export interface IUserModelState {
  currentUser: {};
  isSuperAdmin: boolean;
}

export interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    fetchCurrent: Effect;
    fetchLogout: Effect;
  },
  reducers: {
    saveCurrentUser: Reducer<any>;
    changeNotifyCount: Reducer<any>;
  }
}

const User: IUserModel = {
  namespace: 'user',
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
            email: userInfo.email,
            phone: userInfo.phone,
            avatar: userInfo.avatar,
            title: userInfo.title,
            group: userInfo.group,
            unreadCount: userInfo.unreadCount,
            signature: userInfo.signature,
            tags: userInfo.tags
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

export default User;
