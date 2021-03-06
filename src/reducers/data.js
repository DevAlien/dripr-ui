import {handleActions} from 'redux-actions';
import Immutable, {OrderedMap} from 'immutable';
import {ActionTypes} from '../constants';

export default handleActions({
  [ActionTypes.DATA]: state => {
      return {
        ...state,
        loading: true
      }
  },
  [ActionTypes.DATA_SUCCESS]: (state, action) => {
    return {
    ...state,
    loading: false,
    loaded: true,
    data: action.result
  }},
  [ActionTypes.DATA_FAILED]: state => {
    return {
    ...state,
    loading: false,
    loaded: false
  }}
}, {
});
