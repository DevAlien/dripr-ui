import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {postFile, postCode} from '../../actions/files';
import nodeify from 'nodeify';
import {ActionTypes} from '../../constants';
import Dropzone from 'react-dropzone';
import urlDropIcon from 'file!../../assets/img/dropicon.png'
import Loader from '../components/home/loader';

@connect(state => {
    return {files: state.files};
}, (dispatch) => ({dispatch, updatePath}))
export default class Home extends React.Component {
    static propTypes = {
        files: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {files: [], isDrag: false};
        this.onDrop = this.onDrop.bind(this);
    }
    componentDidMount() {}

    onOpenClick() {
        this.refs.dropzone.open();
    }
    render() {
        let content;
        var sty = {
            marginTop: "200px"
        };

        if(this.props.files && this.props.files.loading === true) {
          content = <Loader data={this.state.files} />
        } else if(this.state.isDrag) {
          content = <div style={{ textAlign: "center" }}>Drop file to upload</div>
        } else {
          content = (<div>
                  <div className="left-box" onClick={this.onOpenClick.bind(this)}>
                      <div className="inner-box"><img src={urlDropIcon}/>
                          <p className="home-box-text">Drop a file here to upload or click</p>
                      </div>
                  </div>
                  <div className="right-box">
                      <div className="right-inner">
                          <p className="home-box-text">Paste code or an URL</p>
                          <textarea ref="text" className="text-home"></textarea>
                          <div style={{
                              "marginTop": "15px"
                          }}>
                              <div className="u-form-group right homein">
                                  <select ref="code">
                                      <option>Text</option>
                                      <option>HTML</option>
                                      <option>Javascript</option>
                                      <option>Java</option>
                                      <option>XML</option>
                                  </select>
                              </div>
                              <div className="u-form-group right homein">
                                  <button onClick={this.clickSubmit.bind(this)}>Submit</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )
        }
        return (

            <Dropzone onDrop={this.onDrop.bind(this)} ref="dropzone" className="home-box" onDragEnter={this.onDragEnter.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)} activeClassName="ondrop" disableClick={true} style={sty} multiple={false}>
            {content}
            </Dropzone>
        );
    }

    onDragEnter(files) {
        if(!this.state.isDrag)
          this.setState({isDrag: true});
    }

    onDragLeave(files) {
      if(this.state.isDrag)
        this.setState({isDrag: false});
    }

    onDragOver(files) {
      if(this.state.isDrag)
        this.setState({isDrag: false});
    }

    onDrop(files) {
        this.setState({files: files});
        nodeify(this.props.dispatch(postFile(files)), (err, value) => {
            if (err)
                return console.log(err);

            this.props.dispatch(updatePath('/file/' + value.result.hash));
        })
    }

    clickSubmit = e => {
        nodeify(this.props.dispatch(postCode(this.refs.text.value, this.refs.code.value)), (err, value) => {
            if (err)
                return console.log(err);

            this.props.dispatch(updatePath('/file/' + value.result.hash));
        })
    }
}

Home.contextTypes = {
    store: PropTypes.object
}

Home.onEnterLogout = store => (nextState, replaceState, callback) => {
    store.dispatch({type: ActionTypes.USER_LOGOUT});
    window.location = "/"
};
