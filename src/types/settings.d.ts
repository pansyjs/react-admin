export type MenuTheme = 'light' | 'dark';
export type layoutType = 'sideMenu' | 'topMenu';
export type contentWidthType = 'Fluid' | 'Fixed';

export interface settingsModelState {
  navTheme: MenuTheme;
  layout: layoutType;
  contentWidth: contentWidthType;
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixSideBar: boolean;
}
