import React from 'react';
import bindActions from '../utils/bindActions';
import * as AppActions from '../actions/AppActions';

export default class NotFound extends React.Component {
  static onEnter(state, transition){
    const {setTitle, setStatus} = bindActions(AppActions, this);

    setTitle('Not found');
    setStatus(404);
  }

  render(){
    return <div>Not Found</div>;
  }
}
