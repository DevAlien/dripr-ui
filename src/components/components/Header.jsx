import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import urlLogo from 'file!../../assets/img/menulogo.png'
import filesize from 'filesize';

export default class Header extends React.Component {
  static propTypes = {
  }

    constructor (props, context) {
      super(props, context);
      this.store = context.store;
    }

    render () {
      const state = this.store.getState();

        return(
            <div className="pure-menu pure-menu-horizontal pure-menu-dripr">
                <Link to="/" className="pure-menu-heading pure-menu-link"><img src={urlLogo}/></Link>
                {(!state.app || !state.app.user || !state.app.user.name) &&
                    <ul className="pure-menu-list">
                      <li className="pure-menu-item">
                        <Link to="/login" className="pure-menu-link">Sign In</Link>
                    </li>
                    <li className="pure-menu-item">
                        <a href="#asd" className="pure-menu-link">Create Account</a>
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

                { (state.files && state.files.data && state.files.data.url && (state.routing && state.routing.path && state.routing.path.indexOf('/file/') === 0)) && <ul className="pure-menu-list" style={{"float": "right", "marginTop": "8px"}}>
                    <li className="pure-menu-item">
                        <a href={state.files.data.url} target="_blank" className="pure-menu-link pure-menu-link-button">Download</a>
                    </li>
                    {state.files.data.fileSize && <li className="pure-menu-item">
                      <span className="pure-menu-link pure-menu-span">{filesize(state.files.data.fileSize)}</span>
                    </li>}
                    {state.files.data.imageSize && <li className="pure-menu-item">
                        <span className="pure-menu-link pure-menu-span">{state.files.data.imageSize.width} x {state.files.data.imageSize.height}</span>
                    </li>}
                </ul>}
            </div>
        );
    }
}

Header.contextTypes = {
  store: PropTypes.object,
}
