import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchList } from '@/services/user';
import { IPagination } from '@/pages/global';

export interface IGroup {
  id?: string | number;
  name?: string;
}

export interface IGroupTable {
  list: IGroup[];
  pagination: IPagination;
}

export interface IUserGroupModelState {
  table: IGroupTable;
}

export interface IUserGroupModel {
  namespace: 'userGroup';
  state: IUserGroupModelState;
  effects: {
    // 获取用户列表
    fetchList: Effect;
  },
  reducers: {
    saveList: Reducer<any>;
  }
}

const UserGroupModel: IUserGroupModel = {
  namespace: 'userGroup',
  state: {
    table: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      }
    }
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);
      if (response && response.code === 200) {
        const data = response.data || {};
      }
    }
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    }
  }
};

export default UserGroupModel;
