import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import login from './en-US/login';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  ...menu,
  ...login,
  ...globalHeader
};
