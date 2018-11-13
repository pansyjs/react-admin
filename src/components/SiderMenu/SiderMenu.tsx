import React from 'react';
import { Layout } from 'antd';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom'; // --> umi/link
import BaseMenu, { IBaseMenuProps } from './BaseMenu';
import { urlToList } from '@/utils/pathTools';
import { getMenuMatches } from './utils';
import styles from './index.less';

const { Sider } = Layout;

/**
 * 获得菜单子节点
 */
const getDefaultCollapsedSubMenus = (props, flatMenuKeys) => {
  const {
    location: { pathname }
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

export interface ISliderMenuProps extends IBaseMenuProps {
  logo: any;
  collapsed: boolean;
  fixSiderbar: boolean;
}

interface SliderMenuState {
  openKeys: string[];
}

class SiderMenu extends React.PureComponent<ISliderMenuProps, SliderMenuState> {
  private flatMenuKeys: any;

  constructor(props: ISliderMenuProps) {
    super(props);
    this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props, this.flatMenuKeys)
    };
  }

  /**
   *
   * */
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
    const { logo, collapsed, theme, onCollapse, fixSiderbar } = this.props;
    const { openKeys } = this.state;

    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = ClassNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light'
    });

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        theme={theme}
        className={siderClassName}
      >
        {/** Logo */}
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

export default SiderMenu;
