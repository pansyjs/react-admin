import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'umi';

export default () => {
  const history = useHistory();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  )
};
