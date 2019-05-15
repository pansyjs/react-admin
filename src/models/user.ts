import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchCurrent } from '@/services/user';
import { IPolicyData } from '@jiumao/policy';
import { IUser } from '@/pages/system/models/system-user';

export interface ICurrentUser extends IUser {
  name?: string;
}

export interface IUserModelState {
  currentUser: ICurrentUser;
  policies: IPolicyData[];
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
    savePolicies: Reducer<any>;
    changeNotifyCount: Reducer<any>;
  }
}

const UserModel: IUserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    policies: []
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(fetchCurrent);
      if (response && response.code === 200) {
        const info = response.data || {};
        const { policies } = info;

        yield put({
          type: 'saveCurrentUser',
          payload: {
            ...info
          }
        });

        yield put({
          type: 'savePolicies',
          payload: policies
        })
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
    savePolicies(state, { payload }) {
      return {
        ...state,
        policies: payload
      };
    },
    changeNotifyCount(state, { payload }) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: payload.totalCount,
          unreadCount: payload.unreadCount
        }
      };
    }
  }
};

// @ts-ignore
export default UserModel;
