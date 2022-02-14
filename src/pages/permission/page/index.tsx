import React, { useState } from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import { PageContainer } from '@ant-design/pro-layout';

export default () => {
  const [role, setRole] = useState<string>('admin');

  const handleChange = (e: RadioChangeEvent) => {
    setRole(e.target.value);
  }

  return (
    <PageContainer>
      <div>
        权限切换
        <Radio.Group value={role} onChange={handleChange}>
          <Radio.Button value="user">
            user
          </Radio.Button>
          <Radio.Button value="admin">
            admin
          </Radio.Button>
        </Radio.Group>
      </div>
    </PageContainer>
  )
}
