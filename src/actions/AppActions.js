import ActionTypes from '../constants/ActionTypes';

export function setTitle(title){
  this.dispatch({
    type: ActionTypes.SET_TITLE,
    title
  });
}

export function setStatus(status){
  this.dispatch({
    type: ActionTypes.SET_STATUS,
    status
  });
}

export function setFirstRender(firstRender){
  this.dispatch({
    type: ActionTypes.SET_FIRST_RENDER,
    firstRender
  });
}
