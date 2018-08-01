import * as React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

/**
 * 生成ID
 */
const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export interface LoginTabProps {
  tabUtil: object
}

export default class LoginTab extends React.Component {

  private uniqueId: string;

  constructor(props) {
    super(props);
    this.uniqueId = generateId('login-tab-');
  }

  componentWillMount() {

  }

  render() {
    return <TabPane />;
  }
}
