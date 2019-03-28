import React from 'react';
import { Avatar, List } from 'antd';
import ClassNames from 'classnames';
import styles from './NoticeList.less';

export type NoticeData = {
  // 头像图片
  avatar?: string | React.ReactNode;
  // 标题
  title?: React.ReactNode;
  // 描述信息
  description?: React.ReactNode;
  // 时间戳
  datetime?: React.ReactNode;
  // 是否已读
  read?: boolean;
  key?: string | number;
  // 额外信息，在列表项右上角
  extra?: React.ReactNode;
  style?: React.CSSProperties;
};

export interface NoticeListProps {
  // 是否显示清空按钮
  showClear?: boolean;
  // 清空消息的回调
  onClear?: () => void;
  // 消息数据
  data: NoticeData[];
  // 消息分类的页签标题
  title?: string;
  // 针对每个 Tab 定制空数据图片
  emptyImage?: string;
  // 针对每个 Tab 定制空数据文案
  emptyText?: React.ReactNode;
  // 默认文本
  locale?: {
    emptyText: string;
    clear: string;
  };
}

const ListItem = List.Item;
const ListItemMeta = ListItem.Meta;

class NoticeList extends React.Component<NoticeListProps, any> {
  static defaultProps: Partial<NoticeListProps> = {
    showClear: true
  };

  handleClear = (event) => {
    event.preventDefault();
    const { onClear } = this.props;
    onClear && onClear();
  };

  render() {
    const {
      data = [],
      showClear,
      locale,
      title,
      emptyImage,
      emptyText
    } = this.props;

    return data.length === 0 ? (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    ) : (
      <React.Fragment>
        <List
          className={styles.list}
          dataSource={data}
          renderItem={(item, index) => {
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
              <ListItem className={itemCls} key={item.key || index}>
                <ListItemMeta
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
              </ListItem>
            );
          }}
        />
        {/** 清空 */}
        {showClear ? (
          <div className={styles.clear} onClick={this.handleClear}>
            {locale.clear} {title}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default NoticeList;
