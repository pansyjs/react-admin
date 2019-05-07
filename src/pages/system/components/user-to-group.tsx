import React from 'react';
import { Divider, Transfer } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';
import DescriptionList from '@/components/description-list';
import { IUser } from '@/models/user';
import './user-to-group.less';

interface IProps {
  prefixCls?: string;
  visible?: boolean;
  onClose?: () => void;
  user?: IUser;
  onConfirm?: (values) => void;
}

const Description = DescriptionList.Description;

const UserToGroup: React.FC<IProps> = (props) => {
  const { prefixCls, visible, user, onClose, onConfirm } = props;
  const [targetKeys, setTargetKeys] = React.useState<string[]>([]);

  const handleConfirm = () => {

  };

  const handleChange = (targetKeys) => {
    setTargetKeys(targetKeys);
  };

  const filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1
  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
      width={700}
      title="添加到用户组"
    >
      <div className={prefixCls}>
        <DescriptionList
          size="large"
          title="用户信息"
          style={{ marginBottom: 32 }}
        >
          <Description term="用户名">
            {user.username}
          </Description>
          <Description term="邮箱">
            {user.email}
          </Description>
          <Description term="手机号">
            {user.mobile}
          </Description>
        </DescriptionList>

        <Divider style={{ marginBottom: 32 }} />

        <Transfer
          dataSource={[
            {
              key: '001',
              title: 'title1',
              description: 'description1'
            },
            {
              key: '002',
              title: 'title2',
              description: 'description2'
            }
          ]}
          showSearch
          filterOption={filterOption}
          targetKeys={targetKeys}
          onChange={handleChange}
          render={item => item.title}
        />
      </div>
    </DrawerWrapper>
  )
};

UserToGroup.defaultProps = {
  prefixCls: 'lotus-user-to-group',
  user: {}
};

export default UserToGroup;
