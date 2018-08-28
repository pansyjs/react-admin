import React from 'react';

const defaultValue = {
  tabUtil: {
    addTab: () => {},
    removeTab: () => {}
  },
  updateActive: () => {}
};

const LoginContext = React.createContext(defaultValue);
export default LoginContext;
