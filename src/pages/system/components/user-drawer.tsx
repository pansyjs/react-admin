import React from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import DrawerWrapper from '@/components/drawer-wrapper';

export type TType = 'create' | 'update';

interface IProps extends FormComponentProps {
  type?: TType;
  visible?: boolean;
  onClose?: () => void;
}

const UserDrawer: React.FC<IProps> = (props) => {
  const { visible, onClose, form, type } = props;
  const { getFieldDecorator } = form;

  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    setTitle(type === 'create' ? '添加用户' : '更新用户');
  }, [props.type]);

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      width={600}
      title={title}
    >
      123
    </DrawerWrapper>
  )
};

UserDrawer.defaultProps = {
  visible: false
};

export default Form.create()(UserDrawer);
