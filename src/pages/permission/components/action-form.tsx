import React, { useMemo } from 'react';
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { formatMessage } from 'umi-plugin-react/locale';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IModule } from '../models/action';

interface IProps extends FormComponentProps {
  visible: boolean;
  modules: IModule[];
  onClose: () => void;
}

const FormItem  = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const ActionForm: React.FC<IProps> = (props) => {
  const {
    visible,
    modules,
    onClose,
    form: { getFieldDecorator }
  } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const moduleOptions = useMemo(() => {
    return (
      modules.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))
    )
  }, [props.modules]);

  return (
    <DrawerWrapper
      visible={visible}
      onClose={handleClose}
      width={600}
      title="添加操作"
    >
      <Form>
        <FormItem {...formItemLayout} label="操作名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '名称不能为空'
              },
            ],
          })(<Input placeholder="请输入操作名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所属模块">
          {getFieldDecorator('mould', {
            rules: [
              {
                required: true,
                message: '所属模块不能为空'
              },
            ],
          })(
            <Select
              showSearch
              placeholder="请选择所属模块"
              optionFilterProp="children"
            >
              {moduleOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {
            rules: []
          })(
            <TextArea rows={3} />
          )}
        </FormItem>
      </Form>
    </DrawerWrapper>
  )
};

ActionForm.defaultProps = {
  modules: []
};

export default Form.create()(ActionForm);
