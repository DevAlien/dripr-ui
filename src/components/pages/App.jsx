import React from 'react';
import '../../assets/sty.css';
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
          titleTemplate="%s | Dripr.io"
          meta={[
              {"name": "viewport", content: "initial-scale=1.0,user-scalable=yes,width=device-width"},
              {"name": "description", "content": "Dripr.io upload files, videos, code and take screenshots with the desktop app"},
              {property: "fb:app_id", content: "103491386705646"}
          ]}
        />
        <Header />
        <div className="page-body">{this.props.children}</div>
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
