import React from 'react';
import { WaterWave } from '@components/Charts';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <WaterWave height={161} title="补贴资金剩余" percent={80} />
      </div>
    );
  }
}

export default IndexPage;
