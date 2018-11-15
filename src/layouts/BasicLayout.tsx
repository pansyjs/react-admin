import React from 'react';
import { Layout } from 'antd';
import { MenuTheme } from 'antd/es/menu';
import { RouteProps } from 'react-router-dom';
import H from 'history';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import PathToRegexp from 'path-to-regexp';
import memoizeOne from 'memoize-one';
import { connect, SubscriptionAPI } from 'dva';
import { formatMessage } from 'umi/locale';
import { ContainerQuery } from 'react-container-query';
import ClassNames from 'classnames';
import SiderMenu from '@/components/SiderMenu';
import Footer from './Footer';
import logo from '../assets/logo.svg';

const { Content } = Layout;

/**
 * 将路由转换为菜单
 * @param data 路由数组
 * @param parentName 父路由的名称
 */
function formatter(data, parentName?: string) {
  return data
    .map((item) => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        name: formatMessage({ id: locale, defaultMessage: item.name }),
        locale
      };
      if (item.routes) {
        result.children = formatter(item.routes, locale);
      }
      delete result.routes;
      return result;
    })
    .filter((item) => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

// dva setting
export interface SettingState {
  navTheme: MenuTheme;
  layout: 'slideMenu' | 'topMenu';
  fixedHeader: boolean;
}

export interface IBasicLayoutProps extends SubscriptionAPI, SettingState {
  // 通过umi注入 https://github.com/umijs/umi/blob/master/packages/umi/src/renderRoutes.js
  route: {
    routes: RouteProps;
    path: string;
    component: React.ReactNode;
  };
  location: H.Location;
  collapsed: boolean;
  fixSliderBar: boolean;
}

interface State {
  isMobile: boolean;
  rendering: boolean;
  menuData: any[];
}

@connect((global, setting) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  ...setting
}))
class BasicLayout extends React.PureComponent<IBasicLayoutProps, State> {
  private readonly breadcrumbNameMap: any;
  readonly state: State = {
    isMobile: false,
    rendering: true,
    menuData: this.getMenuData()
  };

  constructor(props: IBasicLayoutProps) {
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
    const { fixSliderBar, collapsed, layout } = this.props;
    if (fixSliderBar && layout !== 'topMenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px'
      };
    }
    return null;
  };

  getContentStyle = () => {
    const { fixedHeader } = this.props;
    return {
      margin: '24px 24px 0',
      paddingTop: fixedHeader ? 64 : 0
    };
  };

  render() {
    const {
      navTheme,
      children,
      location: { pathname }
    } = this.props;
    const { isMobile, menuData } = this.state;
    const pageTitle = this.getPageTitle(pathname);

    const layout = (
      <Layout>
        {/* 左侧菜单 **/}
        {isMobile ? null : (
          <SiderMenu
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
