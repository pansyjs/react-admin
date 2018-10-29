import React from 'react';
import Numeral from 'numeral';
import NumberInfo from '@/components/NumberInfo';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <NumberInfo
          subTitle={<span>Visits this week</span>}
          total={Numeral(12321).format('0,0')}
          suffix="￥"
          status="up"
          subTotal={17.1}
        />
      </div>
    );
  }
}

export default IndexPage;
