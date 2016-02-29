import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {getFile} from '../../actions/files';
import nodeify from 'nodeify';
import Helmet from 'react-helmet';

import ViewerText from '../components/viewers/Text'
import ViewerUrl from '../components/viewers/Url'
import ViewerVideo from '../components/viewers/Video'
import ViewerCode from '../components/viewers/Code'
import ViewerImage from '../components/viewers/Image'
import ViewerDefault from '../components/viewers/Default'
import ViewerPdf from '../components/viewers/Pdf'

@connect(state => {
  return {
    file: state.files.data
}}, {
  updatePath
})
export default class File extends React.Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    updatePath: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
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

    return (
      <div className="file">
      <Helmet
  title="Home"
  titleTemplate="%s | Dripr.io"
  meta={this.getMetaTags(this.props.file)}
/>
        {viewer}
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
