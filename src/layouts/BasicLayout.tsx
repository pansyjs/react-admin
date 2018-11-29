import React from 'react';
import { Layout } from 'antd';
import H from 'history';
import DocumentTitle from 'react-document-title';
import PathToRegexp from 'path-to-regexp';
import { connect, SubscriptionAPI } from 'dva';
import { formatMessage } from 'umi/locale';
import SideMenu from '@/components/SideMenu';
import { settingsModelState } from '@/types/settings';
import { memoizeOneFormatter } from '@/utils/authority';
import Footer from './Footer';
import logo from '../assets/logo.svg';

const { Content } = Layout;

export interface BasicLayoutProps extends SubscriptionAPI {
  // 通过umi注入 https://github.com/umijs/umi/blob/master/packages/umi/src/renderRoutes.js
  route: {
    routes: any[];
    path: string;
    component: React.ReactNode;
  };
  setting: settingsModelState;
  location: H.Location;
  collapsed: boolean;
  fixSliderBar: boolean;
}

interface State {
  isMobile: boolean;
  rendering: boolean;
  menuData: any[];
}

@connect(({ global, setting }) => ({
  collapsed: global.collapsed,
  setting
}))
class BasicLayout extends React.PureComponent<BasicLayoutProps, State> {
  private readonly breadcrumbNameMap: object;
  readonly state: State = {
    isMobile: false,
    rendering: true,
    menuData: this.getMenuData()
  };

  constructor(props: BasicLayoutProps) {
    super(props);
    this.breadcrumbNameMap = this.getBreadcrumbNameMap();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent'
    });
  }

  getMenuData() {
    const {
      route: { routes }
    } = this.props;

    return memoizeOneFormatter(routes);
  }

  matchParamsPath = (pathname: string) => {
    const pathKey = Object.keys(this.breadcrumbNameMap).find((key) =>
      PathToRegexp(key).test(pathname)
    );
    return this.breadcrumbNameMap[pathKey];
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

  /**
   * 获取面包屑映射
   */
  getBreadcrumbNameMap() {
    const routerMap = {};
    const mergeMenuAndRouter = (data) => {
      data.forEach((menuItem) => {
        if (menuItem.children) {
          mergeMenuAndRouter(menuItem.children);
        }
        // Reduce memory usage
        routerMap[menuItem.path] = menuItem;
      });
    };
    mergeMenuAndRouter(this.getMenuData());
    return routerMap;
  }

  handleMenuCollapse = (collapsed) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed
    });
  };

  getLayoutStyle = () => {
    const { isMobile } = this.state;
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
      location: { pathname }
    } = this.props;
    const { isMobile, menuData } = this.state;
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
          <Content style={this.getContentStyle()}>{children}</Content>
          {/** 页面底部 */}
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

export default BasicLayout;
