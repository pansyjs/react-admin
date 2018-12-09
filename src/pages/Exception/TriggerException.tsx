import React from 'react';
import { Button, Spin, Card } from 'antd';
import { connect } from 'dva';
import BaseComponent from '@/components/BaseComponent';
import styles from './style.less';

@connect(({ error }) => ({
  isLoading: error.isLoading
}))
class TriggerException extends BaseComponent {
  state = {
    isLoading: false
  };

  triggerError = (code) => {
    this.setState({
      isLoading: true
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'error/query',
      payload: {
        code
      }
    });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <Card>
        <Spin spinning={isLoading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={() => this.triggerError(401)}>
            触发401
          </Button>
          <Button type="danger" onClick={() => this.triggerError(403)}>
            触发403
          </Button>
          <Button type="danger" onClick={() => this.triggerError(500)}>
            触发500
          </Button>
          <Button type="danger" onClick={() => this.triggerError(404)}>
            触发404
          </Button>
        </Spin>
      </Card>
    );
  }
}

export default TriggerException;
