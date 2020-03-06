import React, { FC } from 'react';
import BasicLayout from './basic-layout';

const MainLayout: FC<any> = (props) => {
  return (
    <BasicLayout {...props} />
  )
};

export default MainLayout;
