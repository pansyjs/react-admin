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

const GroupDrawer: React.FC<IProps> = (props) => {
  const { visible, onClose, form, type } = props;
  const { getFieldDecorator } = form;

  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    setTitle(type === 'create' ? '添加用户组' : '更新用户组');
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

GroupDrawer.defaultProps = {
  visible: false
};

var UserDrawer;
export default Form.create()(GroupDrawer);
