import { Effect } from 'dva';
import storage from '@/utils/session-storage';
import isArray from 'lodash/isArray';
import { Reducer } from 'redux';
import H from 'history';
import { STORAGE_KEY_DEFAULT_CONFIG } from '@/config';
import { IMenu } from '@/components/side-menu';
import { fetchNotices } from '@/services/global';

export interface ITabData {
  id: string;
  location: H.Location,
  menuData: IMenu
}

export interface IGlobalModelState {
  notices: [];
  tabList: ITabData[];
}

export interface IGlobalModel {
  name: 'global',
  state: IGlobalModelState,
  effects: {
    fetchQueryNotices: Effect;
    fetchAddTab: Effect;
    fetchRemoveTab: Effect;
  },
  reducers: {
    saveNotices: Reducer<any>;
    saveTabList: Reducer<any>;
  }
}

const { tabListKey } = STORAGE_KEY_DEFAULT_CONFIG;

const Global: IGlobalModel = {
  name: 'global',
  state: {
    notices: [],
    tabList: []
  },
  effects: {
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
    *fetchAddTab({ payload }, { call, put, select }) {
      // 获取当前TabList数据
      const currentTabList = yield select((state) => state.global.tabList);
      const { location } = payload;
      const pathname = location!.pathname;
      if (!pathname) return;

      // 页面已存在则返回
      let result = false;
      currentTabList.forEach(item => {
        if (item.location.pathname === pathname) {
          result = true;
        }
      });
      if (result) return;

      let nextTabList = [];

      if (isArray(currentTabList)) {
        nextTabList = [...currentTabList, payload]
      } else {
        nextTabList.push(payload);
      }

      storage.set(tabListKey, nextTabList);

      yield put({
        type: 'saveTabList',
        payload: nextTabList
      });
    },
    *fetchRemoveTab({ payload }, { call, put, select }) {
      let tabList = yield select((state) => state.global.tabList);

      const tabId = payload;
      if (!tabId) return;

      tabList = tabList.filter(item => item.id !== tabId);

      storage.set(tabListKey, tabList);

      yield put({
        type: 'saveTabList',
        payload: tabList
      });
    }
  },
  reducers: {
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload
      };
    },
    saveTabList(state, { payload }) {
      return {
        ...state,
        tabList: payload
      };
    },
  }
};

export default Global;
