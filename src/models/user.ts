import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchCurrent } from '@/services/user';
import { Policy } from '@/components/authorized';
import { Action } from '@pansy/policy';
import { fetchList } from '@/services/action';

export interface IUserModelState {
  policy: Policy;
  actions: Action[];
  currentUser: APP.ICurrentUser;
}

export interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    // 获取当前用户信息
    fetchCurrent: Effect;
  };
  reducers: {
    savePolicy: Reducer<any>;
    saveActions: Reducer<any>;
    saveCurrentUser: Reducer<any>;
    changeNotifyCount: Reducer<any>;
  };
}

const UserModel: IUserModel = {
  namespace: 'user',
  state: {
    policy: null,
    actions: [],
    currentUser: {}
  },
  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      // 获取用户信息以及所有权限信息
      const responses = yield [call(fetchCurrent), call(fetchList)];

      if (responses.length !== 2) return;

      const response1 = responses[0];
      const response2 = responses[1];

      if (response1.code === 200 && response2.code === 200) {
        const list = response2.data;
        const info = response1.data || {};
        const { policies = [] } = info;

        // 所有权限
        const actions = list.map((item) => ({
          module: item.module.name,
          action: item.name
        }));

        const policy = new Policy(actions);

        policies.forEach((item) => {
          policy.addPolicy(item);
        });

        yield put({
          type: 'saveActions',
          payload: actions
        });

        yield put({
          type: 'saveCurrentUser',
          payload: {
            ...info
          }
        });

        yield put({
          type: 'savePolicy',
          payload: policy
        });

        yield put({
          type: 'menu/getMenuData',
          payload: {
            policy,
            routes: payload
          }
        });
      }
    }
  },
  reducers: {
    savePolicy(state, { payload }) {
      return {
        ...state,
        policy: payload
      };
    },
    saveActions(state, { payload }) {
      return {
        ...state,
        actions: payload
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload
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
