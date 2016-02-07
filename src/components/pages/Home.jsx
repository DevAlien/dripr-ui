import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {postFile, postCode} from '../../actions/files';
import nodeify from 'nodeify';
import {ActionTypes} from '../../constants';
import Dropzone from 'react-dropzone';
import urlDropIcon from 'file!../../assets/img/dropicon.png'

@connect(state => {
    return {files: state.files};
}, (dispatch) => ({dispatch, updatePath}))

export default class Home extends React.Component {
    static propTypes = {
        //files: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            inputValue: '',
            files: []
        };
        this.onDrop = this.onDrop.bind(this);
    }
    componentDidMount() {}

    onOpenClick() {
        this.refs.dropzone.open();
    }
    render() {
        var sty = {
            marginTop: "200px"
        };
        if (this.state.files.length > 0)
            sty.height = '100%';
        return (
            <Dropzone onDrop={this.onDrop.bind(this)} ref="dropzone" className="home-box" disableClick={true} style={sty} multiple={false}>
                {this.state.files.length > 0
                    ? <div style={{
                            textAlign: "center"
                        }}>
                            <h2>Uploading
                                {this.state.files.length}
                                file...</h2>
                            <div>{this.state.files.map((file) => {
                                    return file.type.startsWith('image')
                                        ? <img style={{
                                                width: "20%"
                                            }} src={file.preview}/>
                                        : <p>djede</p>
                                })}</div>
                        </div>
                    : <div>
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
                    </div>}

            </Dropzone>
        );
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
