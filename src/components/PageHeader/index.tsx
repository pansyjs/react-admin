import React from 'react';
import ClassNames from 'classnames';
import { Tabs, Skeleton } from 'antd';
import Breadcrumb from '../Breadcrumb';
import styles from './index.less';

const { TabPane } = Tabs;

export interface PageHeaderProps {
  className?: string;
  title?: React.ReactNode | string;
  logo?: React.ReactNode | string;
  action?: React.ReactNode | string;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  tabList?: Array<{ key: string; tab: React.ReactNode }>;
  tabActiveKey?: string;
  tabDefaultActiveKey?: string;
  onTabChange?: (key: string) => void;
  tabBarExtraContent?: React.ReactNode;
  home?: React.ReactNode;
  linkElement?: React.ReactNode;
  itemRender?: any;
  wide?: boolean;
  loading?: boolean;
}

class PageHeader extends React.PureComponent<PageHeaderProps, any> {
  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);
  }

  handleChange = (key) => {
    const { onTabChange } = this.props;
    onTabChange && onTabChange(key);
  };

  render() {
    const {
      className,
      wide,
      loading,
      logo,
      title,
      action,
      content,
      extraContent,
      tabList,
      tabBarExtraContent,
      tabDefaultActiveKey,
      tabActiveKey,
      ...restProps
    } = this.props;

    const cls = ClassNames(styles.pageHeader, className);

    const activeKeyProps: {
      defaultActiveKey: string;
      activeKey: string;
    } = {
      defaultActiveKey: '',
      activeKey: ''
    };

    if (tabDefaultActiveKey !== undefined) {
      activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    }
    if (tabActiveKey !== undefined) {
      activeKeyProps.activeKey = tabActiveKey;
    }

    return (
      <div className={cls}>
        <div className={wide ? styles.wide : ''}>
          <Skeleton
            loading={loading}
            title={false}
            active
            paragraph={{ rows: 3 }}
            avatar={{ size: 'large', shape: 'circle' }}
          >
            {/** 面包屑导航 */}
            <Breadcrumb {...restProps} />
            <div className={styles.detail}>
              {logo && <div className={styles.logo}>{logo}</div>}
              <div className={styles.main}>
                <div className={styles.row}>
                  {title && <h1 className={styles.title}>{title}</h1>}
                  {action && <div className={styles.action}>{action}</div>}
                </div>
                <div className={styles.row}>
                  {content && <div className={styles.content}>{content}</div>}
                  {extraContent && (
                    <div className={styles.extraContent}>{extraContent}</div>
                  )}
                </div>
              </div>
            </div>
            {tabList && tabList.length ? (
              <Tabs
                className={styles.tabs}
                {...activeKeyProps}
                onChange={this.handleChange}
                tabBarExtraContent={tabBarExtraContent}
              >
                {tabList.map((item) => (
                  <TabPane tab={item.tab} key={item.key} />
                ))}
              </Tabs>
            ) : null}
          </Skeleton>
        </div>
      </div>
    );
  }
}

export default PageHeader;
