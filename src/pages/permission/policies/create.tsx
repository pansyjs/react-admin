import React, { useState } from 'react';
import router from 'umi/router';
import { Button } from 'antd';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import DrawerWrapper from '@/components/drawer-wrapper';

const CreatePolicies: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const showCreateView = () => {
    setVisible(true);
  };

  const closeCreateView = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="新建自定义权限策略"
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            添加授权语句
          </Button>
        ]}
      />

      <DrawerWrapper
        visible={visible}
        width={600}
        title="添加授权语句"
        onClose={closeCreateView}
      >
        13
      </DrawerWrapper>
    </React.Fragment>
  )
};

export default CreatePolicies;
