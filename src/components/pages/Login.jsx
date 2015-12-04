import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {login} from '../../actions/users';
import nodeify from 'nodeify';
import urlDropIcon from 'file!../../assets/img/dropicon.png'

// @connect((state, props, asd) => {
//   console.log(props);
//   console.log(state)
//   console.log(asd)
//   console.log('^^^')
//   return {};
// }, {
//   updatePath
// })
@connect(null, (dispatch) => ({dispatch, updatePath}))
export default class Login extends React.Component {
  static propTypes = {
    //updatePath: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      inputEmail: '',
      inputPassword: ''
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Login</p>
        <input
          type='text'
          placeholder='Username'
          value={this.state.inputEmail}
          onChange={this.handleEmailChange}/>
          <input
            type='text'
            placeholder='Password'
            value={this.state.inputPassword}
            onChange={this.handlePasswordChange}/>
        <button type='submit'>Signin</button>
      </form>
    );
  }

  handleEmailChange = e => {
    this.setState({
      inputEmail: e.target.value
    });
  }

  handlePasswordChange = e => {
    this.setState({
      inputPassword: e.target.value
    });
  }

  handleSubmit = e => {
    //const {updatePath} = this.props;
    console.log('dada')
    e.preventDefault();
    console.log('ahduhde')
    nodeify(this.props.dispatch(login(this.state.inputEmail, this.state.inputPassword)), () => {
      // this.props.dispatch(updatePath('/'));
      console.log('dede')
      console.log(window)
      window.location = "/";
    });
    console.log('nudehdeaaaa')


  }
}
