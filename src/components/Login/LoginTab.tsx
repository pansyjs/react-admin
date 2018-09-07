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
  tabUtil: {
    addTab: (id: string) => void;
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

class wrapContext extends React.Component {
  static typeName: string;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginContext.Consumer>
        {(value) => <LoginTab tabUtil={value.tabUtil} {...this.props} />}
      </LoginContext.Consumer>
    );
  }
}

wrapContext.typeName = 'LoginTab';

export default wrapContext;
