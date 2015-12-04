import React from 'react';
import '../../assets/style.css'
import Header from '../components/Header'
import {loadUser} from '../../actions/data';
import nodeify from 'nodeify';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

App.onEnter = store => (nextState, replaceState, callback) => {
  console.log('onEnter')
  const {id} = nextState.params;
  const {app} = store.getState();
  if(!app.user && app.authInfo) {
    return nodeify(store.dispatch(loadUser()), callback);
  }

  return callback();
};
