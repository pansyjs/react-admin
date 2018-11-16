/**
 * 检查 `value` 是否为承诺（Promise）
 *
 * @since 0.1.0
 * @param {*} value The value to check
 * @return {boolean} Return `true` is a Promise, else `false`
 * @example
 *
 * isPromise(new Promise((resolve, reject) => { // code }))
 * // => true
 *
 * isPromise(3)
 * // => false
 *
 * isPromise('tom')
 * // => false
 *
 */
export function isPromise(value: any): value is Promise<any> {
  return !!value && typeof value.then === 'function';
}

/**
 * 判断值是否已定义
 * @param value
 */
export function isDefined(value: any): boolean {
  return value !== null && value !== undefined;
}
