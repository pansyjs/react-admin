import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Map, Markers, ControlBar } from '@pansy/react-amap';
import { MarkersProps } from '@pansy/react-amap/es/markers';
import { Marker, Cluster } from './components';
import './styles.less';

const randomMarker = (len: number) => (
  Array(len).fill(true).map(() => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
  }))
);

const MapComponent: React.FC = () => {
  const [markers] = useState<MarkersProps['markers']>(randomMarker(100));

  return (
    <PageContainer>
      <div style={{ width: '100%', height: 800 }}>
        <Map zoom={5}>
          <ControlBar position={{ right: '10px', bottom: '10px' }} />
          <Markers
            markers={markers}
            useCluster={{
              render: () => {
                return <Cluster />
              }
            }}
            render={() => <Marker />}
          />
        </Map>
      </div>
    </PageContainer>
  )
}

export default MapComponent;
