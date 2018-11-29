import { settingsModelSate } from '@/types/settings';

const defaultSettings: settingsModelSate = {
  navTheme: 'dark',
  primaryColor: '#1890FF',
  layout: 'sideMenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSideBar: false
};

export default defaultSettings;
