import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {getFile} from '../../actions/files';
import nodeify from 'nodeify';
import Helmet from 'react-helmet';

const { Container, Card, Row, Col, FormInput } = require('elemental');

import ViewerText from '../components/viewers/Text'
import ViewerUrl from '../components/viewers/Url'
import ViewerVideo from '../components/viewers/Video'
import ViewerCode from '../components/viewers/Code'
import ViewerImage from '../components/viewers/Image'
import ViewerDefault from '../components/viewers/Default'
import ViewerPdf from '../components/viewers/Pdf'
import CommentsBar from '../components/file/CommentsBar'

@connect(state => {
  return {
    file: state.files.data,
    isMobile: state.app.isMobile
}}, {
  updatePath
})
export default class File extends React.Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
    updatePath: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      mobileMenuIsVisible: false,
      windowHeight: this.props.isMobile ? 700 : 1200,
      windowWidth: this.props.isMobile ? 400: 800
    };

    if(__CLIENT__) {
      this.state = {
        mobileMenuIsVisible: false,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      };
    (function(w) {
if(navigator.userAgent.match(/iPhone|iPod|iPad|Android/i)==null)return;
var d=document,h=d.getElementsByTagName('head')[0],s=d.createElement('style'),j=d.createElement('script'),k=d.createElement('script');
s.setAttribute('rel','mw-page-block');s.innerHTML='body > * {display:none !important}';
j.setAttribute('src','//cdn.adsoptimal.com/advertisement/settings/25341.js');
k.setAttribute('src','//cdn.adsoptimal.com/advertisement/dispatcher.js');
j.onerror=k.onerror=function(){h.removeChild(s);h.removeChild(j);h.removeChild(k);};
h.appendChild(s);h.appendChild(j);h.appendChild(k);
})(window);
    }
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

  render() {
    if(!this.props.file)
      return(<h1>Error</h1>);

    let viewer;
    switch(this.props.file.type) {
      case 'text':
        viewer = this.props.file.text ? <ViewerText data={this.props.file} /> : <ViewerDefault data={this.props.file} />;
        break;
      case 'url':
        viewer = <ViewerUrl data={this.props.file} />;
        break;
      case 'video':
        viewer = <ViewerVideo data={this.props.file} />;
        break;
      case 'code':
        viewer = <ViewerCode data={this.props.file} />;
        break;
      case 'image':
        viewer = <ViewerImage data={this.props.file} />;
        break;
      case 'pdfa': //do not want to activate it right now
        viewer = <ViewerPdf data={this.props.file} />;
        break;
      default:
        viewer = <ViewerDefault data={this.props.file} />;
        break;
    }
    let colStyle = {padding: '50px 5px', textAlign: 'center'};
    let bar;

    if(!__SERVER__ && (this.state.windowWidth > 768 && !this.props.isMobile)) {
      colStyle.marginRight = '300px';
      colStyle.padding = '50px 30px';
      bar = (<CommentsBar fileId={this.props.file.id}/>);
    }

    return (
      <div className="file">
        <Helmet
          title="Home"
          titleTemplate="%s | Dripr.io"
          meta={this.getMetaTags(this.props.file)}
        />
        <Row style={{margin:0}}>
          <Col sm="100%" style={colStyle}>
            {viewer}
          </Col>
        </Row>
        {bar}
      </div>
    );
  }

  getMetaTags(file) {
    let metas = [
        {"itemprop": "name", "content": "Dripr.io"},
        {"itemprop": "description", "content": "Dripr.io upload files, videos, code and take screenshots with the desktop app"},
        {"name": "twitter:card", "content": "Photo"},
        {"name": "twitter:site", "content": "@driprio"},
        {"name": "twitter:title", "content": "Dripr.io"},
        {"name": "twitter:description", "content": "Dripr.io upload files, videos, code and take screenshots with the desktop app"},
        {"name": "twitter:creator", "content": "@driprio"},
        {"property": "og:title", "content": "Dripr.io"},
        {"property": "og:type", "content": "website"},
        {"property": "og:url", "content": "https://dripr.io/file/" + file.hash},
        {"property": "og:description", "content": "Dripr.io upload files, videos, code and take screenshots with the desktop app"},
        {"property": "og:site_name", "content": "Dripr.io"},
    ];
    if(file.thumbnail) {
      metas.push({"itemprop": "image", "content": file.thumbnail});
      metas.push({"name": "twitter:image:src", "content": file.thumbnail})
      metas.push({"property": "og:image", "content": file.thumbnail})
    }

    return metas;
  }
}

File.onEnter = store => (nextState, replaceState, callback) => {
  const {id} = nextState.params;

  nodeify(store.dispatch(getFile(id)), callback);
};
