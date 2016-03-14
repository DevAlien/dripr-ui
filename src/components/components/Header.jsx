import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import urlLogo from 'file!../../assets/img/menulogo.png'
import filesize from 'filesize';
import FacebookLogin from 'react-facebook-login2';
import {connect} from 'react-redux';
import {loginFacebook} from '../../actions/users';
import nodeify from 'nodeify';

import config from '../../../config';

@connect(state => {
  return {...state}}, (dispatch) => ({dispatch}))
export default class Header extends React.Component {
  static propTypes = {
  }
  responseFacebook(data) {
      nodeify(this.props.dispatch(loginFacebook(data)), (err, result) => {
          if (result && result.type === 'LOGIN_SUCCESS') {
              window.location = "/";
          }
          // MANAGE ERRORS
      });

  }
    constructor (props, context) {
      super(props, context);
    }

    render () {
      const state = this.props;

        return(
            <div className="pure-menu pure-menu-horizontal pure-menu-dripr">
                <Link to="/" className="pure-menu-heading pure-menu-link"><img src={urlLogo}/></Link>
                {(!state.app || !state.app.user || !state.app.user.name) &&
                  <ul className="pure-menu-list">
                    <li className="pure-menu-item">
                      <Link to="/login" className="pure-menu-link">Sign In</Link>
                    </li>
                  </ul> }
                    {(state.app && state.app.user && state.app.user.name) &&
                      <ul className="pure-menu-list">
                        <li className="pure-menu-item">
                            <Link to="/list" className="pure-menu-link">{state.app.user.name}</Link>
                        </li>
                        <li className="pure-menu-item">
                            <Link to="/logout" className="pure-menu-link">Logout</Link>
                        </li>
                      </ul>
                    }
            </div>
        );
    }
}

Header.contextTypes = {
  store: PropTypes.object,
}
