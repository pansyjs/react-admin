import React from 'react';
import { Transfer } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';

interface IProps {
  visible?: boolean;
  onClose?: () => void;
  onConfirm?: (values) => void;
}

const UserPermission: React.FC<IProps> = (props) => {
  const { visible, onClose } = props;

  const handleConfirm = () => {

  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
      width={600}
      title="用户赋权"
    >
      123
    </DrawerWrapper>
  )
};

UserPermission.defaultProps = {
  visible: false
};

export default UserPermission;
