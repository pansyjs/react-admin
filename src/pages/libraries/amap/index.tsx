import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Map, ControlBar, MarkerCluster } from '@pansy/react-amap';
import { Marker, Cluster } from './components';
import './styles.less';

const randomMarker = (len: number) => (
  Array(len).fill(true).map(() => ({
    lnglat: [ 100 + Math.random() * 30, 30 + Math.random() * 20,]
  })) as AMap.MarkerCluster.DataOptions[]
);

export default () => {
  const [markers] = useState<AMap.MarkerCluster.DataOptions[]>(randomMarker(100));

  return (
    <PageContainer>
      <div style={{ width: '100%', height: 800 }}>
        <Map zoom={5}>
          <ControlBar position={{ right: '10px', bottom: '10px' }} />
          <MarkerCluster
            data={markers}
            renderCluster={(data) => {
              return <Cluster count={data.count} />
            }}
            render={() => <Marker />}
          />
        </Map>
      </div>
    </PageContainer>
  )
}
