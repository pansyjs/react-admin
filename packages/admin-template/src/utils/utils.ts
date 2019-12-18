import Moment from 'moment';

export const urlRegexp = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

// 是否是Url
export function isUrl(path: string): boolean {
  return urlRegexp.test(path);
}

// 格式化时间
export function formatTime(time, formatStr?) {
  return Moment(time).format(formatStr || 'YYYY-MM-DD HH:mm:ss');
}
