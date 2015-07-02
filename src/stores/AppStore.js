import ActionTypes from '../constants/ActionTypes';

export default class AppStore {
  static handlers = {
    setTitle: ActionTypes.SET_TITLE,
    setStatus: ActionTypes.SET_STATUS
  }

  constructor(){
    this.state = {
      title: 'Redux Boilerplate',
      status: 200,
      csrfToken: ''
    };
  }

  setTitle(action){
    this.state.title = action.title;
  }

  setStatus(action){
    this.state.status = action.status;
  }

  setCSRFToken(action){
    this.state.csrfToken = action.csrfToken;
  }
}
