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

@connect(state => {
    return {files: state.files};
}, (dispatch) => ({dispatch, updatePath}))
export default class Home extends React.Component {
    static propTypes = {
        files: PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.state = {files: [], isDrag: false, error: false, textType: 'text'};
        this.onDrop = this.onDrop.bind(this);
        this.textTypeOptions = [
                              	{ label: 'Text',    value: 'text' },
                              	{ label: 'Javascript',  value: 'javascript' },
                              	{ label: 'Java', value: 'java' },
                              	{ label: 'XML',    value: 'xml' },
                                { label: 'HTML', value: 'html'}
                              ];
    }

    componentDidMount() {}

    onOpenClick() {
        this.refs.dropzone.open();
    }
    render() {
      let content;
      var sty = {
          //marginTop: "200px"
      };

      if(this.props.files && this.props.files.loading === true) {
        content = <Loader data={this.state.files} />
      } else if(this.state.isDrag) {
        content = <div style={{ textAlign: "center" }}>Drop file to upload</div>
      } else {

      content = (
        <Row>
          <Col sm="1/3" onClick={this.onOpenClick.bind(this)} style={{borderRight: '1px solid #777', display: 'inherit'}}>
            <div style={{margin: 'auto', textAlign: 'center'}}>
            <div><img src={urlDropIcon}/>
                <p style={{marginTop: '1em'}}>Drop here a file to upload or click</p>
            </div>
            </div>
          </Col>
          <Col sm="2/3">
          <div className="right-inner" style={{paddingLeft: '15px'}}>
              <h4 className="home-box-text">Paste an URL to take screenshots of it</h4>
              <InputGroup contiguous>
                <InputGroup.Section grow>
                  <FormInput ref="urlInput" type="text" placeholder="Example: https://dripr.io" />
                </InputGroup.Section>
                <InputGroup.Section>
                  <Button onClick={this.clickCreateUrl.bind(this)}>Create</Button>
                </InputGroup.Section>
              </InputGroup>
              <h4 className="home-box-text">Paste text or code to get it formatted and/or highlighted</h4>
              <FormField>
                <FormInput ref="textInput" placeholder="Write text or code" multiline />
              </FormField>
              <FormField>
              <FormSelect ref="textType" options={this.textTypeOptions} onChange={this.updateSelect.bind(this)}/>
              </FormField>
              <Button type="success" onClick={this.clickSubmit.bind(this)} style={{float: 'right'}}>Create</Button>

          </div>
          </Col>
        </Row>
      );
    }

      return (<Container maxWidth={800} className="demo-container">
				<h1 style={{margin: '40px auto', display: 'table', fontSize: '2em'}}>Dripr.io | Upload images, video or files for free</h1>
        <h3 style={{textAlign: 'center'}}>You can signup for free via facebook to have an history of your actions in dripr.io, in the future we will limit some actions for anonymous users</h3>
        {this.state.error && <Alert type="warning">{this.state.error}</Alert>}
        <Dropzone onDrop={this.onDrop.bind(this)} ref="dropzone" className="home-box" onDragEnter={this.onDragEnter.bind(this)} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)} activeClassName="ondrop" disableClick={true} style={sty} multiple={false}>
          <Card style={{backgroundColor: '#353b44'}} className="home-card">
          {content}
          </Card>
        </Dropzone>
      </Container>);
    }
     isValidUrl(value) {
       return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
     }

    render3() {
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
                          <textarea ref="textInput" className="text-home"></textarea>
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

    updateSelect(option) {
			this.setState({ textType: option });
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

    clickCreateUrl = e => {
      if(this.isValidUrl(this.refs.urlInput.refs.input.value)) {
        this.setState({error: false});
        nodeify(this.props.dispatch(postCode(this.refs.urlInput.refs.input.value, 'text')), (err, value) => {
            if (err)
                return console.log(err);

            this.props.dispatch(updatePath('/file/' + value.result.hash));
        })
      } else {
        this.setState({error: 'You must provide a valid URL so that we can provide you some screenshots.'})
      }
    }

    clickSubmit = e => {
        let text = this.refs.textInput.refs.input.value;
        let textType = this.state.textType;

        if(text.length < 20) {
          this.setState({error: 'You must enter a text of at least 20 characters.'})
          return false;
        }

        nodeify(this.props.dispatch(postCode(text, textType)), (err, value) => {
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
