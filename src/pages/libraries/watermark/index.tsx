import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Watermark } from '@pansy/react-watermark';

export default () => {
  return (
    <PageContainer>
      <div>
        <Watermark isBody text={'刘德华 7878'} />
          123
      </div>
    </PageContainer>
  )
}
