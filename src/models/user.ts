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
            id: userInfo.id,
            username: userInfo.username
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
    }
  }
};
