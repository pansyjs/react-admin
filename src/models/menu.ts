import { Effect } from 'dva';
import { Reducer } from 'redux';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi-plugin-react/locale';
import { SETTING_DEFAULT_CONFIG } from '@/config';

const { menu } = SETTING_DEFAULT_CONFIG;

export interface IMenu {
  authority?: string[] | string;
  children?: IMenu[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: string;
  locale?: string;
  name?: string;
  path: string;
  [key: string]: any;
}

export interface IRoute extends IMenu {
  routes?: IMenu[];
}

interface IMenuModelState {
  menuData: IMenu[];
  routerData: IRoute[];
  breadcrumbNameMap: object;
}

interface IMenuModel {
  namespace: 'menu',
  state: IMenuModelState,
  effects: {
    getMenuData: Effect;
  },
  reducers: {
    saveState: Reducer<any>;
  };
}

// 将路由数据转换为菜单数据
function formatter(
  data: IRoute[],
  parentAuthority?: string[] | string,
  parentName?: string,
): IMenu[] {
  return data
    .filter(item => item.name && item.path)
    .map(item => {
      const locale = `${parentName || 'menu'}.${item.name!}`;
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name!
        : formatMessage({ id: locale, defaultMessage: item.name! });
      const result: IMenu = {
        ...item,
        name,
        locale,
        routes: void 0,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        // Reduce memory usage
        result.children = formatter(item.routes, item.authority, locale);
      }
      return result;
    });
}

// 获取面包屑映射
const getBreadcrumbNameMap = (menuData: IMenu[]) => {
  const routerMap: { [key: string]: IMenu } = {};
  const flattenMenuData: (data: IMenu[]) => void = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneFormatter = memoizeOne(formatter, isEqual);
const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

// 过滤菜单数据
const filterMenuData = (menuData: IMenu[] = []): IMenu[] => {
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .filter(item => item);
};


const MenuModel: IMenuModel = {
  namespace: 'menu',
  state: {
    menuData: [],
    routerData: [],
    breadcrumbNameMap: {}
  },
  effects: {
    *getMenuData({ payload }, { put }) {
      const { routes, authority } = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);

      yield put({
        type: 'saveState',
        payload: {
          menuData,
          breadcrumbNameMap,
          routerData: routes
        }
      });
    }
  },
  reducers: {
    saveState(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};

export default MenuModel;
