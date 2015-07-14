import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import NotFound from './NotFound';
import * as AppActions from '../actions/AppActions';
import * as UserActions from '../actions/UserActions';
import bindActions from '../utils/bindActions';

@connect((state, props) => ({
  user: state.UserStore.getUser(props.params.id)
}))
class Profile extends React.Component {
  render(){
    const {user} = this.props;

    if (user){
      return (
        <div>
          <Link to="/">Home</Link>
          <img src={user.avatar_url} width={100} height={100}/>
          <a href={user.html_url} target="_blank" rel="external">{user.login}</a>
        </div>
      );
    } else {
      return <NotFound/>;
    }
  }
}

Profile.onEnter = function(state, transition){
  if (this.getState().AppStore.isFirstRender()) return;

  const {setTitle, setStatus} = bindActions(AppActions, this);
  const {getUser} = bindActions(UserActions, this);

  return getUser(state.params.id).then(user => {
    setTitle(user.login);
  }).catch(err => {
    if (err.response && err.response.status === 404){
      setTitle('Not found');
      setStatus(404);
    } else {
      throw err;
    }
  });
};

export default Profile;
