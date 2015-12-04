import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import nodeify from 'nodeify';

import {getUser} from '../../actions/users';

@connect((state, props) => {
  console.log('connect')
  return {
  user: state.users.store.get(props.params.id)
}})
class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    const {user} = this.props;

    if (!user) {
      return <div>Not found</div>;
    }

    return (
      <div>
        <img src={user.get('avatar_url')}/>
        <p>ID: {user.get('id')}</p>
        <p>Login: {user.get('login')}</p>
        <p>Name: {user.get('name')}</p>
        <p>Location: {user.get('location')}</p>
        <p>Public repos: {user.get('public_repos')}</p>
        <p>Followers: {user.get('followers')}</p>
        <p>Following: {user.get('following')}</p>
      </div>
    );
  }
}

Profile.onEnter = store => (nextState, replaceState, callback) => {
  console.log('onEnter')
  const {id} = nextState.params;
  const {users} = store.getState();

  if (users.store.has(id)) return callback();

  nodeify(store.dispatch(getUser(id)), callback);
};

export default Profile;
