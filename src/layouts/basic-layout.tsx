import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';
import useMedia from 'react-media-hook2';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import SideMenu, { ISideMenuProps, IMenu } from '@/components/side-Menu';
import { moGetPageTitle } from '@/utils/getPageTitle';
import storage from '@/utils/session-storage';
import { SETTING_DEFAULT_CONFIG, STORAGE_KEY_DEFAULT_CONFIG } from '@/config';
import { ConnectProps } from '@/models/connect';
import logo from '@/assets/logo.svg';
import Context from './menu-context';
import Header from './header';
import Footer from './footer';
import './basic-layout.less';

interface IProps
  extends Required<ConnectProps>, ISideMenuProps {
    breadcrumbNameMap?: { [path: string]: IMenu
  }
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
const { theme, fixedSide } = SETTING_DEFAULT_CONFIG;
const { tabListKey } = STORAGE_KEY_DEFAULT_CONFIG;

const BasicLayout: React.FC<IProps> = (props) => {
  const {
    dispatch,
    location,
    route,
    menuData,
    breadcrumbNameMap,
    children
  } = props;
  const { routes, authority } = route!;

  // constructor
  useState(() => {
    const tabList = storage.get(tabListKey) || [];
    // 获取当前登录用户信息
    dispatch!({
      type: 'user/fetchCurrent'
    });
    // 获取菜单数据
    dispatch!({
      type: 'menu/getMenuData',
      payload: {
        routes,
        authority
      }
    });
    // 保存Tab数据到全局状态
    dispatch!({
      type: 'global/saveTabList',
      payload: tabList
    });
  });

  useEffect(() => {
    setTabListData();
  }, [props.location]);

  const setTabListData = () => {
    const pathname = location!.pathname;
    if (!pathname) return;

    const menuData = breadcrumbNameMap[pathname];
    if (!menuData) return;

    const tabData = {
      location,
      menuData,
      id: uniqueId('tab_')
    };

    dispatch!({
      type: 'global/fetchAddTab',
      payload: tabData
    });
  };

  const isMobile = useMedia({ id: 'BasicLayout', query: '(max-width: 599px)' })[0];

  const layout = (
    <Layout>
      {/** 左侧菜单 */}
      <SideMenu
        logo={logo}
        theme={theme}
        menuData={menuData}
        fixedSide={fixedSide}
        {...props}
      />

      <Layout
        style={{
          paddingLeft: 80,
          minHeight: '100vh',
        }}
      >
        <Header
          isMobile={isMobile}
          {...props}
        />
        <Content className="basic-layout__content">
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );

  return (
    <DocumentTitle title={moGetPageTitle(location!.pathname, breadcrumbNameMap)}>
      <ContainerQuery query={query}>
        {params => (
          <Context.Provider value={{ location, breadcrumbNameMap }}>
            <div className={classNames(params)}>
              {layout}
            </div>
          </Context.Provider>
        )}
      </ContainerQuery>
    </DocumentTitle>
  )
};

export default connect(({ menu, global }) => ({
  tabList: global.tabList,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
}))(BasicLayout);
