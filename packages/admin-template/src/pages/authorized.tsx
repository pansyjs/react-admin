import React, { useEffect } from 'react';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/components/authorized';
import { Policy } from '@/components/authorized';
import PageLoading from '@/components/page-loading';
import Exception403 from '@/pages/exception/403';
import { ConnectProps, ConnectState } from '@/models/connect';
import { ISidebarMenuProps } from '@/components/sidebar-menu';

interface IProps extends Required<ConnectProps>, ISidebarMenuProps {
  policy: Policy;
  routerData: any[];
  loading: boolean;
}

const AuthComponent: React.FC<IProps> = (props) => {
  const {
    policy,
    loading,
    location,
    children,
    routerData,
    dispatch,
    route: { routes = [] }
  } = props;

  useEffect(() => {
    dispatch({
      type: 'user/fetchCurrent',
      payload: routes
    });
  }, []);

  const getRouteAuthority = (path, routeData) => {
    let authorities = undefined;
    routeData.forEach((route) => {
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };

  if (loading || !policy) {
    return <PageLoading />;
  }

  const authority = getRouteAuthority(location.pathname, routerData);

  return (
    <Authorized authority={authority} noMatch={<Exception403 />}>
      {children}
    </Authorized>
  );
};

AuthComponent.defaultProps = {
  policy: null
};

export default connect(({ menu, user, loading }: ConnectState) => ({
  policy: user.policy,
  routerData: menu.routerData,
  loading: loading['user/fetchCurrent']
}))(AuthComponent);
