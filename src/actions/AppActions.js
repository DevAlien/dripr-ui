import ActionTypes from '../constants/ActionTypes';

export function setTitle(title){
  return {
    type: ActionTypes.SET_TITLE,
    title
  };
}

export function setStatus(status){
  return {
    type: ActionTypes.SET_STATUS,
    status
  };
}
