export interface settingsModelSate {
  navTheme: 'dark' | 'light';
  primaryColor: string;
  layout: 'sideMenu' | 'topMenu';
  contentWidth: 'Fluid' | 'Fixed';
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixSideBar: boolean;
}
