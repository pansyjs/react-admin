import globalHeader from './en-US/globalHeader';
import exception from './en-US/exception';
import menu from './en-US/menu';
import login from './en-US/login';
import settings from './en-US/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  ...menu,
  ...login,
  ...settings,
  ...exception,
  ...globalHeader
};
