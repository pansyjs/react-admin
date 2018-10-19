import React from 'react';
import { Avatar, List } from 'antd';
import ClassNames from 'classnames';
import styles from './NoticeList.less';

export interface NoticeIconData {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  read?: boolean;
  key?: string | number;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface NoticeListProps {
  showClear: boolean;
  data: NoticeIconData[];
  onClick: (item: string) => void;
  onClear?: () => void;
  title?: string;
  locale?: { emptyText: string; clear: string };
}

class NoticeList extends React.Component<NoticeListProps, any> {
  static defaultProps: Partial<NoticeListProps> = {
    showClear: true
  };

  handleClear = (e) => {
    e.preventDefault();
    const { onClear } = this.props;
    onClear && onClear();
  };

  render() {
    const { data = [], showClear, locale, title } = this.props;

    return (
      <div>
        <List className={styles.list} dataSource={[]} renderItem={}>
          {data.map((item, i) => {
            const itemCls = ClassNames(styles.item, {
              [styles.read]: item.read
            });
            const leftIcon = item.avatar ? (
              typeof item.avatar === 'string' ? (
                <Avatar className={styles.avatar} src={item.avatar} />
              ) : (
                item.avatar
              )
            ) : null;

            return (
              <List.Item className={itemCls} key={item.key || i}>
                <List.Item.Meta
                  className={styles.meta}
                  avatar={
                    <span className={styles.iconElement}>{leftIcon}</span>
                  }
                  title={
                    <div className={styles.title}>
                      {item.title}
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.description}>
                        {item.description}
                      </div>
                      <div className={styles.datetime}>{item.datetime}</div>
                    </div>
                  }
                />
              </List.Item>
            );
          })}
        </List>
        {/** 清空 */}
        {showClear ? (
          <div className={styles.clear} onClick={this.handleClear}>
            {locale.clear} {title}
          </div>
        ) : null}
      </div>
    );
  }
}

export default NoticeList;
