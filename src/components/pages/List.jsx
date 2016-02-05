import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {Link} from 'react-router';
import {getData} from '../../actions/data';
import '../../assets/css/fontello-embedded.css'
import urlDropIcon from 'file!../../assets/img/dropicon.png'
import nodeify from 'nodeify';
import moment from 'moment';
import videoImage from 'file!../../assets/img/Video.jpg'

@connect(state => {
    return {
      data: state.data.data
    };
}, {updatePath})
export default class List extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        updatePath: PropTypes.func.isRequired
    }

    constructor (props, context) {
        super(props, context);

        this.state = {
            inputValue: ''
        };
    }

    render () {
      var el = {};
        var elements = [];
        this.props.data.forEach((data) => {
          var idDate = moment(data.createdAt).format("YMM")
          if(!el[idDate]) { el[idDate] = []}
          let image = data.thumbnail || data.url;
          if(data.type !== 'image')
            image = videoImage;
          el[idDate].push(<div key={data.id} className="cont">
              <Link to={"/file/" + data.hash}>
                  <div className="img" style={{
                  "backgroundImage": "url('" + (image) + "')"
                  }}></div>
              </Link>
              <div className="listDetail">
                <div><i className="icon-time"/> {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                <div><i className="icon-doc"/> {this.capitalizeFirstLetter(data.type)}</div>
                <div><i className="icon-click"/> {data.views ? data.views : "0"} Views</div>
                <div><i className="icon-comment"/> 2 Comments</div>
              </div>
          </div>);
        })
        for (var key in el) {
          if (el.hasOwnProperty(key)) {
            elements.push(
              <div key={key} style={{clear: "both"}}><span className="month">{moment(key, "YYYYMM").format("MMMM YYYY")}</span>
            <hr className="monthBar"/>
            <div>{el[key]}</div>
          </div>)
          }
        }
        return(
            <div className="listContainer">
                {elements.reverse()}
            </div>
        );
    }
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleInputChange = e => {
        this.setState({inputValue: e.target.value});
    }

    handleSubmit = e => {
        const {
            updatePath
        } = this.props;

        e.preventDefault();
        updatePath('/users/' + this.state.inputValue);
    }
}


List.onEnter = store => (nextState, replaceState, callback) => {
  nodeify(store.dispatch(getData()), callback);
};
