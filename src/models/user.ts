import { fetchCurrentUser } from '@/services/user';

export default {
  name: 'user',

  state: {
    currentUser: {},
    isSuperAdmin: false
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(fetchCurrentUser);
      if (response && response.code === 200) {
        const userInfo = response.data;
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name: userInfo.name,
            avatar: userInfo.avatar,
            unreadCount: userInfo.unreadCount
          }
        });
      }
    }
  },

  reducers: {
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount
        }
      };
    }
  }
};
