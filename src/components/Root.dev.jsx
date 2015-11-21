import React from 'react';
import {Provider} from 'react-redux';
import DevTools from './DevTools';

export default class Root extends React.Component {
  render() {
    return (
      <Provider {...this.props}>
        <div>
          {this.props.children}
          <DevTools/>
        </div>
      </Provider>
    );
  }
}
