import React from 'react';
import { List, Icon, Tag } from 'antd';
import { connect } from 'dva';
import { Component } from '@/components/BaseComponent';
import ArticleListContent from '../components/ArticleListContent';
import styles from './Articles.less';

export interface ArticlesProps {
  list: any[];
}

@connect(({ article }) => ({
  list: article.list
}))
class Articles extends Component<ArticlesProps, any> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetchList'
    });
  }

  render() {
    const { list } = this.props;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    return (
      <List
        size="large"
        className={styles.articleList}
        rowKey="id"
        itemLayout="vertical"
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="star-o" text={item.star} />,
              <IconText type="like-o" text={item.like} />,
              <IconText type="message" text={item.message} />
            ]}
          >
            <List.Item.Meta
              title={
                <a className={styles.listItemMetaTitle} href={item.href}>
                  {item.title}
                </a>
              }
              description={
                <span>
                  <Tag>Ant Design</Tag>
                  <Tag>设计语言</Tag>
                  <Tag>蚂蚁金服</Tag>
                </span>
              }
            />
            <ArticleListContent data={item} />
          </List.Item>
        )}
      />
    );
  }
}

export default Articles;
