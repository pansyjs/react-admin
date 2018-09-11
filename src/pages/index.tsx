import React from 'react';
import CountDown from '@components/CountDown';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const targetTime = new Date().getTime() + 3900000;

    return (
      <div>
        hello, 欢迎加入九毛科技。
        <CountDown style={{ fontSize: 20 }} target={targetTime} />
      </div>
    );
  }
}

export default App;
