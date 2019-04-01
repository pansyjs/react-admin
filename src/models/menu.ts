import { Effect } from 'dva';
import { Reducer } from 'redux';
import { IRoute } from 'umi-types';
import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi-plugin-react/locale';
import { SETTING_DEFAULT_CONFIG } from '@/config';

const { menu } = SETTING_DEFAULT_CONFIG;

export interface IMenu {
  path?: string;
  component?: string;
  children?: IMenu[];
  Routes?: string[];
  redirect?: string;
  [key: string]: any;
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
function formatter(routes: IRoute[], parentAuthority: string[], parentName: string): IMenu[] {
  if (!routes) {
    return undefined;
  }
  return routes
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName && parentName !== '/') {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }
      // if enableMenuLocale use item.name,
      // close menu international
      const name = menu.disableLocal
        ? item.name
        : formatMessage({ id: locale, defaultMessage: item.name });
      const result = {
        ...item,
        name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        // Reduce memory usage
        result['children'] = formatter(item.routes, item.authority, locale);
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

// 获取面包屑映射
const getBreadcrumbNameMap: (menuData: IMenu[]) => object = menuData => {
  if (!menuData) {
    return {};
  }
  const routerMap = {};

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

const filterMenuData: (menuData: IMenu[]) => IMenu[] = menuData => {
  if (!menuData) {
    return [];
  }
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
      const { routes, authority, path } = payload;
      const originalMenuData = memoizeOneFormatter(routes, authority, path);
      const menuData = filterMenuData(originalMenuData);
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);

      yield put({
        type: 'save',
        payload: { menuData, breadcrumbNameMap }
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
