import * as React from 'react';
import SvgIcon from '@components/SvgIcon';
import HeaderSearch from '@components/HeaderSearch';
import UploadExcel from '@components/UploadExcel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0
    };
  }

  handleSuccess = (data) => {
    console.log(data);
  };

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <SvgIcon icon="user" />
        <HeaderSearch onSearch={() => {}} />
        <UploadExcel onSuccess={this.handleSuccess} />
      </div>
    );
  }
}

export default App;
