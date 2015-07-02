import React from 'react';
import {connect} from 'redux/react';
import bindActions from '../utils/bindActions';
import * as AppActions from '../actions/AppActions';

@connect(state => ({
  title: state.AppStore.getTitle()
}))
class App extends React.Component {
  static contextTypes = {
    redux: React.PropTypes.object.isRequired
  }

  componentDidUpdate(){
    if (process.env.BROWSER){
      document.title = this.props.title;
    }
  }

  componentDidMount(){
    const {setFirstRender} = bindActions(AppActions, this.context.redux);
    setFirstRender(false);
  }

  render(){
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default App;
