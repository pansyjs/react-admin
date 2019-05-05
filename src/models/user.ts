import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchList, fetchCurrent } from '@/services/user';
import { IPolicyData } from '@/components/authorized/policy';
import { IPagination } from '@/pages/global';
import { formatTime } from '@/utils/utils';

export interface ICurrentUser {
  name?: string;
  avatar?: string;
  email?: string;
}

export interface IUser {
  id?: string | number;
  name?: string;
  avatar?: string;
  email?: string;
}

export interface IUserTable {
  list: IUser[];
  pagination: IPagination;
}

export interface IUserModelState {
  table: IUserTable
  currentUser: ICurrentUser;
  policies: IPolicyData[];
}

export interface IUserModel {
  namespace: 'user';
  state: IUserModelState;
  effects: {
    // 获取用户列表
    fetchList: Effect;
    // 获取当前用户信息
    fetchCurrent: Effect;
  },
  reducers: {
    saveTable: Reducer<any>;
    savePolicies: Reducer<any>;
    saveCurrentUser: Reducer<any>;
    changeNotifyCount: Reducer<any>;
  }
}

const UserModel: IUserModel = {
  namespace: 'user',
  state: {
    table: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      }
    },
    currentUser: {},
    policies: []
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);
      if (response && response.code === 200) {
        const data = response.data || {};
        const { list = [], total = 0 } = data;

        const users = list.map(item => {
          return {
            ...item,
            createTime: formatTime(item.createTime)
          }
        });

        yield put({
          type: 'saveTable',
          payload: {
            list: users,
            pagination: {
              total,
              current: payload.page,
              pageSize: payload.limit
            }
          }
        })
      }
    },
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
    saveTable(state, { payload }) {
      return {
        ...state,
        table: payload
      };
    },
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

export default UserModel;
