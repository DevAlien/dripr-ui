import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {Link} from 'react-router';
import {getData} from '../../actions/data';
import '../../assets/css/fontello-embedded.css'
import urlDropIcon from 'file!../../assets/img/dropicon.png'
import nodeify from 'nodeify';


@connect(state => {
  console.log('state')
    console.log(state);
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
        var elements = [];
        this.props.data.forEach((data) => {
          let image = data.thumbnail || data.url;
          if(data.type !== 'image')
            image = 'http://instacod.es/file/57623';
          elements.push(<div className="cont">
              <Link to={"/file/" + data.hash}>
                  <div className="img" style={{
                  "backgroundImage": "url('" + (image) + "')"
                  }}></div>
              </Link>
              <div className="listDetail">
                <div><i className="icon-time"/> November 28, 2015 6:23 PM</div>
                <div><i className="icon-doc"/> {this.capitalizeFirstLetter(data.type)}</div>
                <div><i className="icon-click"/> 48 Views</div>
                <div><i className="icon-comment"/> 2 Comments</div>
              </div>
          </div>);
        })
        return(
            <div className="listContainer">
                <span className="month">November</span>
                <hr className="monthBar"/>

                {elements}
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
  console.log('onEnterList')
  const {data} = store.getState();
  console.log('asdddddd')
  if (data.data) return callback();
  console.log('dada')
  nodeify(store.dispatch(getData()), callback);
};
