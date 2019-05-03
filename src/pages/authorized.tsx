import React from 'react';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import RenderAuthorized from '@/components/authorized';
import Policy, { IAction, IPolicyData } from '@/components/authorized/policy';
import PageLoading from '@/components/page-loading';
import Exception403 from '@/pages/exception/403';
import { ConnectProps } from '@/models/connect';

interface IProps extends ConnectProps {
  actions: IAction[];
  routerData: any[];
  policies: IPolicyData[];
}

let policy: Policy = null;

const AuthComponent: React.FC<IProps> = (props) => {
  const {
    actions,
    location,
    policies,
    children,
    routerData,
    dispatch
  } = props;
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useState(() => {
    // 获取所有操作
    dispatch({
      type: 'global/fetchActions'
    })
    .then(() => {
      // 获取当前登录用户信息 -- 包含权限策略
      dispatch({
        type: 'user/fetchCurrent'
      });
    })
  });

  React.useEffect(() => {
    if (actions.length && policies.length) {
      setLoading(false);
      policy = new Policy(actions);
      policies.forEach(item => {
        policy.addPolicy(item);
      });
    }
  }, [props.actions, props.policies]);

  const getRouteAuthority = (path, routeData) => {
    let authorities = undefined;
    routeData.forEach(route => {
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

  if (loading) {
    return (
      <PageLoading />
    )
  } else {
    const Authorized = RenderAuthorized(policy.getAllAction());
    const authority = getRouteAuthority(location.pathname, routerData);

    return policy ? (
      <Authorized
        authority={policy.verifyAction(authority)}
        noMatch={<Exception403 />}
      >
        {children}
      </Authorized>
    ) : (
      <PageLoading />
    );
  }
};

export default connect(({ menu, user, global }) => ({
  actions: global.actions,
  policies: user.policies,
  routerData: menu.routerData
}))(AuthComponent);

