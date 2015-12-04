import {handleActions} from 'redux-actions';
import {ActionTypes} from '../constants';

function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();}
    else{
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

export default handleActions({
  [ActionTypes.DEHYDRATE]: (state, action) => ({...state,
    title: state.title,
    csrfToken: state.csrfToken,
    isLogin: state.isLogin,
    fetchForServerRendering: false
  }),
  [ActionTypes.USER_LOGOUT]: state => {
      writeCookie('driprauth', '', -2);
      return {
        ...state,
        user: false,
        authInfo: false,
        loggedIn: false
      }
  },
  [ActionTypes.LOGIN]: state => {
      return {
        ...state,
        loading: true
      }
  },
  [ActionTypes.LOGIN_SUCCESS]: (state, action) => {
    console.log('ads')
    console.log(action.result.accessToken)
    writeCookie('driprauth', action.result.accessToken, 900);
    return {
    ...state,
    loading: false,
    loaded: true,
    authInfo: action.result.accessToken,
    loggedIn: true,
    user: {
      name: action.result.name,
      email: action.result.email,
      id: action.result.id
    }

  }},
  [ActionTypes.LOGIN_FAILED]: state => {
    console.log('ads')
    return {
    ...state,
    loading: false,
    loaded: false
  }},

  [ActionTypes.GETUSER]: state => {
      return {
        ...state,
        loading: true
      }
  },
  [ActionTypes.GETUSER_SUCCESS]: (state, action) => {
    console.log('ads')
    console.log(action.result)
    //writeCookie('driprauth', action.result.accessToken, 900);

    return {
    ...state,
    loading: false,
    loaded: true,
    user: {
      name: action.result.name,
      email: action.result.email,
      id: action.result.id
    }

  }},
  [ActionTypes.GETUSER_FAILED]: state => {
    console.log('ads')
    return {
    ...state,
    loading: false,
    loaded: false
  }}
}, {});
