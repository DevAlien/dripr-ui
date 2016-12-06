import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {postFile, postCode} from '../../actions/files';
import nodeify from 'nodeify';
import {ActionTypes} from '../../constants';
import Dropzone from 'react-dropzone';
import urlDropIcon from 'file!../../assets/img/dropicon.png'
import Loader from '../components/home/loader';
const { Container, Card, Row, Col, InputGroup, FormInput, Button, FormSelect, FormField, Alert } = require('elemental');

import IconHomeCloud from '../components/icons/IconHomeCloud';
import IconHomeWeb from '../components/icons/IconHomeWeb';
import IconHomeCode from '../components/icons/IconHomeCode';
import IconHomeLaptop from '../components/icons/IconHomeLaptop';
import IconLogo from '../components/icons/IconLogo';

import HomeUpload from '../components/home/HomeUpload';
import HomeWeb from '../components/home/HomeWeb';
import HomeCode from '../components/home/HomeCode';
import HomeAbout from '../components/home/HomeAbout';
import HomeDownload from '../components/home/HomeDownload';

@connect(state => {
    return {files: state.files};
}, (dispatch) => ({dispatch, updatePath}))
export default class Home extends React.Component {
    static propTypes = {
        files: PropTypes.object,
        location: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
          selected: props.location.query.section || 'upload', error: false, textType: 'text'};
        this.onDrop = this.onDrop.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location) {
        this.setState({selected: nextProps.location.query.section});
      }
      console.log('next', nextProps)
    }


    render() {
      return (<header id="first">
                <div className="header-content">
                  <div className="inner">
                    <h1 className="home-title">Share files, <b className="home-title-b">the simple way</b></h1>
                    <span className="home-subtitle">We're completely free and there is no need to sign up. But if you want unlimited file uploads and lots of awesome features - It take seconds to sign up with facebook</span>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="row">
                          <div className="col-md-2 offset-md-1 offset-sm-0">
                            <div className={(this.state.selected !== 'upload' ? 'home-feature' : 'home-feature-selected') + ' card-block text-xs-center'} onClick={this.changeView.bind(this, 'upload')}>
                              <IconHomeCloud className="home-icon"/>
                              <div>Upload File</div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className={(this.state.selected !== 'web' ? 'home-feature' : 'home-feature-selected') + ' card-block text-xs-center'} onClick={this.changeView.bind(this, 'web')}>
                              <IconHomeWeb className="home-icon"/>
                              <div>Web Screenshot</div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className={(this.state.selected !== 'code' ? 'home-feature' : 'home-feature-selected') + ' card-block text-xs-center'} onClick={this.changeView.bind(this, 'code')}>
                              <IconHomeCode className="home-icon"/>
                              <div>Code Snippet</div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className={(this.state.selected !== 'about' ? 'home-feature' : 'home-feature-selected') + ' card-block text-xs-center'} onClick={this.changeView.bind(this, 'about')}>
                              <IconLogo className="home-icon home-icon-logo"/>
                              <div>About dripr</div>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className={(this.state.selected !== 'download' ? 'home-feature' : 'home-feature-selected') + ' card-block text-xs-center'} onClick={this.changeView.bind(this, 'download')}>
                              <IconHomeLaptop className="home-icon"/>
                              <div>Our App</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row" style={{marginTop: '25px'}}>
                      <div className={'upload' + (this.state.selected !== 'upload' ? ' no' : '')}>
                        <HomeUpload onDrop={this.onDrop} isUploading={this.props.files.loading || false}/>
                      </div>
                      <div className={'web' + (this.state.selected !== 'web' ? ' no' : '')}>
                        <HomeWeb createScreenshots={this.clickCreateUrl.bind(this)} />
                      </div>
                      <div className={'code' + (this.state.selected !== 'code' ? ' no' : '')}>
                        <HomeCode submit={this.clickSubmit}/>
                      </div>
                      <div className={'about' + (this.state.selected !== 'about' ? ' no' : '')}>
                        <HomeAbout />
                      </div>
                      <div className={'download' + (this.state.selected !== 'download' ? ' no' : '')}>
                        <HomeDownload />
                      </div>
                    </div>
                  </div>
                </div>
              </header>);
    }

    changeView(selected) {
      this.setState({selected: selected});
    }
    
     isValidUrl(value) {
       return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
     }

    onDrop(files) {
        this.setState({files: files});
        nodeify(this.props.dispatch(postFile(files)), (err, value) => {
            if (err)
                return console.log(err);

            this.props.dispatch(updatePath('/file/' + value.result.hash));
        })
    }

    clickCreateUrl = (value) => {
      if(this.isValidUrl(value)) {
        this.setState({error: false});
        nodeify(this.props.dispatch(postCode(value, 'text')), (err, value) => {
            if (err)
                return console.log(err);

            this.props.dispatch(updatePath('/file/' + value.result.hash));
        })
      } else {
        this.setState({error: 'You must provide a valid URL so that we can provide you some screenshots.'})
      }
    }

    clickSubmit = (text, textType) => {
        if(text.length < 20) {
          return {error: 'You must enter a text of at least 20 characters.'};
        }

        nodeify(this.props.dispatch(postCode(text, textType)), (err, value) => {
            if (err)
                return console.log(err);

            this.props.dispatch(updatePath('/file/' + value.result.hash));
        });

        return true;
    }
}

Home.contextTypes = {
    store: PropTypes.object
}

Home.onEnterLogout = store => (nextState, replaceState, callback) => {
    store.dispatch({type: ActionTypes.USER_LOGOUT});
    window.location = "/"
};
