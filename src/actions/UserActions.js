import ActionTypes from '../constants/ActionTypes';
import {github, parseJSON, filterError} from '../utils/request';

export function getUser(id){
  return github('users/' + id)
    .then(filterError)
    .then(parseJSON)
    .then(user => {
      this.dispatch({
        type: ActionTypes.UPDATE_USER,
        user: user
      });

      return user;
    });
}
