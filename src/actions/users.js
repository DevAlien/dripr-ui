import {ActionTypes} from '../constants';

export const loginFacebook = (data) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.LOGIN, ActionTypes.LOGIN_SUCCESS, ActionTypes.LOGIN_FAILED],
      promise: (client) => client.fetch('/login-facebook', {method: 'post', body: JSON.stringify(data), withCredentials: 'include', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }})
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
