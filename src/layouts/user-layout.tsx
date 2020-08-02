import React, { FC } from 'react';
import { Link, useIntl } from 'umi';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  DefaultFooter,
  MenuDataItem,
  getMenuData,
  getPageTitle,
  BasicLayoutProps as ProLayoutProps,
} from '@ant-design/pro-layout';
import SelectLang from '@/components/select-lang';
import logo from '@/assets/logo.svg';
import styles from './user-layout.less';

export interface UserLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  location: ProLayoutProps['location'];
  route: ProLayoutProps['route'];
}

const UserLayout: FC<UserLayoutProps> = (props) => {
  const {
    children,
    location = {
      pathname: '',
    },
    route = {
      routes: [],
    }
  } = props;
  const { formatMessage } = useIntl();

  const { routes = [] } = route;
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>Admin Template</span>
                </Link>
              </div>
              <div className={styles.desc}>
                一个示例丰富、开箱即用的开发模板
              </div>
            </div>
            {children}
          </div>
        <DefaultFooter links={[]} copyright="2020 AlitaJS团队出品" />
      </div>
    </HelmetProvider>
  )
}

export default UserLayout;
