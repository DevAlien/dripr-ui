import React, {PropTypes} from 'react'
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {Form, FormInput, FormField, Button, Spinner} from 'elemental';
import XScript from '../XScript';
import {getComments, postComment} from '../../../actions/files';
import nodeify from 'nodeify';
import moment from 'moment';

@connect((state) => {
    return {file: state.files.data}
}, (dispatch) => ({dispatch, updatePath}))
export default class CommentsBar extends React.Component {
    static propTypes = {
        file: PropTypes.object,
        fileId: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            comments: [],
            loading: true
        }


        if (__CLIENT__ && __ADSOPTIMAL__) {
            (function(w) {
                var d = document,
                    h = d.getElementsByTagName('head')[0],
                    j = d.createElement('script'),
                    k = d.createElement('script');
                j.setAttribute('src', '//cdn.adsoptimal.com/advertisement/settings/__ADSOPTIMAL__.js');
                k.setAttribute('src', '//cdn.adsoptimal.com/advertisement/manual.js');
                h.appendChild(j);
                h.appendChild(k);
            })(window);
        }
    }
    componentDidMount() {
      nodeify(this.props.dispatch(getComments(this.props.fileId)), this.getComments.bind(this));
    }

    getComments(error, result) {
        this.setState({comments: result.result, loading: false});
    }
    newComment(error, result) {
        let comments = this.state.comments;
        comments.push(result.result)
        this.setState({comments: comments});
    }

    generateComment(comment) {
        return (
            <li key={comment.id}>
                <h3>{comment.name}</h3>
                <span className="time">{moment(comment.createdAt).fromNow()}</span>
                <p>{comment.text.split("\n").map(function(item) {
                        return (
                            <span>{item}<br/></span>
                        )
                    })}</p>
            </li>
        )
    }
    handleSubmit() {
      var value = this.refs.commentMessage.refs.input.value;
        if(value.length > 0) {

          let comments = this.state.comments;
          nodeify(this.props.dispatch(postComment(this.props.fileId, value)), this.newComment.bind(this));
          this.refs.commentMessage.refs.input.value = '';
        }
    }

    render() {
        let commentsContent;
        if (this.state.loading) {
            commentsContent = (
                <div className="no-comments"><Spinner size="lg"/></div>
            )
        } else if (this.state.comments.length > 0) {
            let comments = [];
            this.state.comments.forEach((comment) => {
                comments.push(this.generateComment(comment));
            })
            commentsContent = (
                <ul id="comments" className="links-open">
                    {comments}
                </ul>
            )
        } else {
            commentsContent = (
                <div className="no-comments">There are no comments at the moment, write yours!</div>
            )
        }
        return (
            <div className="sidebar">
                <div>
                    <div className="adsoptimal-slot" style={{
                        width: "300px",
                        height: "250px"
                    }}></div>
                </div>
                <div className="comments">
                    {commentsContent}
                </div>
                <div className="bottom">
                    <Form style={{
                        padding: '10px'
                    }}>
                        <FormInput autofocus placeholder="Enter email" style={{
                            minHeight: 'initial'
                        }} ref="commentMessage" name="basic-form-input-email" multiline/>
                        <div style={{
                            float: 'right',
                            marginTop: '5px',
                            marginBottom: '5px'
                        }}>
                            <Button onClick={this.handleSubmit.bind(this)}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }

}
