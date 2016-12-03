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
            loading: true,
            comment: ''
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

    handleChange(event) {
        this.setState({comment: event.target.value});
      }

    handleSubmit() {
      var value = this.state.comment;
        if(value.length > 0) {

          let comments = this.state.comments;
          nodeify(this.props.dispatch(postComment(this.props.fileId, value)), this.newComment.bind(this));
          this.setState({comment: ''});
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
                    <div className="file-info">
                        {!this.props.file.title && <div className="file-info-title">Here</div>}
                        <div><i className="icon-time"/> {moment(this.props.file.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                        <div><i className="icon-doc"/> {this.capitalizeFirstLetter(this.props.file.type)}</div>
                        <div><i className="icon-click"/> {this.props.file.views ? this.props.file.views : "0"} Views</div>
                        <div><i className="icon-comment"/> {this.props.file.comments ? this.props.file.comments + ' Comments' : '0 Comments'}</div>
                    </div>
                </div>
                <div className="comments">
                    {commentsContent}
                </div>
                <div className="bottom">
                    <div className="input-group comment-form">
      <textarea className="form-control comment-input" placeholder="Write a comment..." value={this.state.comment} onChange={this.handleChange.bind(this)}/>
      <span className="input-group-btn">
        <button className="btn btn-secondary comment-btn" type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
      </span>
    </div>
                </div>
            </div>
        )
    }

}
