import React from 'react';
import {RouteHandler} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'redux/react';

import * as AppActions from '../actions/AppActions';

@connect(state => ({
  AppStore: state.AppStore
}))
export default class App extends React.Component {
  render(){
    const {dispatch} = this.props;

    return (
      <RouteHandler
        {...this.props}
        {...bindActionCreators(AppActions, dispatch)}/>
    );
  }
}
