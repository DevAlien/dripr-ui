import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router'
import {getData} from '../../actions/data';
import '../../assets/css/fontello-embedded.css'
import nodeify from 'nodeify';
import moment from 'moment';
import File from '../components/list/file'
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
          el[idDate].push(<File data={data} />);
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
}


List.onEnter = store => (nextState, replaceState, callback) => {
  nodeify(store.dispatch(getData()), callback);
};
