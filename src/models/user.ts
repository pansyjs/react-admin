import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchCurrent } from '@/services/user';
import Policy from '@jiumao/policy';
import { IUser } from '@/pages/system/models/system-user';

export interface ICurrentUser extends IUser {
  name?: string;
}

export interface IUserModelState {
  currentUser: ICurrentUser;
  policy: Policy;
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
    savePolicy: Reducer<any>;
    changeNotifyCount: Reducer<any>;
  }
}

const UserModel: IUserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    policy: null
  },
  effects: {
    *fetchCurrent(_, { call, put, select }) {
      const response = yield call(fetchCurrent);
      if (response && response.code === 200) {
        const info = response.data || {};
        const { policies = [] } = info;

        const { actions = [] } = yield select(
          (state) => state.global
        );

        const policy = new Policy(actions);

        policies.forEach(item => {
          policy.addPolicy(item);
        });

        console.log(policy);

        yield put({
          type: 'saveCurrentUser',
          payload: {
            ...info
          }
        });

        yield put({
          type: 'savePolicy',
          payload: policy
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
    savePolicy(state, { payload }) {
      return {
        ...state,
        policy: payload
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

export default UserModel;
