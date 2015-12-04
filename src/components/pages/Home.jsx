import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {postFile} from '../../actions/files';
import nodeify from 'nodeify';
import {ActionTypes} from '../../constants';
import Dropzone from 'react-dropzone';
import urlDropIcon from 'file!../../assets/img/dropicon.png'
//
// @connect(state => ({
//   //
// }), {
//   updatePath
// })
@connect(state => {
  console.log('stateeeee')
  console.log(state)
  return {files: state.files};
}, (dispatch) => ({dispatch, updatePath}))
export default class Home extends React.Component {
  static propTypes = {
    //files: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    console.log(context)
    this.state = {
      inputValue: ''
    };
    this.onDrop = this.onDrop.bind(this);
  }
  componentDidMount() {

  }

  render() {

    return (
      <Dropzone onDrop={this.onDrop} style={{maxWidth: "1280px", width: "100%",bottom: 0, top: "80px", position: "absolute"}} multiple={false}>
      <div id="dropClick" className="dropHere">
				<img src={urlDropIcon} id="homeIcon" alt="Drop image here" title="Drop your stupid file here."/>
				{(!this.props.files || !this.props.files.loading) && <span><h1 className="homeText">Drop file here <span className="subHeroText"> to generate a link.</span></h1></span>}
        {(this.props.files && this.props.files.loading) && <span><h1 className="homeText">File is uploading</h1></span>}
		  </div>
      </Dropzone>
    );
  }

  onDrop(files) {
    console.log(this)
    console.log('Received files: ', files);
    nodeify(this.props.dispatch(postFile(files)), (err, value) => {
      console.log(err)
      console.log(value)
      console.log(value.result.hash)
      console.log('/file/' + value.result.hash)
      console.log(updatePath)
      this.props.dispatch(updatePath('/file/' + value.result.hash));
    })
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit = e => {
    const {updatePath} = this.props;

    e.preventDefault();
    updatePath('/users/' + this.state.inputValue);
  }
}

Home.contextTypes = {
  store: PropTypes.object,
}

Home.onEnterLogout = store => (nextState, replaceState, callback) => {
  store.dispatch({type: ActionTypes.USER_LOGOUT });
  window.location = "/"
};
