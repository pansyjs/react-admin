import React from 'react';
import Moment from 'moment';
import { Avatar } from 'antd';
import styles from './index.less';

export type ArticleDataType = {
  content: string;
  avatar: string;
  href: string;
  owner: string;
  updateTime: string | number;
};

export interface ArticleListContentProps {
  data: ArticleDataType;
}

class ArticleListContent extends React.Component<ArticleListContentProps, any> {
  render() {
    const {
      data: { content, avatar, href, owner, updateTime }
    } = this.props;
    return (
      <div className={styles.listContent}>
        <div className={styles.description}>{content}</div>
        <div className={styles.extra}>
          <Avatar src={avatar} size="small" />
          <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
          <em>{Moment(updateTime).format('YYYY-MM-DD HH:mm')}</em>
        </div>
      </div>
    );
  }
}

export default ArticleListContent;
