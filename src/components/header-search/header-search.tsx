/**
 * 搜索组件
 */

import React from 'react';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { Input, Icon, AutoComplete } from 'antd';
import { InputProps } from 'antd/es/input';
import './header-search.less';

interface IProps {
  className: string;
  placeholder: string;
}

interface IState {
  readonly value: string;
  readonly searchMode: boolean;
}

export class HeaderSearch extends React.Component<IProps, IState> {

}
