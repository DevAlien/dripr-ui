import {ActionTypes} from '../constants';

export const getFile = (id) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.FILE, ActionTypes.FILE_SUCCESS, ActionTypes.FILE_FAILED],
      promise: (client) => client.fetch('/files/' + id)
    });
  };
};

export const postFile = (file) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.FILE, ActionTypes.FILE_SUCCESS, ActionTypes.FILE_FAILED],
      promise: (client) => client.postFile(file)
    });
  };
};

export const postCode = (text, language) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.FILE, ActionTypes.FILE_SUCCESS, ActionTypes.FILE_FAILED],
      promise: (client) => client.postCode(text, language)
    });
  };
};
