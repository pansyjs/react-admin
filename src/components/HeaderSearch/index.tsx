import React from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import ClassNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import styles from './index.less';

export interface HeaderSearchProps {
  className?: string;
  placeholder?: string;
  dataSource?: string[];
  defaultOpen?: boolean;
  open?: boolean;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onVisibleChange?: (visible: boolean) => void;
  onPressEnter?: (value: string) => void;
  style?: React.CSSProperties;
}

interface DefaultProps {
  readonly defaultOpen: boolean;
  readonly open: boolean;
}

interface State {
  readonly searchMode: boolean;
  readonly value: string;
}

class HeaderSearch extends React.PureComponent<HeaderSearchProps, State> {
  private input: any;
  private timeout: NodeJS.Timer;

  static defaultProps: DefaultProps = {
    defaultOpen: false,
    open: false
  };

  readonly state: State = {
    searchMode: this.props.defaultOpen,
    value: ''
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleChange = (value) => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange && onChange(value);
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
    const { className, placeholder, ...restProps } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen;
    return (
      <span
        className={ClassNames(className, styles.headerSearch)}
        onClick={this.enterSearchMode}
        onTransitionEnd={({ propertyName }) => {
          if (propertyName === 'width' && !searchMode) {
            const { onVisibleChange } = this.props;
            onVisibleChange && onVisibleChange(searchMode);
          }
        }}
      >
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={ClassNames(styles.input, {
            [styles.show]: searchMode
          })}
          value={value}
          onChange={this.handleChange}
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
