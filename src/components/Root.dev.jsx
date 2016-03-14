import React from 'react';
import {Provider} from 'react-redux';
import DevTools from './DevTools';
import config from '../../config';

export default class Root extends React.Component {

  render() {

    return (
      <Provider {...this.props}>
        <div>
          {this.props.children}
          { config.devtools ? <DevTools/> : null }
        </div>
      </Provider>
    );
  }
}
