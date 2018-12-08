import React from 'react';
import { Layout } from 'antd';
import H from 'history';
import DocumentTitle from 'react-document-title';
import PathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import Media from 'react-media';
import SideMenu from '@/components/SideMenu';
import { Dispatch } from 'redux';
import { settingsModelState } from '@/types/settings';
import Header from './Header';
import Footer from './Footer';
import logo from '../assets/logo.svg';

const { Content } = Layout;

export interface BasicLayoutProps {
  // 通过umi注入 https://github.com/umijs/umi/blob/master/packages/umi/src/renderRoutes.js
  route: {
    routes: any[];
    path: string;
    component: React.ReactNode;
  };
  dispatch: Dispatch<any>;
  location: H.Location;
  setting: settingsModelState;
  collapsed: boolean;
  fixSliderBar: boolean;
  menuData: any[];
  breadcrumbNameMap: any[];
  isMobile: boolean;
}

interface State {
  rendering: boolean;
}

class BasicLayout extends React.PureComponent<BasicLayoutProps, State> {
  private readonly breadcrumbNameMap: object;
  readonly state: State = {
    rendering: true
  };

  componentDidMount() {
    const {
      dispatch,
      route: { routes }
    } = this.props;
    // 获取当前用户信息
    dispatch({
      type: 'user/fetchCurrent'
    });
    // 获取菜单数据
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes }
    });
  }

  matchParamsPath = (pathname: string) => {
    const { breadcrumbNameMap } = this.props;
    const pathKey = Object.keys(breadcrumbNameMap).find((key) =>
      PathToRegexp(key).test(pathname)
    );
    return breadcrumbNameMap[pathKey];
  };

  getPageTitle = (pathname: string) => {
    const currRouterData = this.matchParamsPath(pathname);

    if (!currRouterData) {
      return 'Ant Design Pro';
    }

    const message = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name
    });

    return `${message} - Ant Design Pro`;
  };

  handleMenuCollapse = (collapsed) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed
    });
  };

  getLayoutStyle = () => {
    const { isMobile } = this.props;
    const {
      collapsed,
      setting: { layout, fixSideBar }
    } = this.props;
    if (fixSideBar && layout !== 'topMenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px'
      };
    }
    return null;
  };

  getContentStyle = () => {
    const {
      setting: { fixedHeader }
    } = this.props;
    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0
    };
  };

  render() {
    const {
      setting: { navTheme },
      children,
      menuData,
      isMobile,
      setting,
      collapsed,
      location: { pathname }
    } = this.props;
    const pageTitle = this.getPageTitle(pathname);

    const layout = (
      <Layout>
        {isMobile ? null : (
          <SideMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh'
          }}
        >
          <Header
            logo={logo}
            setting={setting}
            collapsed={collapsed}
            isMobile={isMobile}
            handleMenuCollapse={this.handleMenuCollapse}
          />
          <Content style={this.getContentStyle()}>{children}</Content>
          <Footer />
        </Layout>
      </Layout>
    );

    return (
      <React.Fragment>
        <DocumentTitle title={pageTitle}>
          <div>{layout}</div>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
  setting
}))((props) => (
  <Media query="(max-width: 599px)">
    {(isMobile) => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
