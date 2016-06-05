import {handleActions} from 'redux-actions'
import Immutable, {OrderedMap} from 'immutable'
import {ActionTypes} from '../constants'

function writeCookie(name, value, days) {
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

function readCookie(name) {
  var i, c, ca, nameEQ = name + '='
  ca = document.cookie.split(';')
  for (i = 0; i < ca.length; i++) {
    c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return ''
}

export default handleActions({
  // ,
  // [ActionTypes.DEHYDRATE]: state => {
  //   console.log('ads')
  //   return {
  //   store: state.store.valueSeq().toJS()
  // }}
  // ,
  //
  // [ActionTypes.ASD]: (state, action) => {
  //   console.log('adsd')
  //   console.log(action)
  //   console.log(state)
  //   return {
  //     ...state,
  //     store: state.store.set('asd', {'hell': 'yeah'})
  // }},
  //
  // [ActionTypes.REHYDRATE]: state => ({
  //   store: new OrderedMap().withMutations(store => {
  //     state.store.forEach(item => {
  //       store.set(item.id, Immutable.fromJS(item));
  //     });
  //   })
  // }),
  //
  // [ActionTypes.GET_USER]: (state, action) => {
  //   if (!action.payload || action.error) return state;
  //
  //   const {payload} = action;
  //
  //   return {
  //     ...state,
  //     store: state.store.set(payload.login, Immutable.fromJS(payload))
  //   };
  // }
}, {
})
