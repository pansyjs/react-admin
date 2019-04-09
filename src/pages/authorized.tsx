import React from 'react';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';

interface IProps {

}

const AuthComponent: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div>
      {children}
    </div>
  );
};

export default connect(({ menu }) => ({
  routerData: menu.routerData,
}))(AuthComponent);

