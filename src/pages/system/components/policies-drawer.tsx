import React from 'react';
import { Transfer } from 'antd';
import DrawerWrapper from '@/components/drawer-wrapper';

interface IProps {
  visible?: boolean;
  onClose?: () => void;
  type?: 'user' | 'group';
  onConfirm?: (values) => void;
}

const PoliciesDrawer: React.FC<IProps> = (props) => {
  const { type, visible, onClose } = props;
  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    const title = type === 'user' ? '用户赋权' : '用户组赋权'
    setTitle(title);
  }, [props.type]);

  const handleConfirm = () => {

  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
      width={600}
      title={title}
    >
      123
    </DrawerWrapper>
  )
};

PoliciesDrawer.defaultProps = {
  visible: false
};

export default PoliciesDrawer;
