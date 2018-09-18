import React from 'react';
import EllipsisText from '@components/Ellipsis/EllipsisText';

const article =
  'There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <EllipsisText length={100} text={article} />
      </div>
    );
  }
}

export default IndexPage;
