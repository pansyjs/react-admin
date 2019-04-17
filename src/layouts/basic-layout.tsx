import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import store from 'store';
import classNames from 'classnames';
import useMedia from 'react-media-hook2';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import SideMenu, { ISideMenuProps, IMenu } from '@/components/side-menu';
import TabPages, { ITab } from '@/components/tab-pages';
import { moGetPageTitle } from '@/utils/getPageTitle';
import { SETTING_DEFAULT_CONFIG, STORAGE_KEY_DEFAULT_CONFIG } from '@/config';
import { ConnectProps } from '@/models/connect';
import logo from '@/assets/logo.svg';
import Context from './menu-context';
import Header from './header';
import './basic-layout.less';

interface IProps
  extends Required<ConnectProps>, ISideMenuProps {
    prefixCls?: string;
    tabList?: ITab[];
    tabActiveKey?: string;
    breadcrumbNameMap?: { [path: string]: IMenu;
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
const { tabListKey, storageTabActiveKey } = STORAGE_KEY_DEFAULT_CONFIG;

const BasicLayout: React.FC<IProps> = (props) => {
  const {
    dispatch,
    location,
    route,
    menuData,
    tabList,
    tabActiveKey,
    breadcrumbNameMap,
    children
  } = props;
  const { prefixCls, ...restProps } = props;
  const { routes, authority } = route!;

  // constructor
  useState(() => {
    const tabList = store.get(tabListKey) || [];
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
      },
    });
    // 保存Tab数据到全局状态
    dispatch!({
      type: 'global/fetchAddTab',
      payload: {
        tabList,
        location
      }
    });
    // 保存当前活跃Tab Key
    dispatch!({
      type: 'global/saveTabActiveKey',
      payload: store.get(storageTabActiveKey) || ''
    });
  });

  useEffect(() => {
    setTabListData();
  }, [props.location]);

  useEffect(() => {
    const pathname = location.pathname;
    if (!tabActiveKey || tabActiveKey === pathname) return;
    router.push(tabActiveKey);
  }, [props.tabActiveKey]);

  const setTabListData = () => {
    const pathname = location!.pathname;
    if (!pathname) return;

    const menuData = breadcrumbNameMap[pathname];
    if (!menuData) return;

    dispatch!({
      type: 'global/saveTabActiveKey',
      payload: menuData.path
    });

    const tabData = {
      menuData,
      id: pathname
    };

    dispatch!({
      type: 'global/fetchAddTab',
      payload: {
        tabData,
        location
      }
    });
  };

  const handleTabClick = (tabData: ITab) => {
    const { menuData } = tabData;
    dispatch!({
      type: 'global/saveTabActiveKey',
      payload: menuData.path
    });
  };

  const handleTabRemove = (id) => {
    dispatch({
      type: 'global/fetchRemoveTab',
      payload: id
    })
  };

  const isMobile = useMedia({ id: 'BasicLayout', query: '(max-width: 599px)' })[0];

  const layout = (
    <Layout className={prefixCls}>
      {/** 左侧菜单 */}
      <SideMenu
        logo={logo}
        theme={theme}
        menuData={menuData}
        fixedSide={fixedSide}
        {...restProps}
      />

      <Content className={`${prefixCls}__wrapper`}>
        <Header
          isMobile={isMobile}
          {...restProps}
        />
        <TabPages
          onClick={handleTabClick}
          onRemove={handleTabRemove}
          activeKey={tabActiveKey}
          tabList={tabList}
        />
      </Content>
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

BasicLayout.defaultProps = {
  prefixCls: 'lotus-basic-layout'
};

export default connect(({ menu, global }) => ({
  tabActiveKey: global.tabActiveKey,
  tabList: global.tabList,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
}))(BasicLayout);
