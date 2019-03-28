import React from 'react';
import { Menu } from 'antd';
import { Location } from 'history';
import { MenuMode } from 'antd/es/menu';
import router from 'umi/router';
import { FormattedMessage } from 'umi/locale';
import { Component } from '@/components/BaseComponent';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Layout.less';

export interface SettingsLayoutProps {
  location: Location;
}

interface State {
  readonly mode: MenuMode;
  readonly selectKey: string;
}

const { Item } = Menu;

const menuMap = {
  base: (
    <FormattedMessage
      id="app.settings.menuMap.basic"
      defaultMessage="Basic Settings"
    />
  ),
  security: (
    <FormattedMessage
      id="app.settings.menuMap.security"
      defaultMessage="Security Settings"
    />
  ),
  binding: (
    <FormattedMessage
      id="app.settings.menuMap.binding"
      defaultMessage="Account Binding"
    />
  ),
  notification: (
    <FormattedMessage
      id="app.settings.menuMap.notification"
      defaultMessage="New Message Notification"
    />
  )
};

class SettingsLayout extends Component<SettingsLayoutProps, State> {
  private main: React.ReactNode;

  readonly state: State = {
    mode: 'inline',
    selectKey: 'base'
  };

  componentDidMount() {
    const {
      location: { pathname },
      match
    } = this.props;

    const key = pathname.replace(`${match.path}/`, '');

    this.setState({
      selectKey: menuMap[key] ? key : 'base'
    });
  }

  getMenu = () => {
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  selectKey = ({ key }) => {
    router.push(`/account/settings/${key}`);
    this.setState({
      selectKey: key
    });
  };

  getRightTitle = () => {
    const { selectKey } = this.state;
    return menuMap[selectKey];
  };

  render() {
    const { children } = this.props;
    const { mode, selectKey } = this.state;

    return (
      <GridContent>
        <div
          className={styles.main}
          ref={(ref) => {
            this.main = ref;
          }}
        >
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={this.selectKey}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {children}
          </div>
        </div>
      </GridContent>
    );
  }
}

export default SettingsLayout;
