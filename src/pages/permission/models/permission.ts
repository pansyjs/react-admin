import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchList } from '@/services/permission';

export interface IPermission {
  id?: string;
  // 权限策略名称
  name?: string;
  // 权限策略类型 0: 系统 1: 用户
  type?: number;
  // 引用次数
  attachmentCount?: number;
  // 备注
  remark?: string;
}

export interface IPermissionModelState {
  list: IPermission[];
}

export interface IPermissionModel {
  namespace: 'permission',
  state: IPermissionModelState,
  effects: {
    fetchList: Effect;
  },
  reducers: {
    saveList: Reducer<any>;
  }
}

const PermissionModel: IPermissionModel = {
  namespace: 'permission',
  state: {
    list: []
  },
  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const response = yield call(fetchList, payload);

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

export default PermissionModel;
