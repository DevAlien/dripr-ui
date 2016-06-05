import React from 'react'
import {Provider} from 'react-redux'

export default class Root extends React.Component {
  render() {
    return (
      <Provider {...this.props}>
        <div>
          {this.props.children}
        </div>
      </Provider>
    )
  }
}
