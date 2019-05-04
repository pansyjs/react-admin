import React from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import DrawerWrapper from '@/components/drawer-wrapper';

export type TFormType = 'create' | 'update';

interface IProps extends FormComponentProps {
  formType: TFormType;
  visible: boolean;
  onClose: () => void;
}

const StatementForm: React.FC<IProps> = (props) => {
  const { visible, formType, onClose } = props;
  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    if (formType) {
      setTitle(formType === 'create' ? '添加授权语句' : '更新授权语句');
    }
  }, [props.formType]);

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={handleClose}
      width={600}
      title={title}
    >
      123
    </DrawerWrapper>
  )
};

export default Form.create()(StatementForm)
