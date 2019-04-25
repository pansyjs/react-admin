import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import {
  fetchList,
  fetchModuleList
} from '@/services/action';

export interface IAction {
  id?: string | number;
  name?: string;
  type?: number;
  remark?: string;
}

export interface IModule {
  id?: string | number;
  name?: string;
}

export interface IActionModelState {
  list: IAction[];
  modules: IModule[];
}

export interface IActionModel {
  namespace: 'action',
  state: IActionModelState,
  effects: {
    fetchList: Effect;
    fetchModuleList: Effect;
  },
  reducers: {
    saveList: Reducer<any>;
    saveModules: Reducer<any>;
  }
}

const ActionModel: IActionModel = {
  namespace: 'action',
  state: {
    list: [],
    modules: []
  },
  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const response = yield call(fetchList, payload);

    },
    *fetchModuleList(_, { call, put }) {
      const response = yield call(fetchModuleList);
      if (response && response.code === 200) {
        const data = response.data;

        yield put({
          type: 'saveModules',
          payload: data
        })
      }
    }
  },
  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    },
    saveModules(state, { payload }) {
      return {
        ...state,
        modules: payload
      };
    }
  }
};

export default ActionModel;
