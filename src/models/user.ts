import { Effect } from 'dva';
import { Reducer } from 'redux';
import { fetchCurrent } from '@/services/user';

export interface IUserModelState {
  currentUser: {};
  isSuperAdmin: boolean;
}

export interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    // 获取当前用户信息
    fetchCurrent: Effect;
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
      const response = yield call(fetchCurrent);
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
