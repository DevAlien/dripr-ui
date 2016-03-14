import React from 'react';
import '../../assets/style.css'
import Header from '../components/Header'
import {loadUser} from '../../actions/data';
import nodeify from 'nodeify';
import Helmet from 'react-helmet';

export default class App extends React.Component {
  render() {
    return (
      <div>
      <Helmet
  title="Home"
  titleTemplate="%s | Voucher's Provider Service | SONY Mobile"
  meta={[
      {"name": "description", "content": "Voucher's Provider upload interface for .csv files"}
  ]}
/>
        <Header />
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

App.onEnter = store => (nextState, replaceState, callback) => {
  const {id} = nextState.params;
  const {app} = store.getState();
  if(!app.user && app.authInfo) {
    return nodeify(store.dispatch(loadUser()), callback);
  }

  return callback();
};
