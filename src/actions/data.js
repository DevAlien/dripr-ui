import {ActionTypes} from '../constants'

export const getData = () => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.DATA, ActionTypes.DATA_SUCCESS, ActionTypes.DATA_FAILED],
      promise: (client) => client.fetch('/files')
    })
  }
}

export const loadUser = () => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.GETUSER, ActionTypes.GETUSER_SUCCESS, ActionTypes.GETUSER_FAILED],
      promise: (client) => client.fetch('/users/own')
    })
  }
}
