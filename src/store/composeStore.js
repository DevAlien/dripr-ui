import {createStore, compose} from 'redux'
import rootReducer from '../reducers'
import middlewares from './middlewares'

export default function composeStore(initialState, client, ...functions) {
  const store = compose(
    middlewares(client),
    ...functions
  )(createStore)(rootReducer, initialState)

  return store
}
