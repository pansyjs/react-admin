import React from 'react';
import { connect } from 'dva';
import { Button, Typography } from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import { ConnectProps } from '@/models/connect';

interface IProps extends ConnectProps {

}

const { Paragraph } = Typography;

const ActionPage: React.FC<IProps> = (props) => {
  const { dispatch } = props;

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="操作管理"
        extra={[
          <Button key="1" type="primary" >
            新建操作
          </Button>
        ]}
      >
        <div className="content">
          <Paragraph>
            操作是指对具体资源的操作，多数情况下 Action 与系统的 API 一一对应，但也有例外。
          </Paragraph>
        </div>
      </PageHeaderWrapper>
    </React.Fragment>
  )
};

export default connect(({  }) => ({

}))(ActionPage);
