import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {getFile} from '../../actions/files';
import nodeify from 'nodeify';
import '../../assets/css/video.css';
import '../../assets/css/tomorrow-night.css';
import urlDropIcon from 'file!../../assets/img/dropicon.png'
import ReactPlayer from 'react-player'
import Video from "react-h5-video";
import Highlight from 'react-highlight';
import ReactRedirect from 'react-redirect';

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
    return (
      <div className="file">
          {(this.props.file.type === 'url') && <ReactRedirect location={this.props.file.text}><div>Redirecting...</div></ReactRedirect>}
          {(this.props.file.type === "video") && <Video sources={[this.props.file.url]} poster="./video/poster.png" ></Video>}
          {(this.props.file.type === 'code') && <Highlight style={{"width": "100px"}}className={(this.props.file.language).toLowerCase()}>{this.props.file.text}</Highlight>}
          {(this.props.file.type === "image") && <img src={this.props.file.url} alt="*" />}
      </div>
    );
  }
}

File.onEnter = store => (nextState, replaceState, callback) => {
  const {id} = nextState.params;

  nodeify(store.dispatch(getFile(id)), callback);
};
