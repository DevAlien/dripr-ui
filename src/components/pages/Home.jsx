import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {updatePath} from 'redux-simple-router';

@connect(state => ({
  //
}), {
  updatePath
})
export default class Home extends React.Component {
  static propTypes = {
    updatePath: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      inputValue: ''
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Find GitHub user...</p>
        <input
          type='text'
          placeholder='GitHub ID'
          value={this.state.inputValue}
          onChange={this.handleInputChange}/>
        <button type='submit'>Find</button>
      </form>
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
