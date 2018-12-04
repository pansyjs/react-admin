import {
  MOGetBreadcrumbNameMap,
  MOFormatter,
  filterMenuData
} from '@/utils/menu';

export default {
  namespace: 'menu',

  state: {
    menuData: [],
    breadcrumbNameMap: {}
  },

  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes } = payload;
      const menuData = filterMenuData(MOFormatter(routes));
      const breadcrumbNameMap = MOGetBreadcrumbNameMap(menuData);
      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap }
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};
