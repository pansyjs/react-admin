import React from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { formatMessage } from 'umi-plugin-react/locale';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IModule } from '@/models/action';

export type TFormType = 'create' | 'update';

interface IProps extends FormComponentProps {
  formType: TFormType;
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
    formType,
    form: { getFieldDecorator }
  } = props;
  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    if (formType) {
      setTitle(formType === 'create' ? '创建操作' : '更新操作');
    }
  }, [props.formType]);

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

  const moduleOptions = React.useMemo(() => {
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
      title={title}
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
        <FormItem {...formItemLayout} label="操作类型">
          {getFieldDecorator('type', {
            initialValue: 1,
            rules: [
              {
                required: true,
                message: '请选择操作类型'
              },
            ],
          })(
            <Radio.Group>
              <Radio value={0}>
                非API
              </Radio>
              <Radio value={1}>
                API
              </Radio>
            </Radio.Group>
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
