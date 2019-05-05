import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchList } from '@/services/permission';

export interface IPolicy {
  id?: string;
  // 权限策略名称
  name?: string;
  // 权限策略类型 0: 系统 1: 用户
  type?: number;
  // 引用次数
  attachmentCount?: number;
  // 备注
  remark?: string;
  createDate?: string;
  updateDate?: string;
  document?: string;
}

export interface IPolicyModelState {
  list: IPolicy[];
}

export interface IPolicyModel {
  namespace: 'policy',
  state: IPolicyModelState,
  effects: {
    fetchList: Effect;
    fetchCreate: Effect;
  },
  reducers: {
    saveList: Reducer<any>;
  }
}

const PolicyModel: IPolicyModel = {
  namespace: 'policy',
  state: {
    list: []
  },
  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);

    },
    *fetchCreate({ payload }, { call, put }) {
      console.log(payload);
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

export default PolicyModel;
