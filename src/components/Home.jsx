import React from 'react';

export default class Home extends React.Component {
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
