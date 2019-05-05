import React from 'react';
import { Transfer } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';

interface IProps {
  visible?: boolean;
  onClose?: () => void;
  onConfirm?: (values) => void;
}

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
      123
    </DrawerWrapper>
  )
};

export default UserToGroup;
