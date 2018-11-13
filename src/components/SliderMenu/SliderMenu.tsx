import React from 'react';
import { Layout } from 'antd';
import ClassNames from 'classnames';
import PathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom'; // --> umi/link
import BaseMenu, { getMenuMatches, IBaseMenuProps } from './BaseMenu';
import { urlToList } from '@/utils/pathTools';
import styles from './index.less';

const { Sider } = Layout;

/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
const getDefaultCollapsedSubMenus = (props) => {
  const {
    location: { pathname },
    flatMenuKeys
  } = props;
  return urlToList(pathname)
    .map((item) => getMenuMatches(flatMenuKeys, item)[0])
    .filter((item) => item);
};

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = (menu) =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(
        flatMenuKeys.filter((item) => PathToRegexp(item).test(path))
      ),
    []
  );

export interface ISliderMenuProps extends IBaseMenuProps {
  logo: any;
  collapsed: boolean;
  fixSliderBar: boolean;
  flatMenuKeys: any[];
}

interface SliderMenuState {
  openKeys: string[];
}

class SliderMenu extends React.PureComponent<
  ISliderMenuProps,
  SliderMenuState
> {
  private flatMenuKeys: any;

  constructor(props: ISliderMenuProps) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props)
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname } = state;
    if (props.location.pathname !== pathname) {
      return {
        pathname: props.location.pathname,
        openKeys: getDefaultCollapsedSubMenus(props)
      };
    }
    return null;
  }

  isMainMenu = (key) => {
    const { menuData } = this.props;
    return menuData.some((item) => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = (openKeys) => {
    const moreThanOne =
      openKeys.filter((openKey) => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
    });
  };

  render() {
    const { logo, collapsed, theme, onCollapse, fixSliderBar } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };
    const sliderClassName = ClassNames(styles.sider, {
      [styles.fixSliderBar]: fixSliderBar,
      [styles.light]: theme === 'light'
    });

    return (
      <Sider
        trigger={null}
        collapsible
        breakpoint="lg"
        onCollapse={onCollapse}
        collapsed={collapsed}
        width={256}
        theme={theme}
        className={sliderClassName}
      >
        {/** logo */}
        <div className={styles.logo} id="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>

        {/** 菜单 */}
        <BaseMenu
          {...this.props}
          mode="inline"
          onOpenChange={this.handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
          {...defaultProps}
        />
      </Sider>
    );
  }
}

export default SliderMenu;
