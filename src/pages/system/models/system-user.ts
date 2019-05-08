import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import {
  fetchList,
  fetchCreate,
  fetchRemove,
  fetchUpdate
} from '@/services/user';
import { IPolicyData } from '@/components/authorized/policy';
import { IPagination } from '@/pages/global';
import { formatTime } from '@/utils/utils';

export interface IUser {
  id?: string | number;
  username?: string;
  avatar?: string;
  email?: string;
  mobile?: string;
  remark?: string;
}

export interface ITable {
  list: IUser[];
  pagination: IPagination;
}

export interface ISystemUserModelState {
  list: IUser[],
  table: ITable
  policies: IPolicyData[];
}

export interface ISystemUserModel {
  namespace: 'systemUser';
  state: ISystemUserModelState;
  effects: {
    // 获取用户列表
    fetchList: Effect;
    fetchCreate: Effect;
    fetchRemove: Effect;
    fetchUpdate: Effect;
  },
  reducers: {
    saveTable: Reducer<any>;
    savePolicies: Reducer<any>;
  }
}

const SystemUserModel: ISystemUserModel = {
  namespace: 'systemUser',
  state: {
    list: [],
    table: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      }
    },
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
    *fetchCreate({ payload, callback }, { call }) {
      const response = yield call(fetchCreate, payload);
      if (response && response.code === 200) {
        callback && callback();
      }
    },
    *fetchRemove({ payload, callback }, { call }) {
      const response = yield call(fetchRemove, payload);
      if (response && response.code === 200) {
        callback && callback();
      }
    },
    *fetchUpdate({ payload, callback }, { call }) {
      const response = yield call(fetchUpdate, payload);
      if (response && response.code === 200) {
        callback && callback();
      }
    }
  },
  reducers: {
    saveTable(state, { payload }) {
      return {
        ...state,
        table: payload
      };
    },
    savePolicies(state, { payload }) {
      return {
        ...state,
        policies: payload
      };
    }
  }
};

export default SystemUserModel;
