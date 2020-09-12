import React from 'react';
import { Divider } from 'antd';
import { useAuthority, Authority } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const Dashboard: React.FC = () => {
  const { multipleVerify, combinationVerify } = useAuthority();

  console.log(useAuthority());

  console.log(multipleVerify(['module1:action1', 'module1:action2']));

  console.log(combinationVerify('module1:action5'));
  return (
    <PageContainer>
      <Authority access={'module1:action1'}>
        <span>有权限</span>
      </Authority>

      <Divider dashed />

      <Authority access={'module5:action1'} fallback="权限不通过">
        <span>无权限</span>
      </Authority>

      <Divider dashed />

      <Authority
        accessible={multipleVerify(['module1:action1'])}
      >
        {(isMatch: boolean) => <span>权限校验结果: {isMatch + ''}</span>}
      </Authority>
    </PageContainer>
  )
}

export default Dashboard;
