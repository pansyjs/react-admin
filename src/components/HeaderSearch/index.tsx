import React from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import ClassNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import styles from './index.less';

export interface IHeaderSearchProps {
  className?: string;
  // 占位文字
  placeholder?: string;
  // 当前提示内容列表
  onSearch?: (value: string) => void;
  // 选择某项或按下回车时的回调
  onPressEnter?: (value: string) => void;
  defaultActiveFirstOption?: boolean;
  dataSource?: string[];
  defaultOpen?: boolean;
}

export interface HeaderSearchStates {
  searchMode: boolean;
  value: string;
}

class HeaderSearch extends React.PureComponent<
  IHeaderSearchProps,
  HeaderSearchStates
> {
  private input: any;
  private timeout: NodeJS.Timer;

  static defaultProps = {
    className: '',
    placeholder: '',
    onSearch: () => {},
    defaultActiveFirstOption: false,
    dataSource: [],
    defaultOpen: false
  };

  constructor(props) {
    super(props);

    this.state = {
      searchMode: props.defaultOpen,
      value: ''
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onChange = (value) => {
    // @ts-ignore
    const { onChange } = this.props;
    this.setState({ value });
    if (onChange) {
      onChange();
    }
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { onPressEnter } = this.props;
      const { value } = this.state;
      this.timeout = setTimeout(() => {
        onPressEnter && onPressEnter(value);
      }, 0);
    }
  };

  enterSearchMode = () => {
    this.setState({ searchMode: true }, () => {
      const { searchMode } = this.state;
      if (searchMode) {
        this.input.focus();
      }
    });
  };

  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: ''
    });
  };

  @Bind()
  @Debounce(500, {
    leading: true,
    trailing: false
  })
  debouncePressEnter() {
    const { onPressEnter } = this.props;
    const { value } = this.state;
    onPressEnter && onPressEnter(value);
  }

  render() {
    console.log(this.props);
    const { className, placeholder, ...restProps } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen;
    const clsString = ClassNames(className, styles.headerSearch);
    const inputClass = ClassNames(styles.input, {
      [styles.show]: searchMode
    });
    return (
      <span className={clsString} onClick={this.enterSearchMode}>
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={inputClass}
          value={value}
          onChange={this.onChange}
        >
          <Input
            ref={(node) => {
              this.input = node;
            }}
            aria-label={placeholder}
            placeholder={placeholder}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}

export default HeaderSearch;
