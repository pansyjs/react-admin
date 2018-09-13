import React from 'react';
import { Tooltip, Icon, Row, Col } from 'antd';
import { ChartCard } from '@components/Charts';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <Row>
          <Col span={4} style={{ marginTop: 24 }}>
            <ChartCard
              title="移动指标"
              avatar={
                <img
                  style={{ width: 56, height: 56 }}
                  src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
                  alt="indicator"
                />
              }
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => 123}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
