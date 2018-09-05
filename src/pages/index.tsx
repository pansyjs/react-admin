import React from 'react';
import TagSelect from '@components/TagSelect';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit(checkedValue) {
    console.log(checkedValue);
  }

  render() {
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <TagSelect onChange={this.handleFormSubmit}>
          <TagSelect.Option value="cat1">类目一</TagSelect.Option>
          <TagSelect.Option value="cat2">类目二</TagSelect.Option>
          <TagSelect.Option value="cat3">类目三</TagSelect.Option>
          <TagSelect.Option value="cat4">类目四</TagSelect.Option>
          <TagSelect.Option value="cat5">类目五</TagSelect.Option>
          <TagSelect.Option value="cat6">类目六</TagSelect.Option>
        </TagSelect>
      </div>
    );
  }
}

export default App;
