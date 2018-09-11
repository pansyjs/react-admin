import React from 'react';
import { Breadcrumb } from 'antd';
import PathToRegexp from 'path-to-regexp';
import { urlToLiat } from '@utils/index';
import styles from './index.scss';

export interface LotusBreadcrumbProps {
  breadcrumbList?: Array<{ title: React.ReactNode; href?: string }>;
  breadcrumbSeparator?: React.ReactNode;
  linkElement?: React.ReactNode;
  breadcrumbNameMap?: object;
  itemRender?: (menuItem) => React.ReactNode;
  routes?: any[];
  params?: object;
  home?: React.ReactNode;
  location?: any;
}

export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach((item) => {
      if (PathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

class LotusBreadcrumb extends React.PureComponent<LotusBreadcrumbProps, any> {
  constructor(props) {
    super(props);
  }

  /**
   * 渲染Breadcrumb 子节点
   * @param route
   * @param params
   * @param routes
   * @param paths
   */
  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const last = routes.indexOf(route) === routes.length - 1;

    return last || route.component ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      React.createElement(
        linkElement as any,
        {
          href: paths.join('/') || '/',
          to: paths.join('/') || '/'
        },
        route.breadcrumbName
      )
    );
  };

  conversionFromLocation = (location, breadcrumbNameMap) => {
    const {
      breadcrumbSeparator,
      home,
      itemRender,
      linkElement = 'a'
    } = this.props;

    const pathSnippets = urlToLiat(location.pathname);
    // Loop data mosaic routing
    const extraBreadcrumbItems = pathSnippets.map((url, index) => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
      if (currentBreadcrumb.inherited) {
        return null;
      }
      const isLinkable =
        index !== pathSnippets.length - 1 && currentBreadcrumb.component;
      const name = itemRender
        ? itemRender(currentBreadcrumb)
        : currentBreadcrumb.name;
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {React.createElement(
            (isLinkable as any) || 'span',
            { [linkElement === 'a' ? 'href' : 'to']: url },
            name
          )}
        </Breadcrumb.Item>
      ) : null;
    });

    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        {React.createElement(
          linkElement as any,
          {
            [linkElement === 'a' ? 'href' : 'to']: '/'
          },
          home || 'Home'
        )}
      </Breadcrumb.Item>
    );
    return (
      <Breadcrumb className={styles.breadcrumb} separator={breadcrumbSeparator}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    );
  };

  // @ts-ignore
  render() {
    const {
      breadcrumbList,
      breadcrumbSeparator,
      itemRender,
      linkElement,
      routes,
      params,
      breadcrumbNameMap,
      location
    } = this.props;

    if (breadcrumbList && breadcrumbList.length) {
      return (
        <Breadcrumb
          className={styles.breadcrumb}
          separator={breadcrumbSeparator}
        >
          {breadcrumbList.map((item) => {
            const title = itemRender ? itemRender(item) : item.title;
            return (
              <Breadcrumb.Item>
                {item.href
                  ? React.createElement(
                      linkElement as any,
                      {
                        [linkElement === 'a' ? 'href' : 'to']: item.href
                      },
                      title
                    )
                  : title}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      );
    }

    // 如果传入 routes 和 params 属性
    if (routes && params) {
      return (
        <Breadcrumb
          className={styles.breadcrumb}
          routes={routes.filter((route) => route.breadcrumbName)}
          params={params}
          itemRender={this.itemRender}
          separator={breadcrumbSeparator}
        />
      );
    }

    // 根据 location 生成 面包屑
    if (location && location.pathname) {
      return this.conversionFromLocation(location, breadcrumbNameMap);
    }

    return null;
  }
}

export default LotusBreadcrumb;
