import MemoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { formatMessage } from 'umi/locale';

export interface Formatter {
  (
    routes: any[],
    parentAuth?: string,
    parentName?: string,
    paths?: any[]
  ): any[];
}

/**
 * 将路由数据转化为菜单数据
 * @param routes
 * @param parentAuth
 * @param parentName
 * @param paths
 */
export const formatter: Formatter = function(
  routes,
  parentAuth,
  parentName,
  paths
) {
  return routes
    .map((item) => {
      if (!item.name || !item.path) {
        return null;
      }

      // 处理多语言
      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        name: formatMessage({ id: locale, defaultMessage: item.name }),
        locale,
        auth: item.auth || parentAuth || 'on'
      };

      // 处理权限
      if (result.auth === 'on' && paths && paths.length) {
        if (!paths.includes(item.path)) {
          return null;
        }
      }

      if (item.routes) {
        // Reduce memory usage
        result.children = formatter(item.routes, item.auth, locale, paths);
      }

      delete result.routes;
      return result;
    })
    .filter((item) => item);
};

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = (menuData) => {
  const routerMap = {};

  const flattenMenuData = (data) => {
    data.forEach((menuItem) => {
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

// 过滤需要隐藏的菜单
export const filterMenuData = (menuData) => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter((item) => item.name && !item.hideInMenu)
    .filter((item) => item);
};

export const MOGetBreadcrumbNameMap = MemoizeOne(getBreadcrumbNameMap, isEqual);
export const MOFormatter = MemoizeOne(formatter, isEqual);
