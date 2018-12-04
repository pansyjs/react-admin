import React from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;

export const copyright = (
  <React.Fragment>
    Copyright <Icon type="copyright" /> 2018 JiuMao技术部出品
  </React.Fragment>
);

class FooterView extends React.Component {
  render() {
    return (
      <Footer style={{ padding: 0 }}>
        <GlobalFooter copyright={copyright} />
      </Footer>
    );
  }
}

export default FooterView;
