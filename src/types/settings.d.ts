export type MenuTheme = 'light' | 'dark';
export type layoutType = 'sideMenu' | 'topMenu';

export interface settingsModelState {
  navTheme: MenuTheme;
  layout: layoutType;
  contentWidth: 'Fluid' | 'Fixed';
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixSideBar: boolean;
}
