import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loginFacebook} from '../../actions/users';
import nodeify from 'nodeify';
import {Button} from 'elemental'
import FacebookLogin from 'react-facebook-login2';
import LoginForm from '../components/login/login';
import SignupForm from '../components/login/signup';
import config from '../../../config';

@connect(null, (dispatch) => ({dispatch}))
export default class Downloads extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          mac: 'https://files.dripr.io/DriprMacOSX.zip',
          win32: 'https://files.dripr.io/DriprWin32.zip',
          win64: 'https://files.dripr.io/DriprWin64.zip'
        }
    }

    render() {
        return (
            <div>
              <div style={{textAlign: 'center'}}><h1>Here you can download our Desktop App</h1>
              <h2>It is a menubar app, so you will have a little icon and there you can manage the app</h2>
              <span>
                <Button type="default-primary" style={{margin: "10px"}} href={this.state.mac}>Download MacOSX</Button>
                <Button type="default-primary" style={{margin: "10px"}} href={this.state.win32}>Download Windows 32bit</Button>
                <Button type="default-primary" style={{margin: "10px"}} href={this.state.win64}>Download Windows 64bit</Button>
              </span>

              </div>
              <div style={{margin: "50px auto", maxWidth: "350px"}}>
                <h3>Shortcuts</h3>
                <h4>Mac OSX</h4>
                <div>Fullscreen screenshot: <b>CMD + SHIFT + A</b></div>
                <div>Cropped screenshot: <b>CMD + SHIFT + X</b></div>

                <h4>Windows</h4>
                <div>Fullscreen screenshot: <b>CTRL + SHIFT + A</b></div>
                <div>Cropped screenshot: <b>CTRL + SHIFT + X</b></div>
              </div>
            </div>
        );
    }
}
