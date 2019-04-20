import React from 'react';
import Link from 'umi/link';
import classNames from 'classnames';
import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/es/page-header';
import MenuContext from '@/layouts/menu-context';
import { urlToList } from '@/utils/path-tools';
import './page-header-wrapper.less';

interface IProps extends PageHeaderProps {
  wrapperClassName?: string;
}

const PageHeaderWrapper: React.FC<IProps> = (props) => {
  const { wrapperClassName, prefixCls, ...restProps } = props;

  const getRoutes = (pathname, breadcrumbNameMap) => {
    const pathSnippets = urlToList(pathname);
    const routes = [];

    pathSnippets.forEach((url) => {
      const menuData = breadcrumbNameMap[url];
      routes.push({
        path: menuData.path,
        breadcrumbName: menuData.name,
      });
    });

    return routes;
  };

  const itemRender = (route, params, routes) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last
      ? <span>{route.breadcrumbName}</span>
      : <Link to={route.path}>{route.breadcrumbName}</Link>;
  };

  return (
    <div
      className={classNames(wrapperClassName, {
        [`${prefixCls}`]: true
      })}
    >
      <MenuContext.Consumer>
        {value => {
          const { location, breadcrumbNameMap } = value;
          const pathname = location!.pathname;
          const routes = getRoutes(pathname, breadcrumbNameMap);
          return (
            <PageHeader
              breadcrumb={{
                itemRender,
                routes
              }}
              {...restProps}
            />
          )
        }}
      </MenuContext.Consumer>
    </div>
  )
};

PageHeaderWrapper.defaultProps = {
  prefixCls: 'lotus-page-header-wrapper'
};

export default PageHeaderWrapper;
