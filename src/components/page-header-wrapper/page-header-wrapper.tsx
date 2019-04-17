import React from 'react';
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

    pathSnippets.forEach((url, index) => {
      const menuData = breadcrumbNameMap[url];
      routes.push({
        path: menuData.path,
        breadcrumbName: menuData.name,
      });
    });

    return routes;
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
              breadcrumb={{ routes }}
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
