import React from 'react';
import { Tag, Icon } from 'antd';
import ClassNames from 'classnames';
import Option from './TagSelectOption';
import styles from './index.less';

const CheckableTag = Tag.CheckableTag;

export interface TagSelectProps {
  className?: string;
  style?: object;
  value?: number[] | string[];
  defaultValue?: number[] | string[];
  onChange?: (value: number[] | string[]) => any;
  expandable?: boolean;
  hideCheckAll?: boolean;
}

class TagSelect extends React.Component<TagSelectProps, any> {
  static Option: typeof Option;

  static defaultProps = {
    className: '',
    expandable: false,
    hideCheckAll: false
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      value: props.value || props.defaultValue || []
    };
  }

  onChange = (value) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (onChange) {
      onChange(value);
    }
  };

  onSelectAll = (checked) => {
    let checkedTags = [];
    if (checked) {
      checkedTags = this.getAllTags();
    }
    this.onChange(checkedTags);
  };

  handleTagChange = (value, checked) => {
    const { value: StateValue } = this.state;
    const checkedTags = [...StateValue];

    const index = checkedTags.indexOf(value);
    if (checked && index === -1) {
      checkedTags.push(value);
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1);
    }
    this.onChange(checkedTags);
  };

  handleExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand
    });
  };

  getAllTags() {
    let { children } = this.props;
    children = React.Children.toArray(children);
    const checkedTags = children
      // @ts-ignore
      .filter((children) => this.isTagSelectOption(children))
      .map((child) => child.props.value);
    return checkedTags || [];
  }

  isTagSelectOption = (node) => {
    return (
      node &&
      node.type &&
      (node.type.isTagSelectOption ||
        node.type.displayName === 'TagSelectOption')
    );
  };

  render() {
    const { className, style, expandable, hideCheckAll, children } = this.props;
    const { value, expand } = this.state;

    const checkedAll = this.getAllTags().length === value.length;

    const cls = ClassNames(styles.tagSelect, className, {
      [styles.hasExpandTag]: expandable,
      [styles.expanded]: expand
    });

    return (
      <div className={cls} style={style}>
        {hideCheckAll ? null : (
          <CheckableTag
            checked={checkedAll}
            key="tag-select-__all__"
            onChange={this.onSelectAll}
          >
            全部
          </CheckableTag>
        )}
        {value &&
          React.Children.map(children, (child: React.ReactElement<any>) => {
            if (this.isTagSelectOption(child)) {
              return React.cloneElement(child, {
                key: `tag-select-${child.props.value}`,
                value: child.props.value,
                checked: value.indexOf(child.props.value) > -1,
                onChange: this.handleTagChange
              });
            }
            return child;
          })}
        {expandable && (
          <a className={styles.trigger} onClick={this.handleExpand}>
            {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
          </a>
        )}
      </div>
    );
  }
}

TagSelect.Option = Option;

export default TagSelect;
