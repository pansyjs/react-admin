/**
 * 包裹请求数据
 * @param data 需要返回的数据
 * @param code 返回的状态码
 * @param message 返回的状态码描述
 */
export function packResult(
  data: any,
  code: number = 200,
  message: string = 'success'
) {
  return {
    data,
    code,
    message
  }
}
