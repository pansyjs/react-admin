interface ResultParams {
  data?: any;
  code?: number;
  message?: string;
  [key: string]: any
}

/**
 * 包裹请求数据
 * @param data 需要返回的数据
 * @param code 返回的状态码
 * @param message 返回的状态码描述
 */
export function packResult(params?: ResultParams) {
  const {
    data = undefined,
    code = 200,
    message = 'success',
    ...reset
  } = params || {};

  return {
    data,
    code,
    message,
    ...reset
  }
}
