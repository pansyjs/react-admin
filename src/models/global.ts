import { Reducer } from 'redux';
import { fetchNotices } from '@/services/global';
import { fetchList } from '@/services/action';
import { IAction } from '@/components/authorized/policy';
import { Effect } from '@/models/connect';

export interface IGlobalModelState {
  actions: IAction[];
  notices: any[];
}

export interface IGlobalModel {
  name: 'global',
  state: IGlobalModelState,
  effects: {
    fetchQueryNotices: Effect;
    fetchActions: Effect;
  },
  reducers: {
    saveNotices: Reducer<any>;
    saveActions: Reducer<any>;
  }
}

const GlobalModel: IGlobalModel = {
  name: 'global',
  state: {
    actions: [],
    notices: []
  },
  effects: {
    *fetchActions(_, { call, put }) {
      const response = yield call(fetchList);
      if (response && response.code === 200) {
        const list = response.data;

        const actions: IAction[] = list.map(item => ({
          module: item.module,
          name: item.name
        }));

        yield put({
          type: 'saveActions',
          payload: actions
        });
      }
    },
    *fetchQueryNotices(_, { call, put, select }) {
      const response = yield call(fetchNotices);
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
    },
  },
  reducers: {
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload
      };
    },
    saveActions(state, { payload }) {
      return {
        ...state,
        actions: payload
      };
    }
  }
};

export default GlobalModel;
