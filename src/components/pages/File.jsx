import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';
import {getFile} from '../../actions/files';
import nodeify from 'nodeify';


import urlDropIcon from 'file!../../assets/img/dropicon.png'

@connect(state => {
  console.log(state)
  return {
    file: state.files.data
}}, {
  updatePath
})
export default class File extends React.Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    updatePath: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      inputValue: ''
    };
  }

  render() {
    console.log(this.props.file)
    return (
      <div className="file">
			   <img src={this.props.file.url} alt="*" />
      </div>
    );
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

File.onEnter = store => (nextState, replaceState, callback) => {
  console.log('onEnterFiles')
  const {id} = nextState.params;

  nodeify(store.dispatch(getFile(id)), callback);
};
