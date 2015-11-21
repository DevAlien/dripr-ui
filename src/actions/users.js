import {ActionTypes} from '../constants';
import {github, filterError, parseJSON} from '../api';

export const getUser = id => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.GET_USER
    });

    return dispatch({
      type: ActionTypes.GET_USER,
      payload: github('users/' + id)
        .then(filterError)
        .then(parseJSON)
    });
  };
};
