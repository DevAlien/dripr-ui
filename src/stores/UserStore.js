import ActionTypes from '../constants/ActionTypes';
import {Map} from 'immutable';

export default class UserStore {
  static handlers = {
    updateUser: ActionTypes.UPDATE_USER
  }

  constructor(){
    this.state = {
      users: Map()
    };
  }

  updateUser(action){
    const {user} = action;
    this.state.users = this.state.users.set(user.login, user);
  }
}
