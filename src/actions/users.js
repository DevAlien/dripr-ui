import {ActionTypes} from '../constants';
import {github, filterError, parseJSON} from '../api';

export const getUser = id => {
  return (dispatch, getState) => {
    return dispatch({
      type: ActionTypes.GET_USER,
      payload: github('users/' + id)
        .then(filterError)
        .then(parseJSON)
    });
  };
};

export const login = (email, password) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.LOGIN, ActionTypes.LOGIN_SUCCESS, ActionTypes.LOGIN_FAILED],
      promise: (client) => client.fetch('/login', {method: 'post', body: JSON.stringify({email: email, password: password}), withCredentials: 'include', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }})
    });
  };
};
