import React from 'react';
import { Tag, Icon } from 'antd';
import ClassNames from 'classnames';
import styles from './index.scss';

const CheckableTag = Tag.CheckableTag;

export interface TagSelectProps {
  value: number[] | string[];
  defaultValue: number[] | string[];
  onChange: (value: number[] | string[]) => any;
  expandable: boolean;
}

class TagSelect extends React.Component<TagSelectProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  render() {
    return <div />;
  }
}

export default TagSelect;
