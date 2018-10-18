import React from 'react';
import {
  formatMessage,
  FormattedMessage,
  setLocale,
  getLocale
} from 'umi/locale';
import { Menu, Icon, Dropdown } from 'antd';
import ClassNames from 'classnames';
import styles from './index.less';

export interface SelectLangProps {
  className?: string;
}

class SelectLang extends React.PureComponent<SelectLangProps, any> {
  constructor(props) {
    super(props);
  }

  changLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();

    const langMenu = (
      <Menu
        className={styles.menu}
        selectedKeys={[selectedLang]}
        onClick={this.changLang}
      >
        <Menu.Item key="zh-CN">
          <FormattedMessage id="lang.simplified-chinese" />
        </Menu.Item>
        <Menu.Item key="zh-TW">
          <FormattedMessage id="lang.traditional-chinese" />
        </Menu.Item>
        <Menu.Item key="en-US">
          <FormattedMessage id="lang.english" />
        </Menu.Item>
        <Menu.Item key="pt-BR">
          <FormattedMessage id="lang.portuguese" />
        </Menu.Item>
      </Menu>
    );

    const cls = ClassNames(styles.dropDown, className);

    return (
      <Dropdown overlay={langMenu}>
        <Icon
          type="global"
          className={cls}
          title={formatMessage({ id: 'navBar.lang' })}
        />
      </Dropdown>
    );
  }
}

export default SelectLang;
