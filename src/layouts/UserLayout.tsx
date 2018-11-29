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
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>后台管理系统</span>
              </Link>
            </div>
          </div>
          {children}
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
