import * as React from 'react';
import Trend from '@components/Trend';
import AvatarList from '@components/AvatarList';

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
        <AvatarList>
          <AvatarList.Item
            tips="Jake"
            src="https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png"
          />
          <AvatarList.Item
            tips="Andy"
            src="https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png"
          />
          <AvatarList.Item
            tips="Niko"
            src="https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png"
          />
        </AvatarList>
      </div>
    );
  }
}

export default App;
