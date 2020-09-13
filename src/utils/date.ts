import moment from 'moment';

/**
 * 格式化时间
 * @param date
 * @param format
 */
export function formatDate(
  date: moment.Moment | Date | string | number,
  format = 'YYYY-MM-DD HH:mm:ss'
): string {
  if (!date) return '';
  return moment(date).format(format);
}
