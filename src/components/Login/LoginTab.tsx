import React from 'react';
import { Tabs } from 'antd';
import { TabPaneProps } from 'antd/es/tabs';
import { Consumer } from './index';

const { TabPane } = Tabs;

const generateId = (() => {
  let i = 0;
  return (prefix: string) => {
    i += 1;
    return `${prefix || ''}${i}`;
  };
})();

export interface LoginTabProps extends TabPaneProps {
  tabUtil?: {
    addTab: (id: string) => void;
    removeTab: (id: string) => void;
  };
}

class LoginTab extends React.Component<LoginTabProps, any> {
  readonly uniqueId: string;

  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  componentWillMount() {
    const { tabUtil } = this.props;
    tabUtil.addTab(this.uniqueId);
  }

  render() {
    const { children } = this.props;
    return <TabPane {...this.props}>{children}</TabPane>;
  }
}

class WrapContext extends React.Component<LoginTabProps, any> {
  static readonly typeName = 'LoginTab';

  render() {
    return (
      <Consumer>
        {(value) => <LoginTab tabUtil={value.tabUtil} {...this.props} />}
      </Consumer>
    );
  }
}

export default WrapContext;
