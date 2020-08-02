import React, { FC, useEffect } from 'react';
import { Tabs } from 'antd';
import LoginContext, { LoginContextProps } from './context';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

type TabPaneProps = Parameters<typeof Tabs.TabPane>[0];

interface LoginTabProps extends TabPaneProps {
  tabUtil: LoginContextProps['tabUtil'];
  active?: boolean;
}

const LoginTab: FC<LoginTabProps> = (props) => {
  useEffect(() => {
    const uniqueId = generateId('login-tab-');
    const { tabUtil } = props;
    if (tabUtil) {
      tabUtil.addTab(uniqueId);
    }
  }, []);
  const { children } = props;
  return <TabPane {...props}>{props.active && children}</TabPane>;
};

const WrapContext: FC<TabPaneProps> & {
  typeName: string;
} = (props) => (
  <LoginContext.Consumer>
    {(value) => <LoginTab tabUtil={value.tabUtil} {...props} />}
  </LoginContext.Consumer>
);

WrapContext.typeName = 'LoginTab';

export default WrapContext;
