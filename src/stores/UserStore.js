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

  getUser(id){
    return this.state.users.get(id);
  }

  updateUser(action){
    const {user} = action;
    this.state.users = this.state.users.set(user.login, user);
  }

  dehydrate(){
    return {
      users: this.state.users.toJS()
    };
  }

  rehydrate(state){
    this.state.users = Map(state.users);
  }
}
