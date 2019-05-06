import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchList, fetchCreate, fetchRemove } from '@/services/group';
import { IPagination } from '@/pages/global';
import { formatTime } from '@/utils/utils';

export interface IGroup {
  id?: string | number;
  name?: string;
  displayName?: string;
  userNumber?: number;
  remark?: string;
  createTime?: string;
}

export interface IGroupTable {
  list: IGroup[];
  pagination?: IPagination;
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
    fetchCreate: Effect;
    fetchRemove: Effect;
  },
  reducers: {
    saveTable: Reducer<any>;
  }
}

const UserGroupModel: IUserGroupModel = {
  namespace: 'userGroup',
  state: {
    table: {
      list: []
    }
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);
      if (response && response.code === 200) {
        const data = response.data || {};
        const { list = [], total = 0 } = data;

        const groups = list.map(item => {
          return {
            ...item,
            createTime: formatTime(item.createTime)
          }
        });

        yield put({
          type: 'saveTable',
          payload: {
            list: groups,
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
  },
  reducers: {
    saveTable(state, { payload }) {
      return {
        ...state,
        table: payload
      };
    },
  }
};

export default UserGroupModel;
