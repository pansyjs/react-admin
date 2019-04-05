import React from 'react';
import { connect } from 'dva';
import { IRoute } from 'umi-types';
import DocumentTitle from 'react-document-title';
import { GlobalFooter } from '@/components/global-footer';
import { SelectLang } from '@/components/select-lang';
import getPageTitle from '@/utils/getPageTitle';
import { Copyright } from './copyright';
import logo from '@/assets/logo.svg';
import './user-layout.less';

interface IProps {
  prefixCls?: string;
  dispatch: (args: any) => void;
  route: IRoute;
  breadcrumbNameMap: object;
  location: Location;
}

@connect(({ menu }) => ({
  breadcrumbNameMap: menu.breadcrumbNameMap
}))
class UserLayout extends React.Component<IProps> {
  static defaultProps  = {
    prefixCls: 'user-layout'
  };

  componentDidMount() {
    const {
      dispatch,
      route: { routes, authority }
    } = this.props;

    dispatch({
      type: 'menu/getMenuData',
      payload: {
        routes,
        authority
      }
    });
  }

  render() {
    const {
      prefixCls,
      location: { pathname },
      breadcrumbNameMap,
      children
    } = this.props;

    return (
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <div className={prefixCls}>
          <div className="layout-container">
            <div className={`${prefixCls}__wrapper`}>
              <div className={`${prefixCls}__container`}>
                <div className={`${prefixCls}__lang`}>
                  <SelectLang />
                </div>
                <div className={`${prefixCls}__header`}>
                  <img src={logo} alt="logo"/>
                  <h2>React Admin Template</h2>
                </div>
                <div className={`${prefixCls}__children`}>
                  {children}
                </div>
              </div>
            </div>
          </div>
          <GlobalFooter
            copyright={<Copyright />}
          />
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
