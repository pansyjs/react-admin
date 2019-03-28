import React from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import Numeral from 'numeral';
import { connect } from 'dva';
import { PureComponent } from '@/components/BaseComponent';

export interface ApplicationsProps {
  list: any[];
}

@connect(({ application }) => ({
  list: application.list
}))
class Applications extends PureComponent<ApplicationsProps, any> {
  render() {
    const { list } = this.props;
    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3d menu item
          </a>
        </Menu.Item>
      </Menu>
    );
    const CardInfo = ({ activeUser, newUser }) => (
      <div>
        <div>
          <p>活跃用户</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>新增用户</p>
          <p>{newUser}</p>
        </div>
      </div>
    );
    return (
      <List
        rowKey="id"
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip title="下载">
                  <Icon type="download" />
                </Tooltip>,
                <Tooltip title="编辑">
                  <Icon type="edit" />
                </Tooltip>,
                <Tooltip title="分享">
                  <Icon type="share-alt" />
                </Tooltip>,
                <Dropdown overlay={itemMenu}>
                  <Icon type="ellipsis" />
                </Dropdown>
              ]}
            >
              <Card.Meta
                avatar={<Avatar size="small" src={item.avatar} />}
                title={item.title}
              />

              <div>
                <CardInfo
                  activeUser={item.activeUser}
                  newUser={Numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

export default Applications;
