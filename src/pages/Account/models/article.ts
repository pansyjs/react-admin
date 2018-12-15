import { fetchList } from '@/services/article';

export default {
  namespace: 'article',

  state: {
    list: []
  },

  effects: {
    *fetchList(_, { call, put }) {
      const response = yield call(fetchList);
      if (response && response.code === 200) {
        const list = response.data;
        yield put({
          type: 'saveList',
          payload: Array.isArray(list) ? list : []
        });
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
