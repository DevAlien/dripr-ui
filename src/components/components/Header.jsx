import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import urlLogo from 'file!../../assets/img/menulogo.png'
import urlTwitterImg from 'file!../../assets/img/twitter.svg'
import urlFacebookImg from 'file!../../assets/img/facebook.svg'
import urlGithubImg from 'file!../../assets/img/github.svg'
import filesize from 'filesize';
import FacebookLogin from 'react-facebook-login2';
import {connect} from 'react-redux';
import {loginFacebook} from '../../actions/users';
import nodeify from 'nodeify';
import {Glyph} from 'elemental';

import config from '../../../config';

import IconLogo from './icons/IconLogo';

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

      this.state = {
  			mobileMenuIsVisible: false,
  			windowHeight: this.props.app.isMobile ? 700 : 1200,
  			windowWidth: this.props.app.isMobile ? 400: 800
  		};
      if(__CLIENT__)
      this.state = {
  			mobileMenuIsVisible: false,
  			windowHeight: window.innerHeight,
  			windowWidth: window.innerWidth
  		};

    }

    componentDidMount () {
      if(__CLIENT__) {
        window.addEventListener('resize', this.handleResize.bind(this));
      }

  	}

  	componentWillUnmount () {
      if(__CLIENT__)
  		  window.removeEventListener('resize', this.handleResize.bind(this));
  	}

  	handleResize () {
  		this.setState({
  			windowHeight: window.innerHeight,
  			windowWidth: window.innerWidth
  		});
  	}

  	toggleMenu () {
  		this.setState({
  			mobileMenuIsVisible: !this.state.mobileMenuIsVisible
  		});
  	}

    render() {
      const state = this.props;

      return (<nav id="topNav" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <button className="navbar-toggler hidden-md-up pull-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                ☰
            </button>
            <Link className="navbar-brand page-scroll" to="/"><IconLogo className="header-logo"/></Link>
            <div className="collapse navbar-toggleable-sm" id="collapsingNavbar">
                <ul className="nav navbar-nav">
                    {(state.app && state.app.user && state.app.user.name) &&
                      <li className="nav-item">
                        <Link className="nav-link page-scroll menu" to="/list">{state.app.user.name}</Link>
                      </li>
                    }
                </ul>
                <ul className="nav navbar-nav pull-xs-right" style={{float: 'right'}}>
                    {(!state.app || !state.app.user || !state.app.user.name) &&
                      <li className="nav-item">
                        <Link className="nav-link page-scroll menu" to="/login">Sign Up</Link>
                      </li>
                    }
                    {state.app && state.app.user && state.app.user.name &&
                      <li className="nav-item">
                        <Link className="nav-link page-scroll menu" to="/logout">Logout</Link>
                      </li>
                    }
                    <li className="nav-item">
                        <Link href="#one" className="btn btn-primary btn-sm" style={{marginTop: "15px"}} to="/?section=download">Download</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>);
    }
    renderw () {
      const state = this.props;
      var height = (this.state.windowWidth < 768) ? this.state.windowHeight : 'auto';
      var menuClass = this.state.mobileMenuIsVisible ? 'primary-nav-menu is-visible' : 'primary-nav-menu is-hidden';

      var menu = [
        <Link key="/downloads" className="primary-nav__item" activeClassName="active" onClick={this.toggleMenu.bind(this)} to="/downloads">
        <span className="primary-nav__item-inner">Downloads</span>
      </Link>]
      if(!state.app || !state.app.user || !state.app.user.name) { //not logged in
        menu.push(<Link key="/login" className="primary-nav__item" activeClassName="active" onClick={this.toggleMenu.bind(this)} to="/login">
        <span className="primary-nav__item-inner">Login</span>
      </Link>)
      }
      if (state.app && state.app.user && state.app.user.name) { //logged in
        menu.push(<Link key="/list" className="primary-nav__item" activeClassName="active" onClick={this.toggleMenu.bind(this)} to="/list">
        <span className="primary-nav__item-inner">{state.app.user.name}</span>
      </Link>);
      menu.push(<Link key="/logout" className="primary-nav__item" activeClassName="active" onClick={this.toggleMenu.bind(this)} to="/logout">
      <span className="primary-nav__item-inner">Logout</span>
    </Link>)
      }

      //menu.push(<Link className="primary-nav__item"><FacebookLogin style={{padding: "0", lineHeight: "40px"}} appId={config.facebookToken} autoLoad={false} callback={this.responseFacebook.bind(this)} scope="public_profile, email" fields="email,name" size="small"/></Link>)
        return(
          <nav className="primary-nav">
    				<Link to="/" className="primary-nav__brand" title="Home">
    					<img src={urlLogo} className="primary-nav__brand-src" />
    				</Link>
            <button onClick={this.toggleMenu.bind(this)} className="primary-nav__item primary-nav-menu-trigger">
    					<span className="primary-nav-menu-trigger-icon octicon octicon-navicon" />
    					<span className="primary-nav-menu-trigger-label">{this.state.mobileMenuIsVisible ? 'Close' : 'Menu'}</span>
    				</button>

            <div className={menuClass} style={{ height }}>
    					<div className="primary-nav-menu-inner">
              {menu}
    					</div>
    				</div>
            <div  className="primary-nav__brand" style={{float: 'right', right: 0, left: 'inherit', marginTop: '-12px'}}>
            <a href="https://github.com/DevAlien/dripr-ui" target="_blank" title="View on GitHub" style={{float: 'right', paddingLeft: '10px'}}>
    					<img src={urlGithubImg} className="primary-nav__brand-src" width="24"/>
    				</a>
            <a href="https://twitter.com/Driprio" target="_blank" title="View on Twitter"  style={{float: 'right', paddingLeft: '10px'}}>
    					<img src={urlTwitterImg} className="primary-nav__brand-src" width="24"/>
    				</a>
            <a href="https://www.facebook.com/dripr" target="_blank" title="View on Facebook"  style={{float: 'right', paddingLeft: '10px'}}>
    					<img src={urlFacebookImg} className="primary-nav__brand-src" width="24"/>
    				</a>

            </div>
            </nav>
        );
    }
}

Header.contextTypes = {
  store: PropTypes.object,
}
