import { fetchGetNotice } from '@/services/project';

export default {
  namespace: 'project',

  state: {
    notice: []
  },

  effects: {
    *fetchGetNotice(_, { call, put }) {
      const response = yield call(fetchGetNotice);
      if (response && response.code === 200) {
        const list = response.data;
        yield put({
          type: 'saveNotice',
          payload: Array.isArray(list) ? list : []
        });
      }
    }
  },

  reducers: {
    saveNotice(state, { payload }) {
      return {
        ...state,
        notice: payload
      };
    }
  }
};
