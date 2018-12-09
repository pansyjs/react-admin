import { fetchQueryNotices } from '@/services/global';

export default {
  name: 'global',

  state: {
    collapsed: false,
    notices: []
  },

  effects: {
    *fetchQueryNotices(_, { call, put, select }) {
      const response = yield call(fetchQueryNotices);
      if (response && response.code === 200) {
        const notices = response.data || [];
        yield put({
          type: 'saveNotices',
          payload: notices
        });
        const unreadCount = yield select(
          (state) => state.global.notices.filter((item) => !item.read).length
        );
        yield put({
          type: 'user/changeNotifyCount',
          payload: {
            totalCount: notices.length,
            unreadCount
          }
        });
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
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload
      };
    }
  }
};
