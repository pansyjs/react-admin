/**
 * 判断值是否为Promise
 * @param obj
 */
export function isPromise(obj: any): obj is Promise<any> {
  return !!obj && typeof obj.then === 'function';
}

/**
 * 判断值是否已定义
 * @param val
 */
export function isDefined(val: any): boolean {
  return val !== null && val !== undefined;
}
