import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import Authorized from './authorized';
import { Authority } from './check-permissions';

export interface AuthorizedRouteProps extends RouteProps {
  authority: Authority;
  redirectPath: string;
}

// TODO: umi只会返回render和rest
const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
   component: Component,
   render,
   authority,
   redirectPath,
   ...rest
 }) => (
  <Authorized
    authority={authority}
    noMatch={
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: redirectPath }} />}
      />}

  >
    <Route
      {...rest}
      render={props => (Component ? <Component {...props} /> : render(props))}
    />
  </Authorized>
);

export default AuthorizedRoute;
