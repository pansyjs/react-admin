import moment, { Moment } from 'moment';

export type TimeRangeInput = (string | Moment)[];

/**
 * 处理查询时间
 *   将开始时间处理为当天 day 00:00:00
 *   将结束时间处理为当天 day 59:59:59
 * @param dates
 * @example
 *   ['2019-11-01', '2019-11-11']
 *   处理成 ['2019-11-01 00:00:00', '2019-11-11 59:59:59']
 *   再转换为时间戳
 */
export function processQueryTimeRange(times: TimeRangeInput = []): number[] {
  if (times.length !== 2) return [];

  return times.map((item, index) => {
    if (!moment.isMoment(item)) {
      item = moment(item);
    }
    if (index === 0) {
      return item.startOf('day').valueOf();
    } else {
      return item.endOf('day').valueOf();
    }
  });
}
