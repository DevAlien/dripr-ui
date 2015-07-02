import ActionTypes from '../constants/ActionTypes';

export default class AppStore {
  static handlers = {
    setTitle: ActionTypes.SET_TITLE,
    setStatus: ActionTypes.SET_STATUS,
    setFirstRender: ActionTypes.SET_FIRST_RENDER
  }

  constructor(){
    this.state = {
      title: 'Redux Example',
      status: 200,
      csrfToken: '',
      firstRender: true
    };
  }

  getTitle(){
    return this.state.title;
  }

  setTitle(action){
    this.state.title = action.title;
  }

  getStatus(){
    return this.state.status;
  }

  setStatus(action){
    this.state.status = action.status;
  }

  getCSRFToken(){
    return this.state.csrfToken;
  }

  setCSRFToken(action){
    this.state.csrfToken = action.csrfToken;
  }

  isFirstRender(){
    return this.state.firstRender;
  }

  setFirstRender(action){
    this.state.firstRender = action.firstRender;
  }

  dehydrate(){
    return {
      title: this.state.title,
      csrfToken: this.state.csrfToken
    };
  }

  rehydrate(state){
    this.state.title = state.title;
    this.state.csrfToken = state.csrfToken;
  }
}
