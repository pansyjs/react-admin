import React from 'react';
import Link from 'umi/link';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '@/assets/logo.svg';

const copyright = (
  <React.Fragment>
    Copyright <Icon type="copyright" /> 2018 JiuMao技术部出品
  </React.Fragment>
);

class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>

        <div className={styles.content}>
          <img alt="logo" className={styles.logo} src={logo} />
          {children}
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
