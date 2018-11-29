export type MenuTheme = 'light' | 'dark';
export type layoutType = 'sideMenu' | 'topMenu';

export interface settingsModelState {
  navTheme: MenuTheme;
  primaryColor: string;
  layout: layoutType;
  contentWidth: 'Fluid' | 'Fixed';
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixSideBar: boolean;
}
