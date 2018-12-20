import { fetchList, fetchRemove } from '../services/api';

export default {
  namespace: 'systemApi',

  state: {
    tableData: {
      list: [],
      pagination: {
        current: 1,
        total: 0
      }
    }
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(fetchList, payload);
      if (response && response.data) {
        const { list = [], total = 0 } = response.data;
        yield put({
          type: 'saveTableData',
          payload: {
            list,
            pagination: {
              total
            }
          }
        });
      }
    },
    *fetchRemove({ payload, callback }, { call }) {
      const response = yield call(fetchRemove, payload);
      if (response && response.data) {
        callback && callback();
      }
    }
  },

  reducers: {
    saveTableData(state, { payload }) {
      return {
        ...state,
        tableData: payload
      };
    }
  }
};
