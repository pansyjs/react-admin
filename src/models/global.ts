import { fetchQueryNotices } from '@/services/global';

export default {
  name: 'global',

  state: {
    collapsed: false,
    noticeData: []
  },

  effects: {
    *fetchQueryNotices(_, { call, put, select }) {
      const response = yield call(fetchQueryNotices);
      if (response && response.code === 200) {
        console.log(response);
      }
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    },
    saveNoticeData(state, { payload }) {
      return {
        ...state,
        noticeData: payload
      };
    }
  }
};
