export const regexpMap = {
  urlRegexp: /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
};

/**
 * 检查 `value` 是否是url
 * @param value
 * @return {*}
 */
export function isUrl(value) {
  return regexpMap.urlRegexp.test(value);
}
