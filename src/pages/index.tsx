import React from 'react';
import { Button } from 'antd';
import FooterToolbar from '@components/FooterToolbar';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <FooterToolbar extra="extra information">
          <Button>Cancel</Button>
          <Button type="primary">Submit</Button>
        </FooterToolbar>
      </div>
    );
  }
}

export default App;
