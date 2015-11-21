import {createStore, compose} from 'redux';
import rootReducer from '../reducers';
import middlewares from './middlewares';

export default function composeStore(initialState, ...functions) {
  const store = compose(
    middlewares,
    ...functions
  )(createStore)(rootReducer, initialState);

  return store;
}
