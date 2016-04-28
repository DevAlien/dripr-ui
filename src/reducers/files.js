import {handleActions} from 'redux-actions'
import Immutable, {OrderedMap} from 'immutable'
import {ActionTypes} from '../constants'

export default handleActions({
  [ActionTypes.FILE]: state => {
    return Object.assign({}, state, {
      loading: true
    })
  },
  [ActionTypes.FILE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loading: false,
      loaded: true,
      data: action.result
    })
  },
  [ActionTypes.FILE_FAILED]: state => {
    return Object.assign({}, state, {
      loading: false,
      loaded: false
    })
  },
  [ActionTypes.COMMENTS]: state => {
    return Object.assign({}, state, {
      loadingComments: true
    })
  },
  [ActionTypes.COMMENTS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      loadingComments: false,
      loadedComments: true,
      comments: action.result
    })
  },
  [ActionTypes.COMMENTS_FAILED]: state => {
    return Object.assign({}, state, {
      loadingComments: false,
      loadedComments: false
    })
  },
  [ActionTypes.GET_FILE]: (state, action) => {
    if (!action.payload || action.error) return state

    const {payload} = action

    return payload
  }
}, {
})
