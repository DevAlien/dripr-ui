import React, {PropTypes} from 'react';
import moment from 'moment';
import {Link} from 'react-router';

export default class Login extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);

  }
  getStyle(thumbnail) {
    if(thumbnail) {
      return {backgroundImage: "url('" + (thumbnail) + "')"};
    } else {
      return {textAlign: "center", "fontSize": "64px", "paddingTop": "30px", backgroundColor: "#324761"};
    }
  }

  getClass(type) {
    switch(type.toLowerCase()) {
      case 'url':
        return 'fa-link img';
      case 'code':
        return 'fa-code img';
      case 'video':
        return 'fa-video-camera img';
      case 'text':
        return 'fa-pencil-square-o img';
      default:
        return 'img'
    }
  }
  render() {
    let data = this.props.data;
    let style = this.getStyle(data.thumbnail || data.url);
    let cl = this.getClass(data.type);
    return (
      <div key={data.id} className="cont">
          <Link to={"/file/" + data.hash} className="single-file">
              <div className={cl} style={style}>
                <div className="listDetail">
                  <div><i className="icon-time"/> {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                  <div><i className="icon-doc"/> {this.capitalizeFirstLetter(data.type)}</div>
                  <div><i className="icon-click"/> {data.views ? data.views : "0"} Views</div>
                  <div><i className="icon-comment"/> {data.comments ? data.comments + ' Comments' : '0 Comments'}</div>
                </div>
              </div>
          </Link>
          
      </div>

    );
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
