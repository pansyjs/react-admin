import { parse } from 'querystring';
import { RequestData } from '@ant-design/pro-table';
import { SortOrder } from 'antd/lib/table/interface';
import { ParamsType } from '@ant-design/pro-provider';

export const getPageQuery = () => {
  const { href } = window.location;
  const qsIndex = href.indexOf('?');
  const sharpIndex = href.indexOf('#');

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(href.split('?')[1]);
    }

    return parse(href.slice(qsIndex + 1, sharpIndex));
  }

  return {};
};

/**
 * 处理ProTable查询逻辑，以及与接口标准不一致的问题
 * @param params
 * @param sort
 * @param filter
 * @param fetchList
 */
export function handleTableRequest<T, U extends ParamsType = any>(
  params: U & {
    pageSize?: number;
    current?: number;
  },
  sort: {
    [key: string]: SortOrder;
  } = {},
  filter: {
    [key: string]: React.ReactText[];
  } = {},
  fetchList: (params: any) => Promise<API.ResponsePaginationResult<T>>
): Promise<RequestData<T>> {
  return new Promise<RequestData<T>>((resolve, reject) => {
    const { current, pageSize, ...rest } = params || {};

    try {
      fetchList({ page: current, size: pageSize, ...rest, ...filter })
        .then((resData) => {
          const { list = [], total } = resData?.data || {};
          resolve({
            data: list,
            total
          })
        })
        .catch(() => {
          resolve({
            data: [],
            total: 0
          })
        })
    } catch (e) {
      resolve({
        data: [],
        total: 0
      });
    }
  });
}
