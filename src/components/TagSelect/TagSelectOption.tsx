import React from 'react';
import { Tag } from 'antd';

const CheckableTag = Tag.CheckableTag;

export interface TagSelectOptionProps {
  checked?: boolean;
  onChange?: (value: string | number, state: boolean) => void;
  value: number | string;
}

class TagSelectOption extends React.Component<TagSelectOptionProps, any> {
  static isTagSelectOption = true;

  constructor(props) {
    super(props);
  }

  render() {
    const { checked, children, value, onChange } = this.props;
    return (
      <CheckableTag
        checked={checked}
        key={value}
        onChange={(state) => onChange(value, state)}
      >
        {children}
      </CheckableTag>
    );
  }
}

export default TagSelectOption;
