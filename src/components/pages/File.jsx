import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {getFile} from '../../actions/files';
import nodeify from 'nodeify';

import ViewerText from '../components/viewers/Text'
import ViewerUrl from '../components/viewers/Url'
import ViewerVideo from '../components/viewers/Video'
import ViewerCode from '../components/viewers/Code'
import ViewerImage from '../components/viewers/Image'
import ViewerDefault from '../components/viewers/Default'

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
        viewer = <ViewerText data={this.props.file} />;
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
      default:
        viewer = <ViewerDefault data={this.props.file} />;
        break;
    }

    return (
      <div className="file">
        {viewer}
      </div>
    );
  }
}

File.onEnter = store => (nextState, replaceState, callback) => {
  const {id} = nextState.params;

  nodeify(store.dispatch(getFile(id)), callback);
};
