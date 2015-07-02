import React from 'react';
import {connect} from 'redux/react';

@connect(state => ({
  title: state.AppStore.title
}))
export default class App extends React.Component {
  componentDidUpdate(){
    if (process.env.BROWSER){
      document.title = this.props.title;
    }
  }

  render(){
    return (
      <div>{this.props.children}</div>
    );
  }
}
