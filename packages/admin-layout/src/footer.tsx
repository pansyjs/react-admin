import React, { Fragment, CSSProperties } from 'react';
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';
import GlobalFooter from './components/global-footer';
import { WithFalse } from './typings';

interface LinkType {
  key?: string;
  title: React.ReactNode;
  href: string;
  blankTarget?: boolean;
}

export interface FooterProps {
  links?: WithFalse<LinkType[]>;
  copyright?: WithFalse<String>;
  style?: CSSProperties;
  className?: string;
}

const { Footer } = Layout;
const defaultCopyright = '2020 九毛科技前端Team出品';

const FooterView: React.FC<FooterProps> = ({ links, copyright, style, className }: FooterProps) => (
  <Footer className={className} style={{ padding: 0, ...style }}>
    <GlobalFooter
      links={links}
      copyright={
        copyright === false ? null : (
          <Fragment>
            Copyright <CopyrightOutlined /> {copyright || defaultCopyright}
          </Fragment>
        )
      }
    />
  </Footer>
);

FooterView.defaultProps = {
  links: []
};

export default FooterView;
