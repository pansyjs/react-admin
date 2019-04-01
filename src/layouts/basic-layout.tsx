import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames';
import { IRoute } from 'umi-types';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import SideMenu from '@/components/side-Menu';
import getPageTitle from '@/utils/getPageTitle';
import { IMenu } from '@/models/menu';
import { SETTING_DEFAULT_CONFIG } from '@/config';
import Context, { IBasicLayoutContext } from './menu-context';
import { FooterView } from './footer';

interface IProps {
  route: IRoute;
  dispatch: (args: any) => void;
  location: Location;
  menuData: IMenu[];
  breadcrumbNameMap: object;
  collapsed: boolean;
}

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};
const { Content } = Layout;
const {
  menu: { theme }
} = SETTING_DEFAULT_CONFIG;

@connect(({ global, menu }) => ({
  collapsed: global.collapsed,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
}))
class BasicLayout extends React.Component<IProps> {
  componentDidMount() {
    const {
      dispatch,
      route: {
        routes,
        authority
      }
    } = this.props;

    // 获取当前用户信息
    dispatch({
      type: 'user/fetchCurrent'
    });
    // 获取菜单数据
    dispatch({
      type: 'menu/getMenuData',
      payload: {
        routes,
        authority
      }
    });
  }

  getContext = (): IBasicLayoutContext => {
    const { location, breadcrumbNameMap } = this.props;

    return {
      location,
      breadcrumbNameMap
    }
  };

  handleMenuCollapse= (payload: boolean) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeCollapsed',
      payload
    });
  };

  render() {
    const {
      breadcrumbNameMap,
      location,
      menuData,
      collapsed,
      children
    } = this.props;

    const layout = (
      <Layout>
        <SideMenu
          theme={theme}
          onCollapse={this.handleMenuCollapse}
          menuData={menuData}
          isMobile={false}
          {...this.props}
        />
        <Layout
          style={{
            paddingLeft: collapsed ? 80 : 256,
            minHeight: '100vh',
          }}
        >
          <Content className="">
            {children}
          </Content>
          <FooterView />
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={getPageTitle(location.pathname, breadcrumbNameMap)}>
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={this.getContext()}>
              <div
                className={classNames(params)}
              >
                {layout}
              </div>
            </Context.Provider>
          )}
        </ContainerQuery>
      </DocumentTitle>
    )
  }
}

export default BasicLayout;
