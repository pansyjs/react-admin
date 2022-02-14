import React, { useState, useEffect } from 'react';
import { Authority, useAuthority } from 'umi';
import { Radio, Divider, Alert, Tag, Space } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import { PageContainer } from '@ant-design/pro-layout';

export default () => {
  const [role, setRole] = useState<string>('admin');

  const { singleVerify } = useAuthority();

  const showList = singleVerify('dashboard:list')

  useEffect(
    () => {
      if (showList) {
        // 请求数据

      }
    },
    [showList]
  )

  const handleChange = (e: RadioChangeEvent) => {
    setRole(e.target.value);
  }

  return (
    <PageContainer>
      <Space size={8}>
        <span>权限切换:</span>
        <Radio.Group value={role} onChange={handleChange}>
          <Radio.Button value="user">
            user
          </Radio.Button>
          <Radio.Button value="admin">
            admin
          </Radio.Button>
        </Radio.Group>
      </Space>
      <Divider dashed />
      <Space style={{ width: '100%' }} size={16} direction="vertical">
        <Authority access={'dashboard:view'}>
          <Alert message={ <span>Only <Tag>admin</Tag> can see this</span> } />
        </Authority>
        <Authority access={'dashboard:view'}>
          <Alert message={ <span>Only <Tag>user</Tag> can see this</span> } />
        </Authority>
        <Authority access={'dashboard:view'}>
          <Alert message={ <span>Both <Tag>admin</Tag> and <Tag>user</Tag> can see this</span> } />
        </Authority>
      </Space>
    </PageContainer>
  )
}
