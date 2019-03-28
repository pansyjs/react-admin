import globalHeader from './zh-CN/globalHeader';
import exception from './zh-CN/exception';
import menu from './zh-CN/menu';
import login from './zh-CN/login';
import settings from './zh-CN/settings';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  ...menu,
  ...login,
  ...settings,
  ...exception,
  ...globalHeader
};
