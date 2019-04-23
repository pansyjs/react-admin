import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { fetchList } from '@/services/action';

export interface IAction {
  id?: string;
  name?: string;
  type?: number;
  remark?: string;
}

export interface IActionModelState {
  list: IAction[];
}

export interface IActionModel {
  namespace: 'action',
  state: IActionModelState,
  effects: {
    fetchList: Effect;
  },
  reducers: {
    saveList: Reducer<any>;
  }
}

const ActionModel: IActionModel = {
  namespace: 'action',
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

export default ActionModel;
