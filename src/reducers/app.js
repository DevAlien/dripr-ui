import {handleActions} from 'redux-actions';
import {ActionTypes} from '../constants';

export default handleActions({
  [ActionTypes.DEHYDRATE]: (state, action) => ({
    title: state.title,
    csrfToken: state.csrfToken,
    isLogin: state.isLogin,
    fetchForServerRendering: false
  })
}, {});
