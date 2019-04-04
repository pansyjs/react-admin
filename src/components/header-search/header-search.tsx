/**
 * 顶部搜索框
 *
 * @author wang_xingkang@qq.com
 */

import React from 'react';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { Input, Icon, AutoComplete } from 'antd';
import { InputProps } from 'antd/es/input';
import './header-search.less';

interface IProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  // 占位文字
  placeholder: string;
  // 当前提示内容列表
  dataSource: string[];
  // 输入框首次显示是否显示
  defaultOpen?: boolean;
  // 控制输入框是否显示
  open?: boolean;
  // 按下回车时的回调
  onPressEnter: (value: string) => void;
  // 搜索补全项的时候调用
  onSearch: (value: string) => void;
  // 选中 option，或 input 的 value 变化时，调用此函数
  onChange: (value: string) => void;
  // 显示或隐藏文本框的回调
  onVisibleChange: (b: boolean) => void;
}

interface IState {
  readonly value: string;
  readonly searchMode: boolean;
}

export class HeaderSearch extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'lotus-header-search',
    defaultOpen: false,
  };

  render() {
    const { className, prefixCls, style } = this.props;
    return (
      <span
        className={classNames(className, {
          [`${prefixCls}`]: true
        })}
      >
        <Icon type="search" key="Icon" />
      </span>
    )
  }
}
