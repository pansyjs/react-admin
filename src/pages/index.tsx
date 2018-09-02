import * as React from 'react';
import Trend from '@components/Trend';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0
    };
  }

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <Trend flag="up">12%</Trend>
      </div>
    );
  }
}

export default App;
