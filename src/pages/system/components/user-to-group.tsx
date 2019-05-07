import React from 'react';
import { Transfer } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';
import DescriptionList from '@/components/description-list';

interface IProps {
  visible?: boolean;
  onClose?: () => void;
  onConfirm?: (values) => void;
}

const Description = DescriptionList.Description;

const UserToGroup: React.FC<IProps> = (props) => {
  const { visible, onClose, onConfirm } = props;

  const handleConfirm = () => {

  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
      width={600}
      title="添加组成员"
    >
      <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
        <Description term="用户名">{123}</Description>
        <Description term="邮箱">{123}</Description>
        <Description term="手机号">{123}</Description>
      </DescriptionList>
    </DrawerWrapper>
  )
};

export default UserToGroup;
