import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
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
import router from "umi/router";

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
    breadcrumbNameMap,
    children
  } = props;
  const { prefixCls, ...restProps } = props;
  const { routes, authority } = route!;
  const [activeKey, setActiveKey] = useState<string>('');

  // constructor
  useState(() => {
    const tabList = store.get(tabListKey) || [];
    const tabActiveKey = store.get(storageTabActiveKey) || '';
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
    // 保存当前活跃Tab Key
    dispatch!({
      type: 'global/saveTabActiveKey',
      payload: tabActiveKey
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
      id: pathname
    };

    dispatch!({
      type: 'global/fetchAddTab',
      payload: tabData
    });
  };

  const handleTabClick = (tabData: ITab) => {
    const { menuData } = tabData;
    setActiveKey(menuData.path);
    dispatch!({
      type: 'global/saveTabActiveKey',
      payload: menuData.path
    });
    router.push(menuData.path);
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
          activeKey={activeKey}
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
