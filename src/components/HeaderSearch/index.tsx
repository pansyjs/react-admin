import React from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import ClassNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import styles from './index.scss';

export interface HeaderSearchProps {
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
  onPressEnter?: Function;
  defaultActiveFirstOption?: boolean;
  dataSource?: string[];
  defaultOpen?: boolean;
}

export interface HeaderSearchStates {
  searchMode: boolean;
  value: string;
}

class HeaderSearch extends React.PureComponent<HeaderSearchProps, HeaderSearchStates> {
  private input: any;
  private timeout: NodeJS.Timer;

  static defaultProps = {
    className: '',
    placeholder: '',
    onSearch: () => {},
    onPressEnter: () => {},
    defaultActiveFirstOption: false,
    dataSource: [],
    defaultOpen: false
  };

  constructor(props) {
    super(props);

    this.state = {
      searchMode: props.defaultOpen,
      value: ''
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onChange = value => {
    // @ts-ignore
    const { onChange } = this.props;
    this.setState({ value });
    if (onChange) {
      onChange();
    }
  };

  onKeyDown = e => {
    if (e.key === 'Enter') {
      const { onPressEnter } = this.props;
      const { value } = this.state;
      this.timeout = setTimeout(() => {
        onPressEnter(value)
      }, 0)
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
      value: '',
    });
  };

  @Bind()
  @Debounce(500, {
    leading: true,
    trailing: false,
  })
  debouncePressEnter() {
    const { onPressEnter } = this.props;
    const { value } = this.state;
    onPressEnter(value);
  }

  render() {
    console.log(this.props);
    const { className, placeholder, ...restProps } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen;
    const clsString = ClassNames(className, styles.headerSearch);
    const inputClass = ClassNames(styles.input, {
      [styles.show]: searchMode,
    });
    return (
      <span
        className={clsString}
        onClick={this.enterSearchMode}
      >
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={inputClass}
          value={value}
          onChange={this.onChange}
        >
          <Input
            ref={node => {
              this.input = node;
            }}
            aria-label={placeholder}
            placeholder={placeholder}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    )
  }
}

export default HeaderSearch;
