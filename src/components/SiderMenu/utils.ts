import PathToRegexp from 'path-to-regexp';

/**
 * 使用递归展平数据
 * @param menus
 */
export function getFlatMenuKeys(menus) {
  let keys = [];
  menus.forEach((item) => {
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
    keys.push(item.path);
  });
  return keys;
}

/**
 * 获取匹配的菜单
 * @param flatMenuKeys
 * @param path
 */
export function getMenuMatches(flatMenuKeys, path) {
  return flatMenuKeys.filter((item) => {
    if (item) {
      return PathToRegexp(item).test(path);
    }
    return false;
  });
}
