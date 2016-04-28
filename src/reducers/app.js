import {handleActions} from 'redux-actions'
import {ActionTypes} from '../constants'

function writeCookie (name, value, days) {
  var date, expires
  if (days) {
    date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toGMTString()
  } else {
    expires = ''
  }
  document.cookie = name + '=' + value + expires + '; path=/'
}

export default handleActions({
  [ActionTypes.DEHYDRATE]: (state, action) => Object.assign({}, state, {
    title: state.title,
    csrfToken: state.csrfToken,
    isLogin: state.isLogin,
    fetchForServerRendering: false
  }),
  [ActionTypes.USER_LOGOUT]: state => {
    writeCookie('driprauth', '', -2)
    return Object.assign({}, state, {
      user: false,
      authInfo: false,
      loggedIn: false
    })
  },
  [ActionTypes.LOGIN]: state => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [ActionTypes.LOGIN_SUCCESS]: (state, action) => {
    writeCookie('driprauth', action.result.accessToken, 900)
    return Object.assign({}, state, {
      loading: false,
      loaded: true,
      authInfo: action.result.accessToken,
      loggedIn: true,
      user: {
        name: action.result.name,
        email: action.result.email,
        id: action.result.id
      }
    })
  },
  [ActionTypes.LOGIN_FAILED]: state => {
    return Object.assign({}, state, {
      loading: false,
      loaded: false
    })
  },
  [ActionTypes.GETUSER]: state => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [ActionTypes.GETUSER_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loading: false,
      loaded: true,
      user: {
        name: action.result.name,
        email: action.result.email,
        id: action.result.id
      }
    })
  },
  [ActionTypes.GETUSER_FAILED]: state => {
    return Object.assign({}, state, {
      loading: false,
      loaded: false
    })
  }
}, {})
