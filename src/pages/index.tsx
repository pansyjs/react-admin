import * as React from 'react';
import SvgIcon from '@components/SvgIcon';
import HeaderSearch from '@components/HeaderSearch';
import SendCode from '@components/SendCode';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0
    };
  }

  handleClick = () => {
    this.setState({
      start: 1
    });
  };

  render() {
    const { start } = this.state;

    return (
      <div>
        hello, 欢迎加入九毛科技。
        <SvgIcon icon="user" />
        <HeaderSearch onSearch={() => {}} />
        <SendCode start={start} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
