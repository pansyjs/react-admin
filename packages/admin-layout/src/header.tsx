import React, { FC } from 'react';
import { Layout } from 'antd';
import GlobalHeader from './components/global-header';

const { Header } = Layout;

export interface HeaderViewProps {}

const HeaderView: FC<HeaderViewProps> = (props) => {
  return <Header></Header>;
};

export default HeaderView;
