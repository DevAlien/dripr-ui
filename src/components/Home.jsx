import React from 'react';
import bindActions from '../utils/bindActions';
import * as AppActions from '../actions/AppActions';

class Home extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props, context){
    super(props, context);

    this.state = {
      id: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.id}
          onChange={this.handleChange}/>
        <button type="submit">Search</button>
      </form>
    );
  }

  handleSubmit(e){
    e.preventDefault();
    this.context.router.transitionTo(`/users/${this.state.id}`);
  }

  handleChange(e){
    this.setState({
      id: e.target.value
    });
  }
}

Home.onEnter = function(state, transition){
  const {setTitle} = bindActions(AppActions, this);
  setTitle('Redux example');
};

export default Home;
