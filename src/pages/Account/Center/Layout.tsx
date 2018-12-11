import React from 'react';
import { connect } from 'dva';
import { PureComponent } from '@/components/BaseComponent';

interface State {
  readonly newTags: string[];
  readonly inputVisible: boolean;
  readonly inputValue: string;
}

@connect(({ loading }) => ({
  listLoading: loading.effects['list/fetch'],
  projectLoading: loading.effects['project/fetchNotice']
}))
class CenterLayout extends PureComponent {
  readonly state: State = {
    newTags: [],
    inputVisible: false,
    inputValue: ''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchCurrent'
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8
      }
    });
    dispatch({
      type: 'project/fetchNotice'
    });
  }

  render() {
    const { children } = this.props;
    const operationTabList = [
      {
        key: 'articles',
        tab: (
          <span>
            文章 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        )
      },
      {
        key: 'applications',
        tab: (
          <span>
            应用 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        )
      },
      {
        key: 'projects',
        tab: (
          <span>
            项目 <span style={{ fontSize: 14 }}>(8)</span>
          </span>
        )
      }
    ];

    return <div>{children}</div>;
  }
}

export default CenterLayout;
