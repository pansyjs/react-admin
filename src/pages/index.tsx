import * as React from 'react';
import SvgIcon from '../components/SvgIcon';
import HeaderSearch from '../components/HeaderSearch';

export default class App extends React.Component{
  render(){
    return (
      <div>
        hello, 欢迎加入九毛科技。
        <SvgIcon icon="user" />
        <HeaderSearch onSearch={() => {}} />
      </div>
    );
  };
};
