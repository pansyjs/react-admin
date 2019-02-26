import { fetchPage } from '../services/account';

export default {
  namespace: 'systemAccount',

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
    *fetchPage({ payload }, { call, put }) {
      const response = yield call(fetchPage, payload);
      if (response && response.code === 200) {
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
