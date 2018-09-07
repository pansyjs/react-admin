import React from 'react';
import Exception from '@components/Exception';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <Exception />
      </div>
    );
  }
}

export default App;
