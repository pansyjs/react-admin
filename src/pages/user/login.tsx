import * as React from 'react';
import GlobalFooter from '../../components/GlobalFooter';
import { Icon } from 'antd';

const Fragment = React.Fragment;

const links = [
  {
    key: 'help',
    title: '帮助',
    href: '',
  },
  {
    key: 'privacy',
    title: '隐私',
    href: '',
  },
  {
    key: 'terms',
    title: '条款',
    href: '',
  },
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);

class PageLogin extends React.Component {
  render() {
    return (
      <div>
        login page
        <GlobalFooter copyright={copyright} className={'Test'} links={links} />
      </div>
    )
  }
}

export default PageLogin;
