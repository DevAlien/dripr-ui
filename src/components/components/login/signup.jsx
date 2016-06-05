import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {updatePath} from 'redux-simple-router'
import {login} from '../../../actions/users'
import nodeify from 'nodeify'

export default class Signup extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <p>Not implemented at the moment, please login with facebook</p>
    )
  }

}
