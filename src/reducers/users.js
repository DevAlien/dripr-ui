import {handleActions} from 'redux-actions';
import Immutable, {OrderedMap} from 'immutable';
import {ActionTypes} from '../constants';

export default handleActions({
  [ActionTypes.DEHYDRATE]: state => ({
    store: state.store.valueSeq().toJS()
  }),

  [ActionTypes.REHYDRATE]: state => ({
    store: new OrderedMap().withMutations(store => {
      state.store.forEach(item => {
        store.set(item.id, Immutable.fromJS(item));
      });
    })
  }),

  [ActionTypes.GET_USER]: (state, action) => {
    if (!action.payload || action.error) return state;

    const {payload} = action;

    return {
      ...state,
      store: state.store.set(payload.login, Immutable.fromJS(payload))
    };
  }
}, {
  store: new OrderedMap()
});
