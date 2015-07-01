import ActionTypes from '../constants/ActionTypes';
import createStore from '../utils/createStore';

class AppStore {
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

  setCSRFToken(status, action){
    //
  }
}

export default createStore(AppStore);
