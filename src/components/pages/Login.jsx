import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {login} from '../../actions/users';
import nodeify from 'nodeify';
import urlDropIcon from 'file!../../assets/img/dropicon.png'
import FacebookLogin from 'react-facebook-login';

@connect(null, (dispatch) => ({dispatch, updatePath}))
export default class Login extends React.Component {
  static propTypes = {
    //updatePath: PropTypes.func.isRequired
  }
  responseFacebook(a) {
    console.log(a);
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

      <div className="site__container">
      <FacebookLogin
    appId="103491386705646"
    autoLoad={true}
    callback={this.responseFacebook} />
  <div className="grid__container">

    <form onSubmit={this.handleSubmit} className="form form--login">

      <div className="form__field">
        <label className="fontawesome-user" for="login__username"><span className="hidden">Email</span></label>
        <input id="login__username" type="text" className="form__input" placeholder="Email" value={this.state.inputEmail}
        onChange={this.handleEmailChange} required />
      </div>

      <div className="form__field">
        <label className="fontawesome-lock" for="login__password"><span className="hidden">Password</span></label>
        <input id="login__password" type="password" className="form__input" placeholder="Password" value={this.state.inputPassword}
        onChange={this.handlePasswordChange} required />
      </div>

      <div className="form__field">
        <input type="submit" value="Sign In" />
      </div>

    </form>

    <p className="text--center">Not a member? <a href="#">Sign up now</a> <span className="fontawesome-arrow-right"></span></p>

  </div>

</div>
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
    e.preventDefault();
    nodeify(this.props.dispatch(login(this.state.inputEmail, this.state.inputPassword)), () => {
      // this.props.dispatch(updatePath('/'));
      window.location = "/";
    });
  }
}
