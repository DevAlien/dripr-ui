import {ActionTypes} from '../constants'

export const getFile = (id) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.FILE, ActionTypes.FILE_SUCCESS, ActionTypes.FILE_FAILED],
      promise: (client) => client.fetch('/files/' + id)
    })
  }
}

export const getComments = (id) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.COMMENTS, ActionTypes.COMMENTS_SUCCESS, ActionTypes.COMMENTS_FAILED],
      promise: (client) => client.fetch('/comments/' + id)
    })
  }
}

export const postComment = (id, message) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.POSTCOMMENT, ActionTypes.POSTCOMMENT_SUCCESS, ActionTypes.POSTCOMMENT_FAILED],
      promise: (client) => client.postComment(id, message)
    })
  }
}


export const postFile = (file) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.FILE, ActionTypes.FILE_SUCCESS, ActionTypes.FILE_FAILED],
      promise: (client) => client.postFile(file)
    })
  }
}

export const postCode = (text, language) => {
  return (dispatch, getState) => {
    return dispatch({
      types: [ActionTypes.FILE, ActionTypes.FILE_SUCCESS, ActionTypes.FILE_FAILED],
      promise: (client) => client.postCode(text, language)
    })
  }
}
