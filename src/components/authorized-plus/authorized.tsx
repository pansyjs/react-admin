import React from 'react';
import CheckPermissions, { TAuthority } from './check-permissions';

export interface AuthorizedProps {
  authority?: TAuthority;
  noMatch?: React.ReactNode;
}

const Authorized: React.FC<AuthorizedProps> = ({ children, authority, noMatch }) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  return CheckPermissions(authority, childrenRender, noMatch) as React.ReactElement;
};

export default Authorized;
