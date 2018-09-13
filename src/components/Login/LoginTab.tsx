import React from 'react';
import { Tabs } from 'antd';
import LoginContext from './LoginContext';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export interface LoginTabProps {
  key?: string;
  tab?: React.ReactNode;
}

class LoginTab extends React.Component<LoginTabProps, any> {
  readonly uniqueId: string;

  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  componentWillMount() {
    // const { tabUtil } = this.props;
    // tabUtil.addTab(this.uniqueId);
  }

  render() {
    const { children } = this.props;
    return <TabPane {...this.props}>{children}</TabPane>;
  }
}

export default LoginTab;
