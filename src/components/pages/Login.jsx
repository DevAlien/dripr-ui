import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loginFacebook} from '../../actions/users';
import nodeify from 'nodeify';

import FacebookLogin from 'react-facebook-login2';
import LoginForm from '../components/login/login';
import SignupForm from '../components/login/signup';
import config from '../../../config';
const { Container, Card, Row, Col } = require('elemental');

@connect(null, (dispatch) => ({dispatch}))
export default class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }
    responseFacebook(data) {
        nodeify(this.props.dispatch(loginFacebook(data)), (err, result) => {
            if (result && result.type === 'LOGIN_SUCCESS') {
                window.location = "/";
            }
            // MANAGE ERRORS
        });

    }
    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: 'login'
        };
    }

    render() {
        return (
            <Container maxWidth={800} className="demo-container" style={{textAlign: 'center', paddingTop: '50px'}}>
                <div className="login-box">
                    <div className="social-login">
                        <FacebookLogin appId={config.facebookToken} autoLoad={false} callback={this.responseFacebook.bind(this)} scope="public_profile, email" fields="email,name" size="small"/>
                    </div>
                </div>
            </Container>
        );
    }
}
