import globalHeader from './en-US/globalHeader';
import exception from './en-US/exception';
import menu from './en-US/menu';
import login from './en-US/login';
import validation from './en-US/validation';
import settings from './en-US/settings';

export default {
  'navBar.lang': 'Languages',
  ...menu,
  ...login,
  ...validation,
  ...settings,
  ...exception,
  ...globalHeader
};
